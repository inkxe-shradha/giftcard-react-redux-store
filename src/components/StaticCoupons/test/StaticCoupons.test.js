import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import { render } from "@testing-library/react";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import StaticCoupons from "../StaticCoupons";

describe("Static coupons description test suite", () => {
  const customRender = (type = "render") => {
    const theme = createTheme();
    if (type === "render") {
      return render(
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <StaticCoupons />
          </BrowserRouter>
        </ThemeProvider>
      );
    } else {
      return mount(
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <StaticCoupons />
          </BrowserRouter>
        </ThemeProvider>
      );
    }
  };
  it("Should create a snapshot of the StaticCoupons  page", () => {
    const { asFragment } = customRender();
    expect(asFragment()).toMatchSnapshot();
  });

  it("Should must have 8 div with the className MuiGrid-grid-md-3", () => {
    const view = customRender("mount");
    expect(view.find(".MuiGrid-grid-md-3").length).toBe(8);
  });

  it("Should have 14 div of className MuiGrid-grid-xs-12", () => {
    const view = customRender("mount");
    expect(view.find(".MuiGrid-grid-xs-12").length).toBe(14);
  });
});
