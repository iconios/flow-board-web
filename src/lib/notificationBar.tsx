"use client";

import { SnackbarCloseReason, Snackbar } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { NotificationBarType } from "./types";
import theme from "./theme";

const NotificationBar = ({ message, messageType }: NotificationBarType) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    setOpenSnackbar(Boolean(message));
  }, [message]);

  const handleSnackbarClose = (
    event: SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={5000}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      onClose={handleSnackbarClose}
      message={message}
      sx={{
        "& .MuiSnackbarContent-root": {
          backgroundColor: messageType === "success" ? "#4caf50" : "#f44336",
          color: "white",
          // Override transition properties
          transition: "all 225ms cubic-bezier(0.4, 0, 0.2, 1) !important",
        },
        "& .MuiSnackbarContent-message": {
          color: "white",
          padding: "8px 0",
          ...theme.typography.caption,
        },
      }}
    />
  );
};

export default NotificationBar;
