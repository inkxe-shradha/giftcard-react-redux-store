import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reduxImmutableStateVariant from "redux-immutable-state-invariant";
import rootReducers from "./reducers";
const middleWare =
  process.env.NODE_ENV !== "production"
    ? [reduxImmutableStateVariant(), thunk]
    : [thunk];
export default function store(initialState = {}) {
  // Add support for Redux dev tools
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducers,
    initialState,
    composeEnhancers(applyMiddleware(...middleWare))
  );
}
