import { render } from "@testing-library/react";
import { mount } from "enzyme";
import NoDataTable from "../NoDataTable";

describe("NoTable test suite case", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<NoDataTable />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("Should have 7 table head available when the props type passed as received", () => {
    const warper = mount(<NoDataTable type="received" />);
    expect(warper.find("th").length).toBe(7);
  });

  it("Should have 6 table head available when the props type passed as sent", () => {
    const warper = mount(<NoDataTable type="sent" />);
    expect(warper.find("th").length).toBe(6);
  });
});
