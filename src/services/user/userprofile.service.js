export const userProfileDetailsService = async () => {
  const { BASEURL } = await import('../../Constants/services.constants');
  const {
    default: { get }
  } = await import('../interface/interceptor');
  try {
    const url = BASEURL + '/user/profile/userprofiledetails';
    const { data } = await get(url);
    return { data };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error:', error.message);
    }
    console.log(error.response);
    if (error.response?.status >= 400)
      return { error: error.response.data.message };
  }
};

export const updateuserProfileDetailsService = async (values, id) => {
  const { BASEURL } = await import('../../Constants/services.constants');
  const {
    default: { post }
  } = await import('../interface/interceptor');
  try {
    const url = BASEURL + `/user/profile/updateprofile/${id}`;
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

export const requestforCompanionService = async (values) => {
  const { BASEURL } = await import('../../Constants/services.constants');
  const {
    default: { post }
  } = await import('../interface/interceptor');
  try {
    const url = BASEURL + '/companion/request/requestforcompanion';
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

export const getCompanionProfileDetails = async () => {
  const { BASEURL } = await import('../../Constants/services.constants');
  const {
    default: { get }
  } = await import('../interface/interceptor');
  try {
    const url = BASEURL + '/user/profile/getcompanionfulldetails';
    const {
      data: { data }
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

export const updateCompanionProfileService = async (values, id) => {
  const { BASEURL } = await import('../../Constants/services.constants');
  const {
    default: { post }
  } = await import('../interface/interceptor');
  try {
    const url = BASEURL + `/user/profile/updatecompanionrequest/${id}`;
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