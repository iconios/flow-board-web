import { DeleteListServerAction } from "@/actions/lists.server.action";
import { DeleteListDialogInputType } from "@/lib/list.types";
import NotificationBar from "@/lib/notificationBar";
import { NotificationBarType } from "@/lib/types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const DeleteBListDialog = ({
  dialogOpen,
  listId,
  boardId,
  onClose,
}: DeleteListDialogInputType) => {
  const [notification, setNotification] = useState<NotificationBarType | null>(
    null,
  );
  const queryClient = useQueryClient();

  const handleDialogClose = () => {
    onClose();
    setNotification(null);
  };

  const mutation = useMutation({
    mutationKey: [`list:${boardId}`],
    mutationFn: (values: { listId: string; boardId: string }) =>
      DeleteListServerAction(values),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["list", `list:${boardId}`] }),
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      setNotification({
        message: "List deleted successfully",
        messageType: "success",
      });
    }

    if (mutation.isError) {
      setNotification({
        message: `${mutation.error}`,
        messageType: "error",
      });
    }
  }, [mutation.isSuccess, mutation.isError, mutation.error]);

  const handleDelete = async () => {
    try {
      await mutation.mutateAsync({ boardId, listId });
      setTimeout(() => handleDialogClose(), 2000);
    } catch (error) {
      console.error("Error deleting list", error);
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
        aria-labelledby="delete-list-title"
        aria-describedby="delete-list-desc"
        disableEscapeKeyDown={mutation.isPending}
        slotProps={{
          backdrop: {
            onClick: mutation.isPending
              ? (e: any) => e.stopPropagation()
              : undefined,
          },
        }}
      >
        <DialogTitle>Delete List</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. All the tasks in the list will also be
            deleted. Are you sure you want to delete the list?
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

export default DeleteBListDialog;
