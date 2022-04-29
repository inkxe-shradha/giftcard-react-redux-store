import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { giftCardReducer } from "./giftCardReducer";
import loadingReducer from "./loadingReducer";

const rootReducers = combineReducers({
  loading: loadingReducer,
  auth: authReducer,
  giftCard: giftCardReducer,
});

export default rootReducers;
