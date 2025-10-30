export const enableSlotService = async (values) => {
  const { BASEURL } = await import('../../Constants/services.constants');
  const {
    default: { post }
  } = await import('../interface/interceptor');
  try {
    const url = BASEURL + `/companion/setting/companionupdatesetting`;
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
};


export const getEnableSlotService = async () => {
  const { BASEURL } = await import('../../Constants/services.constants');
  const {
    default: { get }
  } = await import('../interface/interceptor');
  try {
    const url = BASEURL + '/companion/setting/companiongetsetting';
    const {
      data
    } = await get(url);
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
};