import { render } from "@testing-library/react";
import Navbar from "../Navbar";
import { BrowserRouter } from "react-router-dom";

describe("Navbar Test Suite Testing", () => {
  it("Should able to capture the snapshot of the Navbar", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Navbar open={true} />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
