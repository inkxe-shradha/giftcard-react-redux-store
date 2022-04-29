import Profile from "../Profile";
import thunk from "redux-thunk";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/system";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { createTheme } from "@mui/material";
import { render, screen } from "@testing-library/react";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const theme = createTheme();
const state = {
  auth: {
    user: {},
    isAuthenticated: false,
  },
  loading: {
    loading: false,
  },
};
describe("Profile test suite", () => {
  const customRender = (location, initialState = state) => {
    const history = createMemoryHistory();
    history.push(location);
    const store = mockStore(initialState);
    return render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router location={history.location} navigator={history}>
            <Profile />
          </Router>
        </ThemeProvider>
      </Provider>
    );
  };

  it("Should render the component snapshot", () => {
    const { asFragment } = customRender("/profile");
    expect(asFragment()).toMatchSnapshot();
  });

  it("Should contain the passed user state object in the document", () => {
    customRender("/profile", {
      ...state,
      auth: {
        ...state.auth,
        user: {
          name: "John Doe",
          email: "jhonedoe@yahoo.com",
          imageUrl: "https://source.unsplash.com/random/900X700/?avatar",
          balance_points: 2000,
        },
      },
    });
    const nameElement = screen.getByText(/John Doe/i);
    const emailElement = screen.getByText(/jhonedoe@yahoo.com/i);
    const balanceElement = screen.getByText(/2000/i);
    expect(nameElement).toBeTruthy();
    expect(emailElement).toBeTruthy();
    expect(balanceElement).toBeTruthy();
  });
});
