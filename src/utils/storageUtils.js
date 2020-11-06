export const saveGuestInfo = (guest) => {
  localStorage.setItem("guest", JSON.stringify(guest));
};

export const guestInfoExists = () => {
  return !!localStorage.getItem("guest");
};

export const guestId = () => {
  const guestObject = localStorage.getItem("guest");
  if (!guestObject) {
    return undefined;
  }
  const retrievedGuest = JSON.parse(guestObject);
  return retrievedGuest.id;
};

export const guestInfoDelete = () => {
  localStorage.removeItem("guest");
};
