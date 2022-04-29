import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <footer className="mt-3">
      <Typography variant="body2" color="textSecondary" align="center">
        {"Made with ❤️ by Shrdha. Copyright © "}
        <Link color="inherit" to="/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </footer>
  );
};

export default Footer;
