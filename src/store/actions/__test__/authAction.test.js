import * as authAction from "../authAction";
import * as authTypes from "../../types/authTypes";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import mockAxios from "jest-mock-axios";
import { beginsLoading } from "../loadingAction";
const middleWare = [thunk];
const mockStore = configureStore(middleWare);

describe("authAction", () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
  });

  it("should return the correct type for loginSuccess if logged in as Google", async () => {
    const user = {
      email: "dummy@google.com",
      name: "Dummy",
      imageUrl: "https://source.unsplash.com/random/900X700/?avatar",
      balance_points: 5000,
      wishlist: [],
      cards_gifted: [],
      cards_received: [],
      role: "user",
      id: 3923293283923898898,
    };
    // Initialize fetch mock
    mockAxios.post.mockResolvedValueOnce(user);
    const expectedAction = {
      type: authTypes.LOGIN_SUCCESS,
      payload: user,
    };
    mockAxios.get.mockResolvedValueOnce({
      data: [
        {
          email: "dummy@google.com",
          name: "Dummy",
          imageUrl: "https://source.unsplash.com/random/900X700/?avatar",
          balance_points: 5000,
          wishlist: [],
          cards_gifted: [],
          cards_received: [],
          role: "user",
          id: 3923293283923898898,
        },
      ],
    });
    const store = mockStore({});
    return store.dispatch(authAction.signInUser(user, "google")).then(() => {
      const actions = store.getActions();
      expect(actions.length).toBe(1);
      expect(store.getActions()).toEqual([expectedAction]);
    });
  });

  it("Should be show logged in when the user exit in the system", () => {
    const user = [
      {
        email: "dummy@google.com",
        name: "Dummy",
        imageUrl: "https://source.unsplash.com/random/900X700/?avatar",
        balance_points: 5000,
        wishlist: [],
        cards_gifted: [],
        cards_received: [],
        role: "user",
        id: 39232932839,
      },
    ];
    mockAxios.get.mockResolvedValueOnce({ data: user });
    mockAxios.get.mockResolvedValueOnce({
      data: [],
    });
    const expectedAction = {
      type: authTypes.LOGIN_SUCCESS,
      payload: user,
    };
    const store = mockStore({});
    return store.dispatch(authAction.signInUser(user)).then(() => {
      const actions = store.getActions();
      expect(actions.length).toBe(1);
      expect(store.getActions()).toEqual([expectedAction]);
    });
  });

  it("should return the correct type for loginSuccess if logged in as Email", async () => {
    const user = {
      email: "user@gmail.com",
      name: "Dummy",
      imageUrl: "https://source.unsplash.com/random/900X700/?avatar",
      balance_points: 5000,
      wishlist: [],
      cards_gifted: [],
      cards_received: [],
      role: "user",
      id: 39232932839238,
    };

    const actionFn = authAction.signInUser(user, "admin");
    const dispatch = jest.fn();
    const userAction = await actionFn(dispatch);
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(1);
    const expectedAction = {
      type: authTypes.LOGIN_SUCCESS,
      payload: user,
    };
    expect(dispatch.mock.calls[0]).toEqual([expectedAction]);
  });

  it("should return the correct type for logoutSuccess", () => {
    const expectedAction = {
      type: authTypes.LOGOUT_SUCCESS,
    };
    const store = mockStore({});
    store.dispatch(authAction.logOutUser());
    expect(store.getActions()).toEqual([expectedAction]);
  });
});
