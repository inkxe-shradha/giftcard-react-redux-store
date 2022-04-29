import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import GiftCardList from "../GiftCardList";
const theme = createTheme();
describe("Gift-card Test Suite cases", () => {
  const pageProps = {
    giftCard: {
      cardCount: 10,
      cardName: "Amazon Gift Card",
      id: 2932929,
      expiryDate: new Date(),
      cardImage: "",
      cardShortDesc: "Amazon gift card",
    },
    isAdmin: true,
    onEdit: jest.fn(),
    onDelete: jest.fn(),
  };

  const customRender = (props = pageProps, type = "render") => {
    if (type === "render") {
      return render(
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <GiftCardList {...props} />
          </BrowserRouter>
        </ThemeProvider>
      );
    } else {
      return mount(
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <GiftCardList {...props} />
          </BrowserRouter>
        </ThemeProvider>
      );
    }
  };

  it("Should show edit and delete button if Admin signed", () => {
    customRender();
    expect(screen.getByLabelText("Edit Card")).toBeInTheDocument();
    expect(screen.getByLabelText("Delete Card")).toBeInTheDocument();
  });

  it("Should not display edit and delete button if not Admin signed", () => {
    const pageProps = {
      giftCard: {
        cardCount: 10,
        cardName: "Amazon Gift Card",
        id: 2932929,
        expiryDate: new Date(),
        cardImage: "",
        cardShortDesc: "Amazon gift card",
      },
      isAdmin: false,
      onEdit: jest.fn(),
      onDelete: jest.fn(),
    };
    customRender(pageProps);
    expect(screen.queryByLabelText("Edit Card")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Delete Card")).not.toBeInTheDocument();
  });

  it("Should contain a button name view which will redirect to the gift-cards page", () => {
    customRender();
    expect(screen.getByText("View")).toBeInTheDocument();
  });

  it("Should contain the gift card name which is passed in the component props", () => {
    customRender();
    expect(screen.getByText("Amazon Gift Card")).toBeInTheDocument();
  });

  it("Should be able to trigger onEdit and OnDelete events", () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    const pageProps = {
      giftCard: {
        cardCount: 10,
        cardName: "Amazon Gift Card",
        id: 2932929,
        expiryDate: new Date(),
        cardImage: "",
        cardShortDesc: "Amazon gift card",
      },
      isAdmin: true,
      onEdit,
      onDelete,
    };
    customRender(pageProps);
    const editButton = screen.getByLabelText("Edit Card");
    const deleteButton = screen.getByLabelText("Delete Card");
    editButton.click();
    deleteButton.click();
    expect(onEdit).toHaveBeenCalled();
    expect(onDelete).toHaveBeenCalled();
  });
});
