/* eslint-disable no-param-reassign */
/* eslint-disable operator-linebreak */
import axios from "axios";
import { parseCookies } from 'nookies';
import {
  ACCESS_TOKEN_LOC,
  REFRESH_TOKEN_LOC,
} from "src/Constants/common.constants";
import { decodeAccessToken } from "src/utils/common.utils";
import { BASEURL, ignoretokenpaths } from "src/Constants/services.constants";
import { getAccessTokenFromRefreshTokenService } from "../auth/login.service";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axios.interceptors.request.use((config) => {
  const cookie = parseCookies()
  const token = cookie[ACCESS_TOKEN_LOC];
  if (token) {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

axios.defaults.headers.common = {
  "Cache-Control":
    "no-store, no-cache, max-age=0, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

const refreshAccessToken = async (refreshToken) => {
  try {
    const access_token = await getAccessTokenFromRefreshTokenService(refreshToken)
    axios.defaults.headers.common.Authorization = "Bearer " + access_token;
    processQueue(null, access_token);
    return access_token;
  } catch (error) {
    console.log('Error refreshing token:', error);
    window.location = "/";
    processQueue(error, null);
    throw error;
  } finally {
    isRefreshing = false;
  }
};

axios.interceptors.response.use(
  (res) => res,
  async (err) => {
    const onrequest = err.config;
    const cookie = parseCookies()
    const token = cookie[ACCESS_TOKEN_LOC];
    const refreshToken = cookie[REFRESH_TOKEN_LOC];

    // Ignore token handling if there's no token and it's not a path that needs the token
    if (!err.response?.config?.url?.includes(ignoretokenpaths) && !token) {
      window.location = "/";
      return Promise.reject(err);
    }

    // Handle 401 and 403 errors by triggering refresh token logic
    if (
      (err?.response?.status === 401 || err?.response?.status === 403) &&
      !onrequest._retry && token && refreshToken
    ) {
      const { decodedToken } = decodeAccessToken(token);
      let exp = decodedToken ? decodedToken.exp : null;

      // Check if the access token is expired and if we should refresh it
      // if (exp && exp < Date.now() / 1000) {
        if (isRefreshing) {
          // Queue the request if refresh is in progress
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((tokens) => {
              // Retry the original request with new token
              onrequest.headers.Authorization = "Bearer " + tokens;
              return axios(onrequest);
            })
            .catch((error) => {
              return Promise.reject(error);
            });
        }

        // Mark the request as retrying and refresh the token
        onrequest._retry = true;
        isRefreshing = true;

        try {
          const access_token = await refreshAccessToken(refreshToken);
          onrequest.headers.Authorization = "Bearer " + access_token;
          return axios(onrequest);
        } catch (error) {
          return Promise.reject(error);
        }
      // }
    }

    // If none of the above conditions are met, reject the error
    return Promise.reject(err);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  del: axios.delete,
};
