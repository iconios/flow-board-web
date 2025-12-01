/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { RemoveBoardMemberServerAction } from "@/actions/board.member.server.action";
import {
  RemoveBoardMemberInputType,
  RemoveMemberDialogInputType,
} from "@/lib/member.types";
import NotificationBar from "@/lib/notificationBar";
import { NotificationBarType } from "@/lib/types";
import { Cancel, Remove } from "@mui/icons-material";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const RemoveMemberDialog = ({
  memberId,
  boardId,
  memberName,
  dialogOpen,
  onClose,
}: RemoveMemberDialogInputType) => {
  const theme = useTheme();
  const [notification, setNotification] = useState<NotificationBarType | null>(
    null,
  );
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["board-member", `board-member:${boardId}`],
    mutationFn: async (values: RemoveBoardMemberInputType) =>
      await RemoveBoardMemberServerAction(values),
    onSuccess: async (result) => {
      await queryClient.invalidateQueries({
        queryKey: ["board-member", `board-member:${boardId}`],
      });
      setNotification({
        message: result,
        messageType: "success",
      });
      handleCloseDialog();
    },
    onError: (error) => {
      setNotification({
        message: error.message,
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
        <DialogTitle component="h6" sx={{ textAlign: "center" }}>
          Board Membership Removal
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ fontWeight: 300, ...theme.typography.body2 }}
          >
            Are you sure you want to remove {memberName} from this board?
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
            variant="contained"
            color="primary"
            onClick={() => handleRemoval({ memberId, boardId })}
            disabled={mutation.isPending}
            startIcon={<Remove />}
          >
            {mutation.isPending ? "Removing..." : "Remove"}
          </Button>
          <Button
            disabled={mutation.isPending}
            onClick={handleCloseDialog}
            endIcon={<Cancel />}
            sx={{
              color: "#FF6D00",
              borderColor: "#FF6D00",
              borderWidth: 1,
              borderStyle: "solid",
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RemoveMemberDialog;
