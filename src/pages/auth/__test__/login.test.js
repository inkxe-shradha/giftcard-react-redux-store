import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../Login";
import thunk from "redux-thunk";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/system";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { createTheme } from "@mui/material";

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
const customRender = (component, location, initialState = state) => {
  const history = createMemoryHistory();
  history.push(location);
  const store = mockStore(initialState);
  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router location={history.location} navigator={history}>
          {component}
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

describe("The authentication page test suite", () => {
  it("Should create a snapshot of the login  page", () => {
    const { asFragment } = customRender(<Login />, "/login");
    expect(asFragment()).toMatchSnapshot();
  });

  it("Should sign in button present on the component", () => {
    customRender(<Login />, "/login");
    const linkElement = screen.getAllByText(/Sign In/i);
    expect(linkElement).toBeTruthy();
  });

  it("Input should be initially empty", () => {
    customRender(<Login />, "/login");
    const emailElement = screen.getByRole("textbox", { name: "Email" });
    const passwordElement = screen.getByLabelText(/password/i);
    expect(emailElement.value).toBe("");
    expect(passwordElement.value).toBe("");
  });

  it("Should be able to type an email", async () => {
    customRender(<Login />, "/login");
    const emailElement = screen.getByRole("textbox", { name: "Email" });
    fireEvent.change(emailElement, {
      target: { value: "shradhasuman2@gmail.com" },
    });
    await waitFor(() => {
      expect(emailElement.value).toBe("shradhasuman2@gmail.com");
    });
  });

  it("Should be able to type a password", async () => {
    customRender(<Login />, "/login");
    const passwordElement = screen.getByLabelText(/password/i);
    fireEvent.change(passwordElement, { target: { value: "12345678" } });
    await waitFor(() => {
      expect(passwordElement.value).toBe("12345678");
    });
  });

  it("Should be show invalid email if the email is not valid", async () => {
    customRender(<Login />, "/login");
    const errorElement = screen.queryByText(/Enter a valid email/i);
    expect(errorElement).not.toBeInTheDocument();
    // getting the email field for testing purposes
    const emailElement = screen.getByRole("textbox", { name: "Email" });
    fireEvent.change(emailElement, { target: { value: "shradhasuman.com" } });
    const submitButtonElement = screen.getByRole("button", { name: /Log in/i });

    fireEvent.click(submitButtonElement);
    await waitFor(() => {
      const emailErrorAfter = screen.getByText("Enter a valid email");
      expect(emailErrorAfter).toBeInTheDocument();
    });
  });

  it("Should be show invalid password if the password  length is less than 8", async () => {
    customRender(<Login />, "/login");
    const errorElement = screen.queryByText(
      /Password should be of minimum 8 characters length/i
    );
    expect(errorElement).not.toBeInTheDocument();
    // getting the email field for testing purposes
    const passwordElement = screen.getByLabelText(/password/i);
    fireEvent.change(passwordElement, { target: { value: "12345" } });
    const submitButtonElement = screen.getByRole("button", {
      name: /Log in/i,
    });

    fireEvent.click(submitButtonElement);
    await waitFor(() => {
      const passwordErrorAfter = screen.getByText(
        "Password should be of minimum 8 characters length"
      );
      expect(passwordErrorAfter).toBeInTheDocument();
    });
  });

  it("Should dispatch if the user given valid credentials", async () => {
    const history = createMemoryHistory();
    history.push("/login");
    customRender(<Login />, "/login");
    const emailElement = screen.getByRole("textbox", { name: "Email" });
    fireEvent.change(emailElement, { target: { value: "admin@gmail.com" } });
    const passwordElement = screen.getByLabelText(/password/i);
    fireEvent.change(passwordElement, { target: { value: "12345678" } });
    const submitButtonElement = screen.getByRole("button", {
      name: /Log in/i,
    });
    fireEvent.click(submitButtonElement);
    await waitFor(() => {
      const signInUser = jest.fn();
      const store = mockStore({});
      store.dispatch(signInUser);
      expect(signInUser).toHaveBeenCalled();
    });
  });
});
