import { render, screen } from "@testing-library/react";
import { shallow } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "../footer/Footer";

describe("Footer test suite", () => {
  it("Should create a snapshot of the footer  page", () => {
    const { asFragment } = render(
      <Router>
        <Footer />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("Should get the current year in the document page", () => {
    const warper = shallow(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(warper.text().includes(currentYear)).toBe(true);
  });
});
