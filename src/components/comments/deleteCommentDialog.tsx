"use client";

import { DeleteCommentServerAction } from "@/actions/comments.server.action";
import {
  DeleteCommentDialogInputType,
  DeleteCommentInputType,
} from "@/lib/comment.types";
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
import { useState } from "react";

const DeleteCommentDialog = ({
  dialogOpen,
  taskId,
  commentId,
  onClose,
}: DeleteCommentDialogInputType) => {
  const [notification, setNotification] = useState<NotificationBarType | null>(
    null,
  );
  const queryClient = useQueryClient();

  const handleDialogClose = () => {
    onClose();
    setNotification(null);
  };

  const mutation = useMutation({
    mutationKey: ["comments", `comments:${taskId}`],
    mutationFn: (values: DeleteCommentInputType) =>
      DeleteCommentServerAction(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", `comments:${taskId}`],
      });
      setNotification({
        message: "Comment deleted successfully",
        messageType: "success",
      });
    },
    onError: () => {
      setNotification({
        message: `${mutation.error?.message}`,
        messageType: "error",
      });
    },
  });

  const handleDelete = async () => {
    try {
      console.log("Task Id:", taskId);
      await mutation.mutateAsync({ commentId, taskId });
      setTimeout(() => handleDialogClose(), 2000);
    } catch (error) {
      console.error("Error deleting comment", error);
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
        aria-labelledby="delete-comment-title"
        aria-describedby="delete-comment-desc"
        disableEscapeKeyDown={mutation.isPending}
        slotProps={{
          backdrop: {
            onClick: mutation.isPending
              ? (e: any) => e.stopPropagation()
              : undefined,
          },
        }}
      >
        <DialogTitle>Delete Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the comment?
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

export default DeleteCommentDialog;
