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
    const {
      data: { data }
    } = await get(url, { params: { bookingid } });
    return { data };
  } catch (error) {
    console.log(error?.response);
    if (error.response?.status >= 400)
      return { error: error.response.data.message };
  }
  return { error: 'Server Error' }
};



export const getPreviousBookings = async () => {
  const { BASEURL } = await import('../../Constants/services.constants');
  const {
    default: { get }
  } = await import('../interface/interceptor');
  try {
    const url = BASEURL + '/user/booking/previousbookings';
    const {
      data: { data }
    } = await get(url);
    return { data };
  } catch (error) {
    console.log(error?.response);
    if (error.response?.status >= 400)
      return { error: error.response.data.message };
  }
};

export const cancelBooking = async (values) => {
  const { BASEURL } = await import('../../Constants/services.constants');
  const {
    default: { post }
  } = await import('../interface/interceptor');
  try {
    const url = BASEURL + '/user/booking/cancelbooking';
    const {
      data: { data }
    } = await post(url, values);
    return { data };
  } catch (error) {
    console.log(error?.response);
    if (error.response?.status >= 400)
      return { error: error.response.data.message };
  }
  return { error: 'Server Error' };
};

export const rateaBookingService = async (values) => {
  const { BASEURL } = await import('../../Constants/services.constants');
  const {
    default: { post }
  } = await import('../interface/interceptor');
  try {
    const url = BASEURL + '/user/booking/rateabookingRoute';
    const {
      data
    } = await post(url, values);
    return { data };
  } catch (error) {
    console.log(error?.response);
    if (error.response?.status >= 400)
      return { error: error.response.data.message };
  }
  return { error: 'Server Error' };
};

export const getBookingDetailsforAll = async (bookingid) => {
  const { BASEURL } = await import('../../Constants/services.constants');
  const {
    default: { get }
  } = await import('../interface/interceptor');
  try {
    const url = BASEURL + '/user/booking/getBookingDetailsforall';
    const {
      data: { data }
    } = await get(url, { params: { bookingid } });
    return { data };
  } catch (error) {
    console.log(error?.response);
    if (error.response?.status >= 400)
      return { error: error.response.data.message };
  }
  return { error: 'Server Error' }
};


export const getRatingforUser = async () => {
  const { BASEURL } = await import('../../Constants/services.constants');
  const {
    default: { get }
  } = await import('../interface/interceptor');
  try {
    const url = BASEURL + '/user/booking/getaveragerating';
    const {
      data: { data }
    } = await get(url);
    return { data };
  } catch (error) {
    console.log(error?.response);
    if (error.response?.status >= 400)
      return { error: error.response.data.message };
  }
  return { error: 'Server Error' }
};