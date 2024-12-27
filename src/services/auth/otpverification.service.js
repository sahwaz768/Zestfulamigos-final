export const verifyotp = async (formData) => {
    const { BASEURL } = await import("../../Constants/services.constants");
    const { default: { post } } = await import("../interface/interceptor");

    try {
        const url = `${BASEURL}/auth/reset-password`;
        const { data } = await post(url, formData);
        return { data }; 
    } catch (error) {
        console.error('Forgotpassword Error:', error.response);
        if (error.response?.status >= 400) {
            return { error: error.response.data.message }; 
        }
        return { error: "An unexpected error occurred." }; 
    }
};