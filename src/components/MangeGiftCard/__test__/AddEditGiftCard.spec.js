import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { mount } from "enzyme";
import AddEditGiftCard from "../AddEditGiftCard";
const theme = createTheme();

describe("Gift card Manage Test Suite", () => {
  const pageProps = {
    isOpen: true,
    onClose: jest.fn(),
    handelSubmitted: jest.fn(),
    errorMessage: "",
    isLoading: false,
    giftCard: {},
    mode: "add",
  };
  const customRender = (props = pageProps, type = "render") => {
    if (type === "render") {
      return render(
        <ThemeProvider theme={theme}>
          <AddEditGiftCard {...props} />
        </ThemeProvider>
      );
    } else {
      return mount(
        <ThemeProvider theme={theme}>
          <AddEditGiftCard {...props} />
        </ThemeProvider>
      );
    }
  };

  it("Should render the component snapshot", () => {
    const view = customRender(pageProps, "mount");
    expect(view.html()).toMatchSnapshot();
  });

  it("Should have the title send mail in the modal", () => {
    customRender();
    expect(screen.getAllByText("Send Email")).toHaveLength(2);
  });

  it("Should be contain all the input field with valid name", async () => {
    customRender();
    expect(screen.getByLabelText(/Card Points/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Card Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Card Category Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Card Retailer/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Card Short Descriptions/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Card Long Descriptions/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Card Image Url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Card Vendor/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of card count/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Expires On/i)).toBeInTheDocument();
  });

  it("Should be empty field  when the form loaded", () => {
    customRender();
    const submitButton = screen.getByRole("button", { name: "Save" });
    const form = screen.getAllByTestId("add-edit-gift-card-form")[0];
    fireEvent.click(submitButton);
    expect(form).toHaveFormValues({
      cardName: "",
      cardCategory: "",
      cardRetailer: "",
      cardShortDesc: "",
      cardLongDesc: "",
      cardImage: "",
      cardVendor: "",
      cardCount: null,
      cardExpiryDate: "",
    });
  });

  it("Should be validate the form field once the submit button is clicked", async () => {
    customRender();
    const submitButton = screen.getByRole("button", { name: "Save" });
    fireEvent.click(submitButton);
    await waitFor(() => {
      const errorStatement = screen.getByText(/Card name is required/i);
      expect(errorStatement).toBeInTheDocument();
    });
    await waitFor(() => {
      const errorStatement = screen.getByText(/Card points is required/i);
      expect(errorStatement).toBeInTheDocument();
    });
    await waitFor(() => {
      const errorStatement = screen.getByText(/Card category is required/i);
      expect(errorStatement).toBeInTheDocument();
    });
    await waitFor(() => {
      const errorStatement = screen.getByText(/Card retailer is required/i);
      expect(errorStatement).toBeInTheDocument();
    });
    await waitFor(() => {
      const errorStatement = screen.getByText(/Card expiry date is required/i);
      expect(errorStatement).toBeInTheDocument();
    });
    await waitFor(() => {
      const errorStatement = screen.getByText(/Card image is required/i);
      expect(errorStatement).toBeInTheDocument();
    });
    await waitFor(() => {
      const errorStatement = screen.getByText(/Card vendor is required/i);
      expect(errorStatement).toBeInTheDocument();
    });
    await waitFor(() => {
      const errorStatement = screen.getByText(/Card description is required/i);
      expect(errorStatement).toBeInTheDocument();
    });
  });

  it("Should show the same form value as it pass down from component props in giftcard Obj", async () => {
    const onSubmit = jest.fn();
    const giftCard = {
      cardName: "Test Card",
      cardCategory: "Test Category",
      cardRetailer: "Test Retailer",
      cardShortDesc: "Test Short Desc",
      cardLongDesc: "Test Long Desc",
      cardImage: "Test Image",
      cardVendor: "Test Vendor",
      cardCount: 1,
      cardExpiryDate: "2020-01-01",
    };
    const pageProps = {
      isOpen: true,
      onClose: jest.fn(),
      handelSubmitted: jest.fn(),
      errorMessage: "",
      isLoading: false,
      giftCard,
      mode: "edit",
    };
    customRender(pageProps);
    const submitButton = screen.getByRole("button", { name: "Save" });
    fireEvent.click(submitButton);
    await waitFor(() => {
      const form = screen.getAllByTestId("add-edit-gift-card-form")[1];
      expect(form).toHaveFormValues({
        cardName: "Test Card",
        cardCategory: "Test Category",
        cardRetailer: "Test Retailer",
        cardShortDesc: "Test Short Desc",
        cardLongDesc: "Test Long Desc",
        cardImage: "Test Image",
        cardVendor: "Test Vendor",
        cardCount: 1,
        cardExpiryDate: "2020-01-01",
      });
    });
  });

  it("Should called the onClose function when the  card is closed", () => {
    customRender();
    const closeButton = screen.getAllByLabelText(/Close/i)[0];
    fireEvent.click(closeButton);
    expect(pageProps.onClose).toHaveBeenCalled();
  });

  it("Should called the handelSubmitted function when the  card is submitted", async () => {
    const giftCard = {
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
    };
    const pageProps = {
      isOpen: true,
      onClose: jest.fn(),
      handelSubmitted: jest.fn(),
      errorMessage: "",
      isLoading: false,
      giftCard,
      mode: "edit",
    };
    customRender(pageProps);
    const submitButton = screen.getByRole("button", { name: "Save" });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(pageProps.handelSubmitted).toHaveBeenCalled();
    });
  });
});
