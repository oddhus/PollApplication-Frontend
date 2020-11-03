export const guestCookieExists = () => {
  return document.cookie
    .split(";")
    .some((item) => item.trim().startsWith("guest="));
};

export const guestCookieId = () => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("guest"))
    .split("=")[1];
};

export const guestCookieDelete = () => {
  document.cookie = "guest=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};
