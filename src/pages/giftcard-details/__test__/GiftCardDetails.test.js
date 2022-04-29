import { createMemoryHistory } from "history";
import { mount } from "enzyme";
import { ThemeProvider } from "@mui/system";
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme } from "@mui/material";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import GiftCardDetails from "../GiftCardDetails";
import * as reactRedux from "react-redux";
import React from "react";
const state = {
  giftCard: {
    giftCardDetails: {
      cardName: "Uber Gift Card",
      cardPoints: 12,
      cardCategory: "Ecommerce",
      cardRetailer: "Amazon",
      cardIssueDate: "2022-04-18T07:11:54.233Z",
      cardExpiryDate: "2025-01-01T00:00:00.000Z",
      cardCount: 91,
      cardImage: "https://source.unsplash.com/random/250*250?apple",
      cardVendor: "Uber",
      cardShortDesc: "10% OFF",
      cardLongDesc:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quisquam tenetur alias ducimus nostrum voluptate, nam suscipit ipsa dolorem mollitia error soluta, distinctio esse. Earum, quo! Cupiditate dignissimos iste ratione.",
      cardComments: [],
      id: 1650265917967,
    },
    emailLoader: false,
    emailError: "",
  },
  auth: {
    user: {},
    isAuthenticated: false,
  },
  loading: {
    loading: false,
  },
};
describe("Gift card details test suite", () => {
  const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
  const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
  const useEffectMock = jest.spyOn(React, "useEffect");
  beforeEach(() => {
    useSelectorMock.mockReturnValue(state);
    useEffectMock.mockImplementation((f) => f());
    const loadSingleCard = jest.fn();
    useDispatchMock.mockReturnValue(loadSingleCard);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  const theme = createTheme();
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);

  const customRender = (location, type = "render", initialState = state) => {
    const history = createMemoryHistory();
    history.push(location);
    const store = mockStore(initialState);
    if (type === "render") {
      return render(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Router location={history.location} navigator={history}>
              <GiftCardDetails />
            </Router>
          </ThemeProvider>
        </Provider>
      );
    } else {
      return mount(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Router location={history.location} navigator={history}>
              <GiftCardDetails />
            </Router>
          </ThemeProvider>
        </Provider>
      );
    }
  };

  it("Should create a snapshot of the GiftCardDetails  page", () => {
    const { asFragment } = customRender("card/1");
    expect(asFragment()).toMatchSnapshot();
  });

  it("Should call the loadSingleCard function inside the dispatch method", () => {
    const loadSingleCard = jest.fn();
    const view = customRender("card/1", "mount", state);
    const store = mockStore(state);
    store.dispatch(loadSingleCard);
    expect(loadSingleCard).toHaveBeenCalled();
  });

  it("Should contain the gift card number that been load from the selectors state", () => {
    customRender("card/1");
    expect(
      screen.getByText(`#GIFT-${state.giftCard.giftCardDetails.id + 2022}`)
    ).toBeInTheDocument();
  });

  it("Should be have Show empty comment if we don't have any comment added", () => {
    customRender("card/1");
    expect(
      screen.getByText(/No comments yet. Be the first to comment./i)
    ).toBeInTheDocument();
  });

  it("Should be so the 'Add Comment' button if we have authenticated", () => {
    customRender("card/1", "render", {
      ...state,
      auth: { ...state.auth, isAuthenticated: true },
    });
    expect(
      screen.getByRole("button", {
        name: /Add Comment/i,
      })
    ).toBeInTheDocument();
  });

  it("Should call the handelSubmitted method when we click on the add comment", async () => {
    customRender("card/1", "render", {
      ...state,
      auth: { ...state.auth, isAuthenticated: true },
    });
    const addCommentButton = screen.getByRole("button", {
      name: /Add Comment/i,
    });
    expect(
      screen.getByRole("button", {
        name: /Add Comment/i,
      })
    ).toBeInTheDocument();
    const commentElement = screen.getByLabelText(/Your valuable comments.../i);
    fireEvent.change(commentElement, { target: { value: "test comment" } });
    fireEvent.click(addCommentButton);
    await waitFor(() => {
      expect(commentElement.value).toBe("test comment");
    });
  });
});
