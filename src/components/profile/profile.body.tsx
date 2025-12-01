"use client";

import NotificationBar from "@/lib/notificationBar";
import { NotificationBarType } from "@/lib/types";
import { useUserContext } from "@/lib/user.context";
import { Box, Button, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DeleteUserDialog from "../user/deleteUserDialog";

const ProfileBody = () => {
  // Initialize required variables and constants
  const theme = useTheme();
  const router = useRouter();
  const [notification, setNotification] = useState<NotificationBarType | null>(
    null,
  );
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { LogOut } = useUserContext();

  // Handle logout button and successful account deletion
  const handleLogout = (message?: string) => {
    setNotification({
      message: message ?? "Bye!",
      messageType: "success",
    });
    setOpenDeleteDialog(false);
    LogOut();
    router.replace("/welcome");
  };

  return (
    <Box
      sx={{
        mt: 4,
        justifyContent: "center",
        flexDirection: "column",
        display: "flex",
      }}
    >
      {notification && (
        <NotificationBar
          message={notification.message}
          messageType={notification.messageType}
        />
      )}
      <Button
        onClick={() => { router.push("/contact-us"); }}
        sx={{
          border: "1px gray solid",
          padding: 1,
          ...theme.typography.body2,
        }}
      >
        Contact Us
      </Button>
      <Button
        onClick={() => { router.push("/privacy"); }}
        sx={{
          borderBottom: "1px gray solid",
          borderLeft: "1px gray solid",
          borderRight: "1px gray solid",
          padding: 1,
          ...theme.typography.body2,
        }}
      >
        Privacy Policy
      </Button>
      <Button
        onClick={() => { router.push("/terms"); }}
        sx={{
          borderBottom: "1px gray solid",
          borderLeft: "1px gray solid",
          borderRight: "1px gray solid",
          padding: 1,
          ...theme.typography.body2,
        }}
      >
        Terms of Service
      </Button>
      <Button
        onClick={() => { setOpenDeleteDialog(true); }}
        sx={{
          borderBottom: "1px gray solid",
          borderLeft: "1px gray solid",
          borderRight: "1px gray solid",
          padding: 1,
          ...theme.typography.body2,
        }}
      >
        Delete Account
      </Button>
      <Button
        variant="contained"
        sx={{
          width: { xs: "100%", sm: "66%", md: "33%" },
          mt: 2,
          alignSelf: "center",
          py: 1,
        }}
        onClick={() => { handleLogout(); }}
      >
        Log out
      </Button>
      {openDeleteDialog && (
        <DeleteUserDialog
          open={openDeleteDialog}
          onClose={() => { setOpenDeleteDialog(false); }}
          onSuccess={handleLogout}
        />
      )}
    </Box>
  );
};

export default ProfileBody;
