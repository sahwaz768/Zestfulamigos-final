export const companionFindService = async (values) => {
    const { BASEURL } = await import("../../Constants/services.constants");
    const { default:{ post } } = await import("../interface/interceptor");
    try {
        const url = BASEURL + "/user/companionfind";
        const { data } = await post(url, values);
        return { data };
    } catch (error) {
        console.log(error.response);
        if(error.response?.status >= 400)
        return { error: error.response.data.message }
        return { error: 'Server Error' };
    }
}

export const userAgentService = async (values) => {
    const { BASEURL } = await import('../../Constants/services.constants');
    const {
      default: { post }
    } = await import('../interface/interceptor');
    try {
      const url = BASEURL + `/user/profile/getuserotherdetails`;
      const { data } = await post(url, values);
      return { data };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error:', error.message);
      }
      console.log(error.response);
      if (error.response?.status >= 400)
        return { error: error.response.data.message };
      return { error: 'Server Error' };
    }
}