import { DeleteListServerAction } from "@/actions/lists.server.action";
import { DeleteListDialogInputType } from "@/lib/list.types";
import NotificationBar from "@/lib/notificationBar";
import { NotificationBarType } from "@/lib/types";
import { Cancel, Delete } from "@mui/icons-material";
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

const DeleteBListDialog = ({
  dialogOpen,
  listId,
  boardId,
  onClose,
}: DeleteListDialogInputType) => {
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
        <DialogTitle sx={{ textAlign: "center" }} component="h6">
          Delete List
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ ...theme.typography.body2 }}>
            This action cannot be undone. All the tasks in the list will also be
            deleted. Are you sure you want to delete the list?
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
              borderColor: "#FF6D00",
              color: "#FF6D00",
              borderWidth: 1,
              borderStyle: "solid",
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteBListDialog;
