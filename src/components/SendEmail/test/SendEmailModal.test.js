import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { mount } from "enzyme";
import SendEmailModal from "../SendEmailModal";
describe("Test suite for the Email Sending Modal", () => {
  const defaultProps = {
    isOpen: true,
    handleClose: jest.fn(),
    handleSubmit: jest.fn(),
    errorMessage: "",
    loading: false,
  };
  const theme = createTheme();
  const customRender = (type = "render", props = defaultProps) => {
    if (type === "render") {
      return render(
        <ThemeProvider theme={theme}>
          <SendEmailModal isOpen={true} {...props} />
        </ThemeProvider>
      );
    } else {
      return mount(
        <ThemeProvider theme={theme}>
          <SendEmailModal {...props} />
        </ThemeProvider>
      );
    }
  };

  it("Should create a snapshot of the SendEmailModal", () => {
    const { asFragment } = customRender();
    expect(asFragment()).toMatchSnapshot();
  });

  it("Should contain a form and a input field of type email", () => {
    const view = customRender("mount");
    expect(view.find("form").length).toBe(1);
    expect(view.find("input[name='email']").length).toBe(1);
  });

  it("Should have show Invalid email if the email address is no valid", async () => {
    customRender();
    const emailElement = screen.getByRole("textbox", { type: "text" });
    fireEvent.change(emailElement, { target: { value: "test" } });
    // Button click
    const button = screen.getByRole("button", { name: "Send" });
    fireEvent.click(button);
    await waitFor(() => {
      const emailErrorAfter = screen.getByText("Invalid email");
      expect(emailErrorAfter).toBeInTheDocument();
    });
  });

  it("Should be valid if a valid email address sent", async () => {
    customRender();
    const emailElement = screen.getByRole("textbox", { type: "text" });
    fireEvent.change(emailElement, { target: { value: "dummy@gmail.com" } });
    // Button click
    const button = screen.getByRole("button", { name: "Send" });
    fireEvent.click(button);
  });
});
