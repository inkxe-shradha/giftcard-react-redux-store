import { createTheme, ThemeProvider } from "@mui/material";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import Home from "../Home";

describe("Home component suite case", () => {
  const theme = createTheme();
  const customRender = (props = {}) => {
    return mount(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Home {...props} />
        </BrowserRouter>
      </ThemeProvider>
    );
  };
  it("Should render the component snapshot", () => {
    const view = customRender();
    expect(view.html()).toMatchSnapshot();
  });
});
