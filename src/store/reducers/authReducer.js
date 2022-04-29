import { getLocalStorage } from "../../shared/utils/storageSession";
import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  UPDATE_USER_DETAILS,
} from "../types/authTypes";

const initialState = {
  user: getLocalStorage("user") || {},
  isAuthenticated: getLocalStorage("user") ? true : false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: {},
        isAuthenticated: false,
      };

    case UPDATE_USER_DETAILS:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
