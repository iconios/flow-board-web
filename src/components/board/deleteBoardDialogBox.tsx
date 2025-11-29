import { DeleteBoardServerAction } from "@/actions/boards.server.action";
import NotificationBar from "@/lib/notificationBar";
import { DeleteBoardInputType, NotificationBarType } from "@/lib/types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const DeleteBoardDialogBox = ({
  dialogOpen,
  boardId,
  onClose,
}: DeleteBoardInputType) => {
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
    mutationKey: ["board"],
    mutationFn: (boardId: string) => DeleteBoardServerAction(boardId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["board"] }),
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      setNotification({
        message: "Board deleted successfully",
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
      await mutation.mutateAsync(boardId);
      handleDialogClose();
    } catch (error) {
      console.error("Error deleting board", error);
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
        aria-labelledby="delete-board-title"
        aria-describedby="delete-board-desc"
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
          Delete Board
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ ...theme.typography.body2 }}>
            This action cannot be undone. All the lists and the tasks in the
            board will also be deleted. Are you sure you want to delete the
            board?
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

export default DeleteBoardDialogBox;
