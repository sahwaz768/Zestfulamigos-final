export const removeUserData = async () => {
    const { ACCESS_TOKEN_LOC, REFRESH_TOKEN_LOC } = await import(
      'src/Constants/common.constants'
    );
    const {
      destroyCookie
    } = await import('nookies');
    destroyCookie(null, ACCESS_TOKEN_LOC);
    destroyCookie(null, REFRESH_TOKEN_LOC);
    window.sessionStorage.clear();
  };