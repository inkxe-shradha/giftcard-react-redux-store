import React from "react";
import Modal from "@mui/material/Modal";
import Container from "@mui/material/Container";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import Alert from "@mui/material/Alert";
import * as yup from "yup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
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
}));
const validationSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const SendEmailModal = ({
  isOpen,
  handleClose,
  handleSubmit,
  errorMessage,
  loading,
}) => {
  const initialValues = {
    email: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  const classes = useStyles();
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="Modal for opening the Sending the modal"
      aria-describedby="short modal form descriptions"
    >
      <Container maxWidth="sm">
        <Box sx={{ ...style }} className={classes.modalBox}>
          <IconButton
            className={classes.iconButton}
            aria-label="close"
            onClick={handleClose}
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
          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Sender Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  required
                  margin="normal"
                />
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-12 text-center">
                <LoadingButton
                  id="sendEmailBtn"
                  loading={loading}
                  type="submit"
                  variant="contained"
                  margin="normal"
                  sx={{ margin: 2 }}
                  endIcon={<SendIcon />}
                >
                  Send
                </LoadingButton>
              </div>
            </div>
          </form>
        </Box>
      </Container>
    </Modal>
  );
};

// PropTypes validation
SendEmailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

export default SendEmailModal;
