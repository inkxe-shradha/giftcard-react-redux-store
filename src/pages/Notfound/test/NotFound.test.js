import { createTheme, ThemeProvider } from "@mui/material";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import NotFound from "../NotFound";

describe("NotFound component suite case", () => {
  const theme = createTheme();
  const customRender = (props = {}) => {
    return mount(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <NotFound {...props} />
        </BrowserRouter>
      </ThemeProvider>
    );
  };
  it("Should render the component snapshot", () => {
    const view = customRender();
    expect(view.html()).toMatchSnapshot();
  });

  it("Should contain a anchor tag that would have '/' href value", () => {
    const view = customRender();
    expect(view.find("a").prop("href")).toBe("/");
  });
});
