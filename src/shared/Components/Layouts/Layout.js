import React from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import { makeStyles } from "@mui/styles";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logOutUser } from "../../../store/actions/authAction";
import { useGoogleLogout } from "react-google-login";
import Spinner from "../Spinner/Spinner";
const useStyles = makeStyles((theme) => ({
  page: {
    background: theme.palette.background.default,
    width: "100%",
    flexGrow: 1,
    minHeight: "100vh",
    paddingBlock: theme.spacing(1),
  },
  toolbar: theme.mixins.toolbar,
}));
const Layout = ({ children, user, isAuthenticated, logout, loading }) => {
  const { signOut, loaded } = useGoogleLogout({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    onLogoutSuccess,
  });

  function onLogoutSuccess() {
    console.log("Logged out successfully");
  }
  const { pathname } = useLocation();
  const classes = useStyles();
  const handelLoggingOut = () => {
    signOut();
    logout();
    toast.success("Logged out successfully");
  };
  return (
    <>
      {pathname !== "/login" && (
        <Header
          user={user}
          authStatus={isAuthenticated}
          logOut={handelLoggingOut}
        />
      )}
      {/* Main content */}
      <div className={classes.page}>
        {pathname !== "/login" && <div className={classes.toolbar}></div>}
        {children}
      </div>
      <Footer />
      <ToastContainer
        autoClose={3000}
        hideProgressBar
        position="top-right"
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnHover
        theme="dark"
      />
      <Spinner isLoading={loading} />
    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.loading.loading,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  logout: logOutUser,
};
// Prototypes
Layout.propTypes = {
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
