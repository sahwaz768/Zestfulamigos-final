export const bookaCompanionService = async (values) => {
  const { BASEURL } = await import('../../Constants/services.constants');
  const {
    default: { post }
  } = await import('../interface/interceptor');
  try {
    const url = BASEURL + '/user/booking/bookacompanion';
    const { data } = await post(url, values);
    return { data };
  } catch (error) {
    console.log(error?.response);
    if (error.response?.status >= 400)
      return { error: error.response.data.message };
  }
};

export const getBookingDetails = async (bookingid) => {
  const { BASEURL } = await import('../../Constants/services.constants');
  const {
    default: { get }
  } = await import('../interface/interceptor');
  try {
    const url = BASEURL + '/user/booking/userbookingdetails';
    const { data:{ data } } = await get(url, { params: { bookingid } });
    return { data };
  } catch (error) {
    console.log(error?.response);
    if (error.response?.status >= 400)
      return { error: error.response.data.message };
  }
};

export const successTransaction = async (values) => {
    const { BASEURL } = await import('../../Constants/services.constants');
  const {
    default: { post }
  } = await import('../interface/interceptor');
  try {
    const url = BASEURL + '/user/transactions/onsuccesspayment';
    const { data:{ data } } = await post(url, values);
    return { data };
  } catch (error) {
    console.log(error?.response);
    if (error.response?.status >= 400)
      return { error: error.response.data.message };
  }
}


export const getPreviousBookings = async () => {
    const { BASEURL } = await import('../../Constants/services.constants');
  const {
    default: { get }
  } = await import('../interface/interceptor');
  try {
    const url = BASEURL + '/user/booking/previousbookings';
    const { data:{ data } } = await get(url);
    return { data };
  } catch (error) {
    console.log(error?.response);
    if (error.response?.status >= 400)
      return { error: error.response.data.message };
  }
}
