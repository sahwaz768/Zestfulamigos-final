// import { decodedTokenDto } from './dto/decodedToken';

export const uuid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const decodeAccessToken = (token) => {
  if (!token || !token.trim().length) {
    return { error: 'Invalid Token' };
  }
  const splittedToken = token.split('.');
  if (splittedToken.length < 3) {
    return { error: 'inValid token' };
  }
  try {
    const atobToken = atob(splittedToken[1]);
    const decodedToken = JSON.parse(atobToken);
    return { decodedToken };
  } catch (error) {
    return { error: 'Invalid token' };
  }
};

export const isMobileDevice = (userAgent) => {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ];
  const matched = toMatch.some((tomatchItem) => userAgent.match(tomatchItem));
  return matched;
};

export const addDays = (days) => {
  const result = new Date();
  result.setDate(result.getDate() + days);
  return result;
};

export const convertFile = async (basestr, fileName) => {
  const res = await fetch(basestr);
  const blob = await res.blob();
  return new File([blob], fileName, { type: 'image/png' });
};

export const capitalizedWord = (word) => {
  if (word.length === 0) return word; // Handle empty string
  word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  return word.split("_").join(' ');
};
