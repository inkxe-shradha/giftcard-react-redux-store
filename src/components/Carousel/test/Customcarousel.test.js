import { render } from "@testing-library/react";
import Carousel from "../Customcarousel";
import { BrowserRouter } from "react-router-dom";
import { mount } from "enzyme";

const mockedUsedNavigate = jest.fn();

// Mocks like this need to be configured at the top level

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Carousel testing suite cases", () => {
  it("Should able to capture the snapshot of the Carousel", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Carousel />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("Should have atleast 3 carousel images", () => {
    const view = mount(
      <BrowserRouter>
        <Carousel />
      </BrowserRouter>
    );
    expect(view.find(".carousel-img").length).toBeGreaterThanOrEqual(3);
  });

  it("Should navigate to the gift-card page if view more button clicked", () => {
    const view = mount(
      <BrowserRouter>
        <Carousel />
      </BrowserRouter>
    );
    view.find(".legend").at(0).simulate("click");
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/gift-cards");
  });
});
