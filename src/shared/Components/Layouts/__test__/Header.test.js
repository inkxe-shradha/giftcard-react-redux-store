import { mount } from "enzyme";
import { ThemeProvider } from "@mui/system";
import { BrowserRouter as Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { createTheme } from "@mui/material";
import Header from "../header/Header";
import { render, screen } from "@testing-library/react";

const theme = createTheme();
describe("Header Test Suite Testing", () => {
  const customRender = (component, location) => {
    const history = createMemoryHistory();
    history.push(location);
    return render(
      <ThemeProvider theme={theme}>
        <Router location={history.location} navigator={history}>
          {component}
        </Router>
      </ThemeProvider>
    );
  };
  const mountRender = (component, location) => {
    const history = createMemoryHistory();
    history.push(location);
    return mount(
      <ThemeProvider theme={theme}>
        <Router location={history.location} navigator={history}>
          {component}
        </Router>
      </ThemeProvider>
    );
  };

  const layoutState = {
    user: {
      name: "Shradha suman praharaj",
      email: "",
      phone: "",
    },
    authStatus: false,
    logOut: jest.fn(),
  };

  it("Should create a snapshot of the header if the user is not authenticated", () => {
    const { asFragment } = customRender(
      <Header
        user={layoutState.user}
        authStatus={false}
        logOut={layoutState.logOut}
      />,
      "/"
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("Should be show login if the user is not authenticated", () => {
    customRender(
      <Header
        user={layoutState.user}
        authStatus={layoutState.authStatus}
        logOut={layoutState.logOut}
      />,
      "/"
    );
    expect(screen.getByText(/login/i)).toBeTruthy();
  });

  it("Should be show Gift received and Gift Sent button if the user is authenticated", () => {
    const view = mountRender(
      <Header
        user={layoutState.user}
        authStatus={true}
        logOut={layoutState.logOut}
      />,
      "/"
    );
    expect(view.text().includes("Gift Received")).toBeTruthy();
    expect(view.text().includes("Gift Sent")).toBeTruthy();
    expect(view.text().includes("Home")).toBeTruthy();
  });

  it("Should be show logout button if the user is authenticated", () => {
    const view = mountRender(
      <Header
        user={layoutState.user}
        authStatus={true}
        logOut={layoutState.logOut}
      />,
      "/"
    );
    // click button
    view.find("svg[data-testid='AccountCircleIcon']").simulate("click");
    expect(view.text().includes("Logout")).toBeTruthy();
  });
});
