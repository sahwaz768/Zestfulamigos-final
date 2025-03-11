export const decodeLoginCredentials = async (data) => {
    const { datafetched } = await import('@/Redux/auth/auth.reducer');
    const { decodeAccessToken } = await import('@/utils/common.utils');
    const { appDispatch } = await import('@/Redux/store/store');
    const { ACCESS_TOKEN_LOC, REFRESH_TOKEN_LOC } = await import(
      '@/Constants/common.constants'
    );
    const { setCookie } = await import('nookies')
    const decodedToken = decodeAccessToken(data.access_token).decodedToken;
    appDispatch(datafetched(decodedToken));
    setCookie(null, ACCESS_TOKEN_LOC, data.access_token, { path: '/' });
    setCookie(null, REFRESH_TOKEN_LOC, data.refresh_token, { path: '/' });
    return decodedToken;
}