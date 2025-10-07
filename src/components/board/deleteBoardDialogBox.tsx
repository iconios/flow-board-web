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
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

const DeleteBoardDialogBox = ({
  dialogOpen,
  boardId,
  onClose,
}: DeleteBoardInputType) => {
  const [notification, setNotification] = useState<NotificationBarType | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const timeRef = useRef<number | null>(null);
  const queryClient = useQueryClient();

  const handleDialogClose = () => {
    onClose();
    setNotification(null);
  };

  useEffect(() => {
    return () => {
      if (timeRef.current) clearTimeout(timeRef.current);
    };
  }, []);

  const mutation = useMutation({
    mutationKey: ["board"],
    mutationFn: (boardId: string) => DeleteBoardServerAction(boardId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["board"] }),
  });

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      mutation.mutateAsync(boardId);
      setNotification({
        message: "Board successfully deleted",
        messageType: "success",
      });

      timeRef.current = window.setTimeout(() => {
        handleDialogClose();
      }, 1500);
    } catch (error) {
      console.error("Error deleting board", error);

      setNotification({
        message: "Network error. Please try again",
        messageType: "error",
      });
    } finally {
      setIsDeleting(false);
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
        onClose={isDeleting ? undefined : handleDialogClose}
        aria-labelledby="delete-board-title"
        aria-describedby="delete-board-desc"
        disableEscapeKeyDown={isDeleting}
        slotProps={{
          backdrop: {
            onClick: isDeleting ? (e: any) => e.stopPropagation() : undefined,
          },
        }}
      >
        <DialogTitle>Delete Board</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. Are you sure you want to delete the
            board?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            autoFocus
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteBoardDialogBox;
