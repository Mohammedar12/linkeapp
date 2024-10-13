import { setCookie, getCookie } from "cookies-next";

function encodeCookieValue(value) {
  // First, convert the value to a JSON string if it's not already a string
  const stringValue = typeof value === "string" ? value : JSON.stringify(value);

  // Then, encode the string using Base64
  return btoa(encodeURIComponent(stringValue));
}

// Decoding function
export function decodeCookieValue(encodedValue) {
  try {
    // First, decode the Base64 string
    const decodedString = decodeURIComponent(atob(encodedValue));

    // Then, try to parse it as JSON
    return JSON.parse(decodedString);
  } catch (error) {
    // If parsing fails, return the decoded string as is
    return decodedString;
  }
}

// Example usage
export function setEncodedCookie(name, value, options = {}) {
  const encodedValue = encodeCookieValue(value);
  setCookie(name, encodedValue, options);
}

export function getDecodedCookie(name) {
  const encodedValue = getCookie(name);
  if (encodedValue) {
    return decodeCookieValue(encodedValue);
  }
  return null;
}
