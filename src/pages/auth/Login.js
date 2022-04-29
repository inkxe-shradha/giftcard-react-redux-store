import {
  Avatar,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Alert,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LoadingButton from "@mui/lab/LoadingButton";
import GoogleLogin from "react-google-login";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signInUser } from "../../store/actions/authAction";
import { toast } from "react-toastify";
const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary?.main,
  },
  margin: {
    margin: theme.spacing(3),
  },
  padding: {
    padding: theme.spacing(2),
  },
  paper: {
    margin: theme.spacing(3),
    padding: theme.spacing(2),
  },
  google: {
    borderRadius: theme.spacing(2),
    margin: theme.spacing(1),
  },
  container: {
    display: "flex !important",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  backButton: {
    float: "right",
  },
}));

const Login = ({ loading, signInUser, isAuthenticated, demoCall }) => {
  const classes = useStyles();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(state?.path || "/");
    }
  }, [isAuthenticated]);
  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const signUpObj = {
        email: values.email,
        name: "Admin",
        imageUrl: "https://source.unsplash.com/random/900X700/?avatar",
        balance_points: 10000,
        wishlist: [],
        cards_gifted: [],
        cards_received: [],
        role: "admin",
      };
      signInUser(signUpObj);
    },
  });
  // Google Validation Schemas
  const responseGoogle = (response) => {
    const signUpObj = {
      email: response.profileObj.email,
      name: response.profileObj.name,
      imageUrl: response.profileObj.imageUrl,
      balance_points: 5000,
      wishlist: [],
      cards_gifted: [],
      cards_received: [],
      role: "user",
      id: response.profileObj.googleId,
    };
    signInUser(signUpObj, "google");
  };

  const handelError = (error) => {
    toast.success(
      "Failed to logged in! Please tyr again with your google account"
    );
  };
  return (
    <Container maxWidth="sm" component="main" className={classes.container}>
      <Paper className={classes.paper} elevation={2}>
        <Grid container spacing={2} align="center" justifyContent="center">
          <Grid item xs={12} sm={12} md={12}>
            {/* Back button */}
            <IconButton
              color="default"
              aria-label="back button"
              className={classes.backButton}
              onClick={() => navigate("/")}
            >
              <ArrowBackIcon />
            </IconButton>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h4">Login</Typography>
          </Grid>
          <Grid item xs={12}>
            <form
              onSubmit={formik.handleSubmit}
              className={classes.form}
              noValidate
            >
              {/* {errorMess && <Alert severity="error">{errorMess}</Alert>} */}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                placeholder="User Email Id"
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                placeholder="*******"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                autoComplete="current-password"
              />
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                loading={loading}
                color="primary"
                endIcon={<KeyboardArrowRight />}
                className={classes.submit}
              >
                Log in
              </LoadingButton>
            </form>
            <hr className="hr-text" data-content="OR" />
            <GoogleLogin
              clientId="25860778518-lt39cmgjc3s1na7pfc564gdn2bilqljq.apps.googleusercontent.com"
              buttonText="Sign In With Google"
              className={classes.google}
              onSuccess={responseGoogle}
              autoLoad={false}
              onFailure={handelError}
              cookiePolicy={"single_host_origin"}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  loading: state.loading.loading,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  signInUser,
};

// Prototypes
Login.propTypes = {
  loading: PropTypes.bool.isRequired,
  signInUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
