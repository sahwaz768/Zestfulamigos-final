export const getAllActiveIssues = async () => {
    const { BASEURL } = await import('../../Constants/services.constants');
    const {
      default: { get }
    } = await import('../interface/interceptor');
    try {
      const url = BASEURL + '/user/issues/getallactiveissues';
      const { data: {data} } = await get(url);
      return { data };
    } catch (error) {
      console.log(error?.response);
      if (error.response?.status >= 400)
        return { error: error.response.data.message };
    }
  };
  
  export const getIssueDetails = async (issueId) => {
    const { BASEURL } = await import('../../Constants/services.constants');
    const {
      default: { get }
    } = await import('../interface/interceptor');
    try {
      const url = BASEURL + '/user/issues/getissuedetails';
      const {
        data: { data }
      } = await get(url, { params: { issueId } });
      return { data };
    } catch (error) {
      console.log(error?.response);
      if (error.response?.status >= 400)
        return { error: error.response.data.message };
    }
    return { error: 'Server Error' }
  };
  
  
  
  export const createNewIssue = async (values) => {
    const { BASEURL } = await import('../../Constants/services.constants');
    const {
      default: { post }
    } = await import('../interface/interceptor');
    try {
      const url = BASEURL + '/user/issues/createnewissue';
      const {
        data
      } = await post(url, values);
      return { data };
    } catch (error) {
      console.log(error?.response);
      if (error.response?.status >= 400)
        return { error: error.response.data.message };
    }
  };
  
  export const addCommentonIssue = async (values) => {
    const { BASEURL } = await import('../../Constants/services.constants');
    const {
      default: { post }
    } = await import('../interface/interceptor');
    try {
      const url = BASEURL + '/user/issues/addcommentonissue';
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
  