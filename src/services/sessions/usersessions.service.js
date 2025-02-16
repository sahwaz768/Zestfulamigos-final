export const extendCurrentSession = async (values) => {
    const { BASEURL } = await import("../../Constants/services.constants");
    const {
      default: { post },
    } = await import("../interface/interceptor");
    try {
      const url = BASEURL + "/user/session/extendsession";
      const { data } = await post(url, values);
      return { data };
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error:", error.message);
      }
      console.log(error.response);
      if (error.response?.status >= 400)
        return { error: error.response.data.message };
    }
  };
  

  export const startSession = async (values) => {
    const { BASEURL } = await import("../../Constants/services.constants");
    const {
      default: { post },
    } = await import("../interface/interceptor");
    try {
      const url = BASEURL + "/user/session/startsession";
      const { data } = await post(url, values);
      return { data };
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error:", error.message);
      }
      console.log(error.response);
      if (error.response?.status >= 400)
        return { error: error.response.data.message };
    }
  };
  

  export const endSession = async (values) => {
    const { BASEURL } = await import("../../Constants/services.constants");
    const {
      default: { post },
    } = await import("../interface/interceptor");
    try {
      const url = BASEURL + "/user/session/endsession";
      const { data } = await post(url, values);
      return { data };
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error:", error.message);
      }
      console.log(error.response);
      if (error.response?.status >= 400)
        return { error: error.response.data.message };
    }
  };
  
  export const startextendCurrentSession = async (values) => {
    const { BASEURL } = await import("../../Constants/services.constants");
    const {
      default: { post },
    } = await import("../interface/interceptor");
    try {
      const url = BASEURL + "/user/session/startextendsession";
      const { data } = await post(url, values);
      return { data };
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error:", error.message);
      }
      console.log(error.response);
      if (error.response?.status >= 400)
        return { error: error.response.data.message };
    }
  };
  