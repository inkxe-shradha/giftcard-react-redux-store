import { createMemoryHistory } from "history";
import { mount } from "enzyme";
import { ThemeProvider } from "@mui/system";
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme } from "@mui/material";
import Layout from "../Layout";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

describe("Layout test suite", () => {
  const theme = createTheme();
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const state = {
    auth: {
      user: {},
      isAuthenticated: false,
    },
    loading: {
      loading: false,
    },
  };
  const mountRender = (component, location, initialState = state) => {
    const history = createMemoryHistory();
    history.push(location);
    const store = mockStore(initialState);
    return mount(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router location={history.location} navigator={history}>
            {component}
          </Router>
        </ThemeProvider>
      </Provider>
    );
  };
  it("Should create a snapshot of the layout  page", () => {
    const view = mountRender(<Layout />, "/");
    expect(view.html()).toMatchSnapshot();
  });
});
