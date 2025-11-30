import { DeleteUserServerAction } from "@/actions/users.server.action";
import NotificationBar from "@/lib/notificationBar";
import { NotificationBarType } from "@/lib/types";
import { useUserContext } from "@/lib/user.context";
import { Cancel, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteUserDialog = ({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
}) => {
  // Initialize required variables and constants
  const theme = useTheme();
  const router = useRouter();
  const { LogOut } = useUserContext();
  const [notification, setNotification] = useState<NotificationBarType | null>(
    null,
  );

  // Mutation to handle the deletion
  const mutation = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: async () => await DeleteUserServerAction(),
    onSuccess: (result) => {
      onSuccess(result.message);
      LogOut();
      router.replace("/");
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Error deleting user";
      setNotification({
        message: errorMessage,
        messageType: "error",
      });
    },
  });

  return (
    <Box>
      {notification && (
        <NotificationBar
          message={notification.message}
          messageType={notification.messageType}
        />
      )}
      <Dialog open={open} onClose={onClose}>
        <DialogTitle component="h6" sx={{ textAlign: "center" }}>
          Delete User Account
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ ...theme.typography.body2 }}>
            Deleting your user account would erase all the boards, lists, tasks,
            comments and board members associated with your account. Are you
            sure you want to delete your user account?
          </DialogContentText>
          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Button
              startIcon={<Delete />}
              color="primary"
              variant="contained"
              onClick={async () => {
                await mutation.mutateAsync();
              }}
            >
              Delete
            </Button>
            <Button
              endIcon={<Cancel />}
              sx={{ color: "#FF6D00", border: "1px #FF6D00 solid" }}
              onClick={onClose}
            >
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DeleteUserDialog;
