export const registerUserService = async (formdata) => {
    const { BASEURL } = await import("../../Constants/services.constants");
    const { default:{ post } } = await import("../interface/interceptor");
    try {
        const url = BASEURL + "/auth/register";
        const { data } = await post(url, formdata);
        return { data };
    } catch (error) {
        console.log(error.response);
        if(error.response?.status >= 400)
        return { error: error.response.data.message }
    }
}

export const googleregisterUserService = async (values) => {
    const { BASEURL } = await import('../../Constants/services.constants');
    const {
      default: { post }
    } = await import('../interface/interceptor');
    try {
      const url = BASEURL + '/auth/google-register';
      const { data } = await post(url, values);
      return { data };
    } catch (error) {
      console.log(error.response);
      if (error.response?.status >= 400)
        return { error: error.response.data.message };
    }
  };