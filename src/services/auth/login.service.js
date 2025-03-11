export const loginUserService = async (values) => {
  const { BASEURL } = await import('../../Constants/services.constants');
  const {
    default: { post }
  } = await import('../interface/interceptor');
  try {
    const url = BASEURL + '/auth/login';
    const { data } = await post(url, values);
    return { data };
  } catch (error) {
    console.log(error.response);
    if (error.response?.status >= 400)
      return { error: error.response.data.message };
  }
};

export const getAccessTokenFromRefreshTokenService = async (refreshToken) => {
  const { BASEURL } = await import('../../Constants/services.constants');
  const { REFRESH_TOKEN_LOC, ACCESS_TOKEN_LOC } = await import(
    '../../Constants/common.constants'
  );
  const setRefUrl = BASEURL + '/auth/refreshtoken';
  const { deletecookie, removeUserData } = await import(
    '../../utils/removeUserData'
  );
  const { setCookie, parseCookies } = await import('nookies');
  try {
    const cookies = parseCookies();
    const response = await fetch(setRefUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        refresh_token: refreshToken || cookies[REFRESH_TOKEN_LOC]
      })
    });
    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }
    const data = await response.json();
    deletecookie(ACCESS_TOKEN_LOC);
    const access_token = data.access_token;
    setCookie(null, ACCESS_TOKEN_LOC, access_token, { path: '/' });
    return access_token;
  } catch (error) {
    console.log('Error refreshing token:', error);
    await removeUserData();
    throw error;
  }
};


export const googleloginUserService = async (values) => {
  const { BASEURL } = await import('../../Constants/services.constants');
  const {
    default: { post }
  } = await import('../interface/interceptor');
  try {
    const url = BASEURL + '/auth/google-login';
    const { data } = await post(url, values);
    return { data };
  } catch (error) {
    console.log(error.response);
    if (error.response?.status >= 400)
      return { error: error.response.data.message };
  }
};
