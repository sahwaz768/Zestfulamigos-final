export function deletecookie(name) {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export const removeUserData = async () => {
    const { ACCESS_TOKEN_LOC, REFRESH_TOKEN_LOC } = await import(
      'src/Constants/common.constants'
    );
    deletecookie(ACCESS_TOKEN_LOC);
    deletecookie( REFRESH_TOKEN_LOC);
    window.sessionStorage.clear();
  };