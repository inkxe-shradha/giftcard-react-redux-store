import React from "react";
import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AuthenticationRoute = ({
  element,
  requiredRole = "user",
  auth: {
    isAuthenticated,
    user: { role = "" },
  },
}) => {
  const location = useLocation();
  return isAuthenticated === true ? (
    requiredRole === role || role === "admin" ? (
      element
    ) : (
      <Navigate
        to="/login"
        state={{
          path: location.pathname,
        }}
      />
    )
  ) : (
    <Navigate
      to="/"
      replace
      state={{
        path: location.pathname,
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AuthenticationRoute);
