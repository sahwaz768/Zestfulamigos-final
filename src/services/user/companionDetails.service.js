export const companionDetailsService = async (values) => {
    const { BASEURL } = await import("../../Constants/services.constants");
    const { default:{ get } } = await import("../interface/interceptor");
    try {
        const url = BASEURL + "/user/profile/usercompaniondetails";
        const { data } = await get(url, { params: values });
        return { data };
    } catch (error) {
        console.log(error.response);
        if(error.response?.status >= 400)
        return { error: error.response.data.message }
        return { error: 'Server Error' };
    }
}

export const checkCompanionSlots = async (companionId) => {
    const { BASEURL } = await import("../../Constants/services.constants");
    const { default:{ get } } = await import("../interface/interceptor");
    try {
        const url = BASEURL + "/user/booking/checkcompanionslot";
        const { data:{ data } } = await get(url, { params: { companionId } });
        return { data };
    } catch (error) {
        console.log(error.response);
        if(error.response?.status >= 400)
        return { error: error.response.data.message }
        return { error: 'Server Error' };
    }
}