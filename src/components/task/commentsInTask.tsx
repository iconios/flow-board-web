"use client";

import {
  CreateCommentServerAction,
  GetCommentsServerAction,
} from "@/actions/comments.server.action";
import {
  Box,
  Button,
  Container,
  Skeleton,
  Stack,
  TextField,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CommentContent from "./commentContent";
import { FormikHelpers, useFormik } from "formik";
import {
  CommentContentSchema,
  CommentContentType,
  CreateCommentInputType,
} from "@/lib/comment.types";
import { useState } from "react";
import { NotificationBarType } from "@/lib/types";
import { toFormikValidationSchema } from "zod-formik-adapter";
import NotificationBar from "@/lib/notificationBar";
import { Cancel, Create } from "@mui/icons-material";

const CommentsInTask = ({ taskId }: { taskId: string }) => {
  const [notification, setNotification] = useState<NotificationBarType | null>(
    null,
  );
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["comments", `comments:${taskId}`],
    queryFn: () => GetCommentsServerAction(taskId),
    enabled: !!taskId,
  });

  const mutation = useMutation({
    mutationKey: ["comment"],
    mutationFn: (values: CreateCommentInputType) =>
      CreateCommentServerAction(values),
    onSuccess: () => {
      setNotification(null);
      queryClient.invalidateQueries({
        queryKey: ["comments", `comments:${taskId}`],
      });
      setNotification({
        message: "Comment created successfully",
        messageType: "success",
      });
      formik.resetForm();
    },
    onError: (error) => {
      setNotification({
        message: error instanceof Error ? error.message : String(error),
        messageType: "error",
      });
    },
  });

  const initialValues = {
    content: "",
  };

  const handleFormSubmit = async (
    values: CommentContentType,
    { setSubmitting }: FormikHelpers<CommentContentType>,
  ) => {
    console.log("Comment content", values);
    try {
      await mutation.mutateAsync({
        ...values,
        taskId,
      });
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(CommentContentSchema),
    onSubmit: handleFormSubmit,
  });

  if (query.isPending) {
    return (
      <Container>
        <Skeleton variant="text" sx={{ fontSize: 32 }} />
        <Skeleton variant="text" sx={{ fontSize: 16 }} />
      </Container>
    );
  }

  const comments = query.data;

  return (
    <Box>
      {notification && (
        <NotificationBar
          message={notification.message}
          messageType={notification.messageType}
        />
      )}
        <Box>
          <Stack direction="column" spacing={1}>
            <TextField
              type="text"
              label="Comments"
              id="content"
              name="content"
              variant="outlined"
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.content && Boolean(formik.errors.content)}
              helperText={formik.touched.content && formik.errors.content}
            />
            <Box>
              <Button
                type="button"
                startIcon={<Create />}
                variant="contained"
                disabled={formik.isSubmitting || !formik.values.content.trim()}
                onClick={() => formik.handleSubmit()}
                sx={{ mr: 2 }}
              >
                Create
              </Button>
              <Button
                type="reset"
                onClick={() => formik.resetForm()}
                startIcon={<Cancel />}
                variant="outlined"
                disabled={formik.isSubmitting || !formik.values.content.trim()}
              >
                Cancel
              </Button>
            </Box>
          </Stack>
        </Box>
      {comments?.length === 0 ? (
        <p>No comments yet - create one!</p>
      ) : (
        comments?.map((comment) => (
          <CommentContent comment={comment} key={comment.id} />
        ))
      )}
    </Box>
  );
};

export default CommentsInTask;
