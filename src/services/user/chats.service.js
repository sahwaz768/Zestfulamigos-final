export const getActiveChatsService = async () => {
    const { BASEURL } = await import("../../Constants/services.constants");
    const {
      default: { get },
    } = await import("../interface/interceptor");
    try {
      const url = BASEURL + "/user/chatrooms/getallchats";
      const { data:{ data } } = await get(url);
      return { data };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error:", error.message);
      }
      console.log(error.response);
      if (error.response?.status >= 400)
        return { error: error.response.data.message };
      return { error: 'Server Error' };
    }
  };
  