export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key) => {
  const storageVal = localStorage.getItem(key);
  return storageVal ? JSON.parse(storageVal) : null;
};
