"use client";

import { RemoveBoardMemberServerAction } from "@/actions/board.member.server.action";
import {
  RemoveBoardMemberInputType,
  RemoveMemberDialogInputType,
} from "@/lib/member.types";
import NotificationBar from "@/lib/notificationBar";
import { NotificationBarType } from "@/lib/types";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const RemoveMemberDialog = ({
  memberId,
  boardId,
  memberName,
  dialogOpen,
  onClose,
}: RemoveMemberDialogInputType) => {
  const [notification, setNotification] = useState<NotificationBarType | null>(
    null,
  );
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["board-member", `board-member:${boardId}`],
    mutationFn: (values: RemoveBoardMemberInputType) =>
      RemoveBoardMemberServerAction(values),
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: ["board-member", `board-member:${boardId}`],
      });
      setNotification({
        message: `${result}`,
        messageType: "success",
      });
      handleCloseDialog();
    },
    onError: (error) => {
      setNotification({
        message: `${error.message}`,
        messageType: "error",
      });
    },
  });

  const handleRemoval = async (values: RemoveBoardMemberInputType) => {
    console.log(values);

    try {
      await mutation.mutateAsync(values);
    } catch (error) {
      console.error("Network error", error);
    }
  };

  const handleCloseDialog = () => {
    onClose();
  };

  return (
    <Box>
      {notification && (
        <NotificationBar
          message={notification.message}
          messageType={notification.messageType}
        />
      )}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Board Membership Removal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>
              Are you sure you want to remove {memberName} from this board?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={mutation.isPending} onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => handleRemoval({ memberId, boardId })}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Removing..." : "Remove"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RemoveMemberDialog;
