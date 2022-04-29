import { authReducer } from "../authReducer";
import * as authTypes from "../../types/authTypes";

describe("authReducer functionality", () => {
  const initialState = {
    user: {},
    isAuthenticated: false,
  };

  it("should return the initial state", () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle LOGIN_SUCCESS", () => {
    const user = {
      email: "admin@gmial.com",
      name: "Admin",
      imageUrl: "https://source.unsplash.com/random/900X700/?avatar",
      balance_points: 10000,
      wishlist: [],
      cards_gifted: [],
      cards_received: [],
      role: "admin",
    };
    const action = {
      type: authTypes.LOGIN_SUCCESS,
      payload: user,
    };
    expect(authReducer(initialState, action)).toEqual({
      user: user,
      isAuthenticated: true,
    });
  });

  it("should handle LOGOUT_SUCCESS", () => {
    const action = {
      type: authTypes.LOGOUT_SUCCESS,
    };
    expect(authReducer(initialState, action)).toEqual({
      user: {},
      isAuthenticated: false,
    });
  });

  it("should handle UPDATE_USER_DETAILS", () => {
    const user = {
      email: "newuser@gmail.com",
      name: "New User",
      imageUrl: "https://source.unsplash.com/random/900X700/?avatar",
      balance_points: 10000,
      wishlist: [],
      cards_gifted: [],
      cards_received: [],
      role: "user",
    };
    const action = {
      type: authTypes.UPDATE_USER_DETAILS,
      payload: user,
    };
    expect(authReducer(initialState, action)).toEqual({
      user: user,
      isAuthenticated: false,
    });
  });
});
