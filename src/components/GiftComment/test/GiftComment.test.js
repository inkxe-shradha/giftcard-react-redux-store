import { render, screen } from "@testing-library/react";
import GiftComment from "../GiftComment";

describe("Gift card comment test suite", () => {
  const compProps = {
    comment: {
      id: 1,
      name: "John Doe",
      email: "jhondoe@gmail.com",
      comment: "This is a comment",
      rating: 4,
      commented_on: "2020-05-05T00:00:00.000Z",
    },
    currentUser: {},
    onRemove: jest.fn(),
    onEdit: jest.fn(),
  };

  it("Should render the comment component snapshot", () => {
    const { asFragment } = render(<GiftComment {...compProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("Should show the edit and delete button when commented used logged In", () => {
    render(
      <GiftComment
        {...compProps}
        currentUser={{ email: "jhondoe@gmail.com" }}
      />
    );
    expect(screen.getByLabelText("Edit Comment")).toBeInTheDocument();
    expect(screen.getByLabelText("Delete Comment")).toBeInTheDocument();
  });

  it("Should be contain the passed comment by the comment", () => {
    render(<GiftComment {...compProps} />);
    expect(screen.getByText("This is a comment")).toBeInTheDocument();
  });

  it("Should should be call the edit and delete function when edit and delete button clicked", () => {
    render(
      <GiftComment
        {...compProps}
        currentUser={{ email: "jhondoe@gmail.com" }}
      />
    );
    const editButton = screen.getByLabelText("Edit Comment");
    const deleteButton = screen.getByLabelText("Delete Comment");
    editButton.click();
    deleteButton.click();
    expect(compProps.onEdit).toHaveBeenCalled();
    expect(compProps.onRemove).toHaveBeenCalled();
  });
});
