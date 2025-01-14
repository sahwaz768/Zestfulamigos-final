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
  const { PAYU_KEY } = await import('../../Constants/services.constants');
  try {
    values = { ...values, key: PAYU_KEY };
    const formData = new URLSearchParams(values).toString();
    const response = await fetch('https://test.payu.in/_payment', {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    });
    return response.text();
  } catch (error) {
    console.error(error.response);
    if (error.response?.status >= 400)
      return { error: error.response.data.message };
  }
};
