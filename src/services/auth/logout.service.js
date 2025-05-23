export const logoutUserService = async () => {
    const { BASEURL } = await import("../../Constants/services.constants");
    const { socketinit } = await import('@/Constants/socket.io.config');
    socketinit.disconnect();
    const {
      default: { post },
    } = await import("../interface/interceptor");
    try {
      const url = BASEURL + "/auth/logout";
      const { data } = await post(url);
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
  