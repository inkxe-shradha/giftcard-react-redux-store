import React from "react";
import { makeStyles } from "@mui/styles";
import * as yup from "yup";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import Modal from "@mui/material/Modal";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "-webkit-fill-available",
  overflow: "auto",
};

const useStyles = makeStyles((theme) => ({
  modalBox: {
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: "60%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "60%",
    },
  },
  iconButton: {
    textAlign: "right",
    float: "right",
  },
  imagePreview: {
    width: "100%",
    "& img": {
      maxHeight: "300px",
    },
  },
}));

const validationSchema = yup.object({
  cardName: yup.string().required("Card name is required"),
  cardPoints: yup.number().required("Card points is required"),
  cardCategory: yup.string().required("Card category is required"),
  cardRetailer: yup.string().required("Card retailer is required"),
  cardExpiryDate: yup.string().required("Card expiry date is required"),
  cardCount: yup.number().required("Card count is required"),
  cardImage: yup
    .string()
    .required("Card image is required")
    .url("Image URL is required."),
  cardVendor: yup.string().required("Card vendor is required"),
  cardShortDesc: yup.string().notRequired(),
  cardLongDesc: yup.string().required("Card description is required"),
});

const initialValues = {
  cardName: "",
  cardPoints: "",
  cardCategory: "",
  cardRetailer: "",
  cardExpiryDate: "",
  cardCount: "",
  cardImage: "",
  cardVendor: "",
  cardShortDesc: "",
  cardLongDesc: "",
};
const AddEditGiftCard = ({
  isOpen,
  onClose,
  handelSubmitted,
  errorMessage,
  isLoading,
  giftCard,
  mode = "add",
}) => {
  const classes = useStyles();
  const updatedValues = mode === "edit" ? giftCard : initialValues;
  const formik = useFormik({
    initialValues: updatedValues,
    validationSchema,
    onSubmit: (values) => {
      handelSubmitted({
        ...values,
        cardIssueDate: new Date().toLocaleDateString(),
        cardComments: [],
      });
    },
  });

  const handelClose = () => {
    formik.resetForm();
    onClose();
  };
  return (
    <Modal
      open={isOpen}
      onClose={handelClose}
      aria-labelledby="Modal for opening the Add Edit Giftcard modal"
      aria-describedby="Giftcard modal opening it."
    >
      <Container maxWidth="sm">
        <Box sx={{ ...style }} className={classes.modalBox}>
          <IconButton
            className={classes.iconButton}
            aria-label="close"
            onClick={handelClose}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Send Email
          </Typography>
          {errorMessage && (
            <Alert severity="error" className="my-2">
              {errorMessage}
            </Alert>
          )}
          <form
            onSubmit={formik.handleSubmit}
            data-testid="add-edit-gift-card-form"
            className="row"
            noValidate
          >
            <div className="row mb-1">
              <div className="col-md-6">
                <TextField
                  fullWidth
                  id="cardName"
                  name="cardName"
                  label="Card Name"
                  value={formik.values.cardName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.cardName && Boolean(formik.errors.cardName)
                  }
                  helperText={formik.touched.cardName && formik.errors.cardName}
                  required
                  margin="normal"
                />
              </div>
              <div className="col-md-6">
                <TextField
                  fullWidth
                  id="cardPoints"
                  name="cardPoints"
                  label="Card Points"
                  type={"number"}
                  value={formik.values.cardPoints}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.cardPoints &&
                    Boolean(formik.errors.cardPoints)
                  }
                  helperText={
                    formik.touched.cardPoints && formik.errors.cardPoints
                  }
                  required
                  margin="normal"
                />
              </div>
            </div>

            <div className="row mb-1">
              <div className="col-md-6">
                <TextField
                  fullWidth
                  id="cardCategory"
                  name="cardCategory"
                  label="Card Category Name"
                  value={formik.values.cardCategory}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.cardCategory &&
                    Boolean(formik.errors.cardCategory)
                  }
                  helperText={
                    formik.touched.cardCategory && formik.errors.cardCategory
                  }
                  required
                  margin="normal"
                />
              </div>
              <div className="col-md-6">
                <TextField
                  fullWidth
                  id="cardRetailer"
                  name="cardRetailer"
                  label="Card Retailer"
                  value={formik.values.cardRetailer}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.cardRetailer &&
                    Boolean(formik.errors.cardRetailer)
                  }
                  helperText={
                    formik.touched.cardRetailer && formik.errors.cardRetailer
                  }
                  required
                  margin="normal"
                />
              </div>
            </div>

            <div className="row mb-1">
              <div className="col-md-8">
                <TextField
                  fullWidth
                  id="cardImage"
                  name="cardImage"
                  label="Card Image Url"
                  type="url"
                  value={formik.values.cardImage}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.cardImage && Boolean(formik.errors.cardImage)
                  }
                  helperText={
                    formik.touched.cardImage && formik.errors.cardImage
                  }
                  required
                  margin="normal"
                />

                {/* Image Preview */}
                {formik.values.cardImage && (
                  <div className={classes.imagePreview}>
                    <img
                      src={formik.values.cardImage}
                      alt="Card"
                      className="img-fluid img-thumbnail figure-img"
                    />
                  </div>
                )}
              </div>
              <div className="col-md-4">
                <TextField
                  fullWidth
                  id="cardCount"
                  name="cardCount"
                  label="Number of card count"
                  type="number"
                  value={formik.values.cardCount}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.cardCount && Boolean(formik.errors.cardCount)
                  }
                  helperText={
                    formik.touched.cardCount && formik.errors.cardCount
                  }
                  required
                  margin="normal"
                />
              </div>
            </div>

            <div className="row mb-1">
              <div className="col-md-4">
                <TextField
                  fullWidth
                  id="cardVendor"
                  name="cardVendor"
                  label="Card Vendor"
                  value={formik.values.cardVendor}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.cardVendor &&
                    Boolean(formik.errors.cardVendor)
                  }
                  helperText={
                    formik.touched.cardVendor && formik.errors.cardVendor
                  }
                  required
                  margin="normal"
                />
              </div>
              <div className="col-md-4">
                <TextField
                  fullWidth
                  id="cardShortDesc"
                  name="cardShortDesc"
                  label="Card Short Descriptions"
                  value={formik.values.cardShortDesc}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.cardShortDesc &&
                    Boolean(formik.errors.cardShortDesc)
                  }
                  helperText={
                    formik.touched.cardShortDesc && formik.errors.cardShortDesc
                  }
                  required
                  margin="normal"
                />
              </div>
              <div className="col-md-4">
                <TextField
                  fullWidth
                  id="cardExpiryDate"
                  name="cardExpiryDate"
                  type="date"
                  label="Expires On"
                  value={formik.values.cardExpiryDate}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.cardExpiryDate &&
                    Boolean(formik.errors.cardExpiryDate)
                  }
                  helperText={
                    formik.touched.cardExpiryDate &&
                    formik.errors.cardExpiryDate
                  }
                  required
                  margin="normal"
                />
              </div>
            </div>

            <div className="row mb-1">
              <div className="col-md-8 offset-md-2">
                <TextField
                  fullWidth
                  id="cardLongDesc"
                  name="cardLongDesc"
                  label="Card Long Descriptions"
                  value={formik.values.cardLongDesc}
                  multiline
                  rows="4"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.cardLongDesc &&
                    Boolean(formik.errors.cardLongDesc)
                  }
                  helperText={
                    formik.touched.cardLongDesc && formik.errors.cardLongDesc
                  }
                  required
                  margin="normal"
                />
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-12 text-center">
                <LoadingButton
                  loading={isLoading}
                  type="submit"
                  variant="contained"
                  margin="normal"
                  sx={{ margin: 2 }}
                  endIcon={<SendIcon />}
                >
                  Save
                </LoadingButton>
                <Button
                  type="reset"
                  margin="normal"
                  variant="contained"
                  color="error"
                  disabled={isLoading}
                  onClick={() => formik.resetForm()}
                  startIcon={<RestartAltIcon />}
                >
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </Box>
      </Container>
    </Modal>
  );
};

AddEditGiftCard.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  mode: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  handelSubmitted: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  giftCard: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
};

export default AddEditGiftCard;
