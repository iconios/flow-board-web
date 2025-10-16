"use client";

import { UpdateCommentServerAction } from "@/actions/comments.server.action";
import { CommentType, UpdateCommentInputType } from "@/lib/comment.types";
import NotificationBar from "@/lib/notificationBar";
import { NotificationBarType } from "@/lib/types";
import { useUserContext } from "@/lib/user.context";
import { Delete, Edit } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import DeleteCommentDialog from "./deleteCommentDialog";
import EditCommentDialog from "./editCommentDialog";

const CommentContent = ({ comment }: { comment: CommentType }) => {
  const { user } = useUserContext();
  const firstAlphabet = user?.firstname[0];
  const queryClient = useQueryClient();
  const [notification, setNotification] = useState<NotificationBarType | null>(
    null,
  );
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const editMutation = useMutation({
    mutationKey: ["comments", `comments:${comment.taskId}`],
    mutationFn: (values: UpdateCommentInputType) =>
      UpdateCommentServerAction(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", `comments:${comment.taskId}`],
      });
      setNotification({
        message: "Comment edited successfully",
        messageType: "success",
      });
    },
    onError: () => {
      setNotification({
        message: `${editMutation.error?.message}`,
        messageType: "error",
      });
    },
  });

  return (
    <>
      {notification && (
        <NotificationBar
          message={notification.message}
          messageType={notification.messageType}
        />
      )}
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <Box
            sx={{
              ml: 1,
            }}
          >
            <IconButton onClick={() => setOpenEditDialog(true)}>
              <Edit />
            </IconButton>
            <EditCommentDialog
              dialogOpen={openEditDialog}
              content={comment.content}
              taskId={comment.taskId}
              commentId={comment.id}
              onClose={() => setOpenEditDialog(false)}
            />
            <IconButton onClick={() => setOpenDeleteDialog(true)}>
              <Delete />
            </IconButton>
            <DeleteCommentDialog
              dialogOpen={openDeleteDialog}
              taskId={comment.taskId}
              commentId={comment.id}
              onClose={() => setOpenDeleteDialog(false)}
            />
          </Box>
        }
      >
        <ListItemAvatar>
          <Avatar>{firstAlphabet}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={comment.content}
          secondary={
            <Typography variant="subtitle2">
              {comment.updatedAt ? `Updated at: ${comment.updatedAt}` : ""}
            </Typography>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default CommentContent;
