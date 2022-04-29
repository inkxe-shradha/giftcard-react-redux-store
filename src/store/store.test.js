import { createStore } from "redux";
import rootReducers from "./reducers";
import store from "./store";
const initialState = {};

it("Should create a store", () => {
  const store = createStore(rootReducers, initialState);
  expect(store).toBeTruthy();
});

it("Should be return the new store if the initial state been passed", () => {
  const createStore = store(initialState);
  expect(createStore).toBeTruthy();
});
