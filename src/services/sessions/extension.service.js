export const getExtensionBookingDetails = async (bookingid) => {
    const { BASEURL } = await import('../../Constants/services.constants');
    const {
      default: { get }
    } = await import('../interface/interceptor');
    try {
      const url = BASEURL + '/user/extension/getextensiondetails';
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
  
  export const updateExtensionRecord = async (values) => {
    const { BASEURL } = await import('../../Constants/services.constants');
    const {
      default: { post }
    } = await import('../interface/interceptor');
    try {
      const url = BASEURL + '/user/extension/updaterecordextension';
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

  export const cancelExtensionRecord = async (bookingid) => {
    const { BASEURL } = await import('../../Constants/services.constants');
    const {
      default: { get }
    } = await import('../interface/interceptor');
    try {
      const url = BASEURL + '/user/extension/updatebeforeextension';
      const {
        data
      } = await get(url, { params: { bookingid } });
      return { data };
    } catch (error) {
      console.log(error?.response);
      if (error.response?.status >= 400)
        return { error: error.response.data.message };
    }
    return { error: 'Server Error' }
  };
  