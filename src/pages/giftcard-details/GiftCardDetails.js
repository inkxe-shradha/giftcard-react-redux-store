import {
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewComment,
  loadSingleCard,
  sendEmail,
} from "../../store/actions/giftCardAction";
import moment from "moment";
import GiftComment from "../../components/GiftComment/GiftComment";
import StarRatingComponent from "react-star-rating-component";
import SendEmailModal from "../../components/SendEmail/SendEmailModal";
import { toast } from "react-toastify";

const styles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    border: "1px solid" + theme.palette.primary.main,
    wordBreak: "break-all",
    borderRadius: "10px",
    width: "100%",
  },
  maxImageHeight: {
    maxHeight: "500px",
    overflow: "auto",
  },
}));
const GiftCardDetails = (props) => {
  const classes = styles();
  const giftCardDetails = useSelector(
    (state) => state.giftCard.giftCardDetails
  );

  const { emailLoader, emailError } = useSelector((state) => ({
    emailLoader: state.giftCard.sendingEmailLoader,
    emailError: state.giftCard.giftCardError,
  }));

  const authenticationStatus = useSelector(
    (state) => state.auth.isAuthenticated
  );

  const userObject = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [starCount, setStarCount] = useState(0);
  const [comment, setCommentCount] = useState("");
  const [isCommentEmpty, setCommentEmpty] = useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [errorMess, setErrorMess] = useState(emailError || "");
  const [editCommentId, setEditCommentId] = useState(null);
  const commentRef = useRef(null);

  const { id } = useParams();
  useEffect(() => {
    dispatch(loadSingleCard(id));
  }, [id, dispatch]);

  const handelAddComment = (e) => {
    if (!comment) {
      setCommentEmpty(true);
      return;
    }
    let commentObj = {};
    if (!editCommentId) {
      commentObj = {
        name: userObject.name,
        email: userObject.email,
        rating: starCount,
        comment,
        commented_on: moment().format("YYYY-MM-DD"),
        id: new Date().getTime() + Math.floor(Math.random() * 1000 + 1000),
      };
    }
    setCommentEmpty(false);
    dispatch(
      addNewComment({
        ...giftCardDetails,
        cardComments: !editCommentId
          ? [...giftCardDetails.cardComments, commentObj]
          : giftCardDetails.cardComments.map((ele) => {
              if (ele.id === editCommentId) {
                return { ...ele, comment, rating: starCount };
              }
              return ele;
            }),
      })
    ).then(() => {
      setCommentCount("");
      setStarCount(0);
      setEditCommentId(null);
    });
  };

  const handelSendEmail = (value) => {
    if (
      +userObject.balance_points < +giftCardDetails.cardPoints ||
      +giftCardDetails.cardCount === 0
    ) {
      setErrorMess("Insufficient balance points");
      return;
    }
    dispatch(
      sendEmail(
        value.email,
        userObject.email,
        `Your Gift Card Worth ${giftCardDetails.cardPoints} is here.`,
        giftCardDetails
      )
    )
      .then((res) => {
        console.log(res);
        setErrorMess("");
        setIsSendModalOpen(false);
        toast.success("Email sent successfully");
      })
      .catch((err) => {
        console.log(err);
        setErrorMess("Email not sent");
      });
  };

  const onRemoveComments = (id) => {
    const newComments = giftCardDetails.cardComments.filter(
      (comment) => comment.id !== id
    );
    dispatch(
      addNewComment({
        ...giftCardDetails,
        cardComments: newComments,
      })
    );
  };

  const onEditComments = (comment) => {
    setCommentCount(comment.comment);
    setStarCount(comment.rating);
    setEditCommentId(comment.id);
    commentRef.current.focus();
    commentRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <Container maxWidth="xl" className="mt-5">
      {giftCardDetails && (
        <Paper className={classes.paper}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} sm={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <img
                    src={giftCardDetails.cardImage}
                    alt="Card Img Details"
                    className="img-fluid img-thumbnail"
                    width="100%"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Divider className="mb-2" />
                  <Button
                    fullWidth
                    onClick={() => setIsSendModalOpen(true)}
                    variant="contained"
                    className={!authenticationStatus ? "d-none" : ""}
                  >
                    Send The Gift
                  </Button>
                  <table className="table table-dark mt-1 table-borderless">
                    <tbody>
                      <tr>
                        <td>
                          <Typography variant="p" color="primary">
                            <strong>Gift Card Number</strong>
                          </Typography>
                        </td>
                        <td>#GIFT-{(giftCardDetails?.id || 101) + 2022}</td>
                      </tr>
                      <tr>
                        <td>
                          <Typography variant="p" color="primary">
                            <strong>Gift Card Value</strong>
                          </Typography>
                        </td>
                        <td>$ {giftCardDetails.cardPoints}</td>
                      </tr>
                      <tr>
                        <td>
                          <Typography variant="p" color="primary">
                            <strong>Gift Card Expiry Date</strong>
                          </Typography>
                        </td>
                        <td>
                          {moment(giftCardDetails.cardExpiryDate).format(
                            "MMMM Do YYYY"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Typography variant="p" color="primary">
                            <strong>Available Cards</strong>
                          </Typography>
                        </td>
                        <td>
                          {giftCardDetails.cardCount > 20 ? (
                            <span className="badge bg-gradient badge-pill bg-success">
                              {giftCardDetails.cardCount}
                            </span>
                          ) : (
                            <span className="badge bg-gradient badge-pill bg-danger">
                              {giftCardDetails.cardCount}
                            </span>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={8} sm={6}>
              <Box>
                <Typography variant="h4">
                  {giftCardDetails.cardName} -{" "}
                  <small> {giftCardDetails.cardRetailer}</small>
                </Typography>
              </Box>
              {/* Product Description */}
              <Box className="mt-2">
                <Typography variant="body">
                  {giftCardDetails.cardLongDesc}
                </Typography>
              </Box>
              <Divider className="my-2" />
              {/* Comment Section */}
              <Box className={classes.maxImageHeight}>
                <Typography variant="h6">Rating & Reviews</Typography>
                {giftCardDetails?.cardComments?.length > 0 &&
                  giftCardDetails.cardComments.map((comment) => (
                    <GiftComment
                      comment={comment}
                      key={comment.id}
                      currentUser={userObject}
                      onRemove={onRemoveComments}
                      onEdit={onEditComments}
                    />
                  ))}
                {/* No comments */}
                {giftCardDetails?.cardComments?.length === 0 && (
                  <Typography variant="body" margin="normal" className="mt-2">
                    <em> No comments yet. Be the first to comment.</em>
                  </Typography>
                )}
              </Box>
              {authenticationStatus && (
                <Paper
                  elevation={10}
                  sx={{
                    padding: (theme) => {
                      return theme.spacing(2);
                    },
                    marginTop: (theme) => {
                      return theme.spacing(2);
                    },
                  }}
                >
                  <div className="my-2">
                    <Typography variant="h6">Add Comment</Typography>
                    <Typography variant="body">
                      Please add your comment here.
                    </Typography>
                  </div>
                  <StarRatingComponent
                    name="rating"
                    starCount={5}
                    value={starCount}
                    emptyStarColor="#ffff"
                    editing={true}
                    onStarClick={(nextValue) => setStarCount(nextValue)}
                  />
                  <TextField
                    inputRef={commentRef}
                    id="outlined-pass-comments-static"
                    label="Your valuable comments..."
                    aria-label="your comments"
                    fullWidth
                    multiline
                    rows={4}
                    name="comment"
                    required
                    value={comment}
                    error={isCommentEmpty}
                    onChange={(e) => setCommentCount(e.target.value)}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handelAddComment}
                    className={
                      !authenticationStatus ? "d-none" : "btn-comment mt-2"
                    }
                  >
                    {editCommentId ? "Edit Comment" : "Add Comment"}
                  </Button>
                </Paper>
              )}
            </Grid>
          </Grid>
        </Paper>
      )}
      <SendEmailModal
        isOpen={isSendModalOpen}
        handleClose={() => setIsSendModalOpen(false)}
        handleSubmit={handelSendEmail}
        loading={emailLoader}
        errorMessage={errorMess}
      />
    </Container>
  );
};

export default GiftCardDetails;
