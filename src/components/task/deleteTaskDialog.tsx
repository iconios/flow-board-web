import { DeleteTaskServerAction } from "@/actions/tasks.server.action";
import NotificationBar from "@/lib/notificationBar";
import { DeleteTaskFormInputType } from "@/lib/task.types";
import { NotificationBarType } from "@/lib/types";
import { Cancel, Delete } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";

const DeleteTaskDialog = ({
  dialogOpen,
  listId,
  taskId,
  boardId,
  onClose,
}: DeleteTaskFormInputType) => {
  const theme = useTheme();
  const [notification, setNotification] = useState<NotificationBarType | null>(
    null,
  );
  const queryClient = useQueryClient();

  const handleDialogClose = () => {
    onClose();
    setNotification(null);
  };

  const mutation = useMutation({
    mutationKey: ["tasks", `tasks:${listId}`],
    mutationFn: (values: { listId: string; taskId: string }) =>
      DeleteTaskServerAction(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list", `list:${boardId}`] });
      setNotification({
        message: "Task deleted successfully",
        messageType: "success",
      });
      handleDialogClose();
    },
    onError: () => {
      setNotification({
        message: `${mutation.error}`,
        messageType: "error",
      });
    },
  });

  const handleDelete = async () => {
    try {
      await mutation.mutateAsync({ taskId, listId });
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };
  return (
    <>
      {notification && (
        <NotificationBar
          message={notification.message}
          messageType={notification.messageType}
        />
      )}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="delete-task-title"
        aria-describedby="delete-task-desc"
        disableEscapeKeyDown={mutation.isPending}
        slotProps={{
          backdrop: {
            onClick: mutation.isPending
              ? (e: any) => e.stopPropagation()
              : undefined,
          },
        }}
      >
        <DialogTitle component="h6" sx={{ textAlign: "center" }}>
          Delete Task
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ ...theme.typography.body2 }}>
            This action cannot be undone. Are you sure you want to delete the
            task?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "space-between",
            flexDirection: "row",
            px: 3,
            mb: 2,
          }}
        >
          <Button
            onClick={handleDelete}
            sx={{ backgroundColor: theme.palette.primary.main }}
            variant="contained"
            autoFocus
            disabled={mutation.isPending}
            startIcon={<Delete />}
          >
            {mutation.isPending ? "Deleting..." : "Delete"}
          </Button>
          <Button
            onClick={handleDialogClose}
            disabled={mutation.isPending}
            endIcon={<Cancel />}
            sx={{
              borderWidth: 1,
              borderColor: "#FF6D00",
              borderStyle: "solid",
              color: "#FF6D00",
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteTaskDialog;
