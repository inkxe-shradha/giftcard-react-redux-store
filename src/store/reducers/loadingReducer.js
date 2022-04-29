import { BEGINS_LOADING, ENDS_LOADING } from "../types/loagingTypes";
const initialState = {
  loading: false,
  error: null,
};

const loadingReducer = (state = initialState, action) => {
  if (action.type === BEGINS_LOADING) {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === ENDS_LOADING) {
    return {
      ...state,
      loading: false,
    };
  }
  return state;
};

export default loadingReducer;
