export const getLiveLocation = async (bookingid) => {
  const { BASEURL } = await import('../../Constants/services.constants');
  const {
    default: { get }
  } = await import('../interface/interceptor');
  try {
    const url = BASEURL + '/user/booking/getlivelocationofbooking';
    const {
      data: { data }
    } = await get(url, { params: { bookingid } });
    return { data };
  } catch (error) {
    console.log(error?.response);
    if (error.response?.status >= 400)
      return { error: error.response.data.message };
    return { error: 'Server Error' };
  }
};


export const updateLiveLocation = async (values, bookingid) => {
    const { BASEURL } = await import('../../Constants/services.constants');
    const {
      default: { post }
    } = await import('../interface/interceptor');
    try {
      const url = BASEURL + `/user/booking/updatelivelocationofbooking/${bookingid}`;
      const {
        data
      } = await post(url, values);
      return { data };
    } catch (error) {
      console.log(error?.response);
      if (error.response?.status >= 400)
        return { error: error.response.data.message };
      return { error: 'Server Error' };
    }
  };
  