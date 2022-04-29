import { Backdrop } from "@mui/material";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Spinner = ({ isLoading }) => {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  );
};

export default Spinner;
