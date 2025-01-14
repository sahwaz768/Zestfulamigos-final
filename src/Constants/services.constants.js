export const BASEURL = process.env.NEXT_PUBLIC_BASE_URL || '';
export const PAYU_KEY = process.env.NEXT_PUBLIC_PAYU_KEY || '';

export const ignoretokenpaths = [
    `${BASEURL}/auth/login`,
    `${BASEURL}/auth/register`,
    `${BASEURL}/auth/password/email`,
    `${BASEURL}/auth/password/reset`
  ];