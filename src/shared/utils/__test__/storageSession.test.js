import { setLocalStorage, getLocalStorage } from "../storageSession";

it("Should able save the localStorage", () => {
  const key = "key";
  const value = "value";
  jest.spyOn(window.localStorage.__proto__, "setItem");
  window.localStorage.__proto__.setItem = jest.fn();
  setLocalStorage(key, value);
  expect(window.localStorage.__proto__.setItem).toHaveBeenCalledWith(
    key,
    JSON.stringify(value)
  );
  expect(localStorage.setItem).toHaveBeenCalled();
});

it("Should able get the localStorage", () => {
  const key = "key";
  const value = "value";
  jest.spyOn(window.localStorage.__proto__, "getItem");
  window.localStorage.__proto__.getItem = jest.fn();
  setLocalStorage(key, value);
  getLocalStorage(key);
  expect(window.localStorage.__proto__.getItem).toHaveBeenCalledWith(key);
  expect(localStorage.getItem).toHaveBeenCalled();
});
