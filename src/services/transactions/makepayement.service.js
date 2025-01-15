export const generateHashforTransaction = async (values) => {
  const { BASEURL } = await import('../../Constants/services.constants');
  const {
    default: { post }
  } = await import('../interface/interceptor');
  try {
    const url = BASEURL + '/user/transactions/gethashfortransaction';
    const { data } = await post(url, values);
    return { data };
  } catch (error) {
    console.error(error.response);
    if (error.response?.status >= 400)
      return { error: error.response.data.message };
  }
};

export const initiateTransaction = async (values) => {
  const { BASEURL } = await import('../../Constants/services.constants');
  const {
    default: { post }
  } = await import('../interface/interceptor');
  try {
    const url = BASEURL + '/user/transactions/initiatepayment';
    const { data:{ data } } = await post(url, values);
    return data;
  } catch (error) {
    console.error(error.response);
    if (error.response?.status >= 400)
      return { error: error.response.data.message };
  }
};
