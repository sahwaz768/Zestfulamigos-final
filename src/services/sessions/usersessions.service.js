export const extendCurrentSession = async () => {
    const { BASEURL } = await import("../../Constants/services.constants");
    const {
      default: { post },
    } = await import("../interface/interceptor");
    try {
      const url = BASEURL + "/user/session/extendsession";
      const { data:{ data } } = await post(url);
      return { data };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error:", error.message);
      }
      console.log(error.response);
      if (error.response?.status >= 400)
        return { error: error.response.data.message };
    }
  };
  