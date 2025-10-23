import { DeleteTaskServerAction } from "@/actions/tasks.server.action";
import NotificationBar from "@/lib/notificationBar";
import { DeleteTaskFormInputType } from "@/lib/task.types";
import { NotificationBarType } from "@/lib/types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
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
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. Are you sure you want to delete the
            task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} disabled={mutation.isPending}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            autoFocus
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteTaskDialog;
