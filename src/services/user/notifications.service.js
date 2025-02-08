export const getNotifications = async () => {
  const { BASEURL } = await import('../../Constants/services.constants');
  const {
    default: { get }
  } = await import('../interface/interceptor');
  try {
    const url = BASEURL + '/user/notifications/usernotification';
    const {
      data
    } = await get(url);
    return { data };
  } catch (error) {
    console.log(error?.response);
    if (error.response?.status >= 400)
      return { error: error.response.data.message };
  }
  return { error: 'Server Error' };
};
