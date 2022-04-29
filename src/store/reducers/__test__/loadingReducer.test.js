import * as loadingType from "../../types/loagingTypes";
import loadingReducer from "../loadingReducer";

describe("loadingReducer", () => {
  it("Should return the initial state", () => {
    const initialState = {
      loading: false,
      error: null,
    };
    expect(loadingReducer(undefined, {})).toEqual(initialState);
  });

  it("Should handle BEGINS_LOADING", () => {
    const action = {
      type: loadingType.BEGINS_LOADING,
    };
    expect(loadingReducer(undefined, action)).toEqual({
      loading: true,
      error: null,
    });
  });

  it("Should handle ENDS_LOADING", () => {
    const action = {
      type: loadingType.ENDS_LOADING,
    };
    expect(loadingReducer(undefined, action)).toEqual({
      loading: false,
      error: null,
    });
  });
});
