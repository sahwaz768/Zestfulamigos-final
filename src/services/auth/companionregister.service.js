// services/auth/companionregister.service.js (or .ts)
export const companionRegisterService = async (formdata) => {
  try {
    const { BASEURL } = await import("../../Constants/services.constants");
    // expect default export to be an axios instance
    const { default: http } = await import("../interface/interceptor");

    const url = `${BASEURL}/companion/request/registerforcompanion`;
    const res = await http.post(url, formdata, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return { data: res.data };
  } catch (error) {
    const status = error?.response?.status ?? null;
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";
    // keep logging safely
    console.log("Register error:", { status, message });
    return { error: message, status };
  }
};
