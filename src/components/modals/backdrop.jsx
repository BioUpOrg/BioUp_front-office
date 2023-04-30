import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const LoaderBackdrop = ({ open, loading }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      {loading ? (
        <CircularProgress color="inherit" />
      ) : (
        <h2>Backdrop content</h2>
      )}
    </Backdrop>
  );
};

export default LoaderBackdrop;
