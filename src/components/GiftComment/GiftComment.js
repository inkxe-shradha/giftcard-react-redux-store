import React from "react";
import StarRatingComponent from "react-star-rating-component";
import "../../pages/giftcard-details/index.scss";
import PropTypes from "prop-types";
import moment from "moment";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
const GiftComment = ({ comment, currentUser, onRemove, onEdit }) => {
  return (
    <div className="comment-section">
      <p className="comment-name">
        {" "}
        <strong>
          {comment.name
            ? comment.name
            : `${comment.first_name} ${comment.last_name}`}
        </strong>
        <span className="comment-date">
          {" "}
          <i>{moment(comment.commented_on).format("MMM DD, YYYY")}</i>
        </span>
      </p>
      {/* Edit / Remove Button */}
      {currentUser && currentUser?.email === comment?.email && (
        <div className="float-right">
          <IconButton
            aria-label="Edit Comment"
            color="primary"
            onClick={() => onEdit(comment)}
          >
            <ModeEditIcon />
          </IconButton>
          <IconButton
            aria-label="Delete Comment"
            color="error"
            onClick={() => onRemove(comment.id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      <p className="comment">{comment.comment}</p>
      <StarRatingComponent
        name="rating"
        emptyStarColor="#ffff"
        starCount={5}
        value={comment.rating}
        editing={false}
      />
    </div>
  );
};

// PropTypes
GiftComment.propTypes = {
  comment: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
export default GiftComment;
