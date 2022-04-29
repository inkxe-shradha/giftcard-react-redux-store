import Spinner from "../Spinner";
import { render } from "@testing-library/react";
describe("LoaderComponent", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<Spinner isLoading={false} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correctly with loading", () => {
    const { asFragment } = render(<Spinner isLoading={true} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
