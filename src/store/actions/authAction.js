import { toast } from "react-toastify";
import { saveUserDetails, getUserDetails } from "../../api/globalApi";
import { setLocalStorage } from "../../shared/utils/storageSession";
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../types/authTypes";
import { beginsLoading, endsLoading } from "./loadingAction";

const loginSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
};

const logOutUserSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const signInUser =
  (userObj, loginType = null) =>
  async (dispatch) => {
    if (loginType === "google") {
      try {
        beginsLoading();
        const { data: userDetails } = await getUserDetails(userObj.email);
        let sessionData = {};
        if (userDetails.length > 0) {
          toast.success("User Logged in Successfully");
          dispatch(loginSuccess(userDetails[0]));
          sessionData = userDetails[0];
        } else {
          const { data } = await saveUserDetails(userObj);
          dispatch(loginSuccess(data));
          toast.success("Google Logged in Successful");
          sessionData = data;
        }
        setLocalStorage("user", sessionData);
        endsLoading();
      } catch (error) {
        console.error("Error", error);
        endsLoading();
      }
    } else {
      setLocalStorage("user", userObj);
      dispatch(loginSuccess(userObj));
      toast.success("Logged in Successful");
    }
  };

export const logOutUser = () => {
  setLocalStorage("user", null);
  return logOutUserSuccess();
};
