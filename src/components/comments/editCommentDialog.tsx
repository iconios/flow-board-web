import { UpdateCommentServerAction } from "@/actions/comments.server.action";
import {
  CommentContentSchema,
  CommentContentType,
  EditCommentFormType,
  UpdateCommentInputType,
} from "@/lib/comment.types";
import NotificationBar from "@/lib/notificationBar";
import { NotificationBarType } from "@/lib/types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Stack,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { FormikHelpers, useFormik } from "formik";
import { useState, useMemo } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";

const EditCommentDialog = ({
  dialogOpen,
  content,
  taskId,
  commentId,
  onClose,
}: EditCommentFormType) => {
  // Initialize the variables and constants
  const queryClient = useQueryClient();
  const [notification, setNotification] = useState<NotificationBarType | null>(
    null,
  );

  const handleDialogClose = () => {
    onClose();
    setNotification(null);
  };

  const initialValues = useMemo(() => {
    return {
      content,
    };
  }, [content]);

  const {
    mutateAsync,
    isPending,
    error: serverError,
  } = useMutation({
    mutationFn: (values: UpdateCommentInputType) =>
      UpdateCommentServerAction(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", `comments:${taskId}`],
      });
      handleDialogClose();
    },
    onError: () => {
      setNotification({
        message: `${serverError?.message}` || "Failed to edit comment",
        messageType: "error",
      });
    },
  });

  const handleEditCommentSubmit = async (
    values: CommentContentType,
    { setSubmitting, resetForm }: FormikHelpers<CommentContentType>,
  ) => {
    console.log(values);
    setNotification(null);
    try {
      await mutateAsync({
        ...values,
        taskId,
        commentId,
      });
      resetForm({ values });
    } catch (error: any) {
      console.error("Error editing board", error);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(CommentContentSchema),
    onSubmit: handleEditCommentSubmit,
  });

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
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        sx={{
          borderRadius: 5,
          px: 1,
          py: 1,
        }}
      >
        <DialogTitle>Edit Comment</DialogTitle>
        <DialogContent>
          <DialogContentText paddingBottom={2}>
            Enter the comment content
          </DialogContentText>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              type="text"
              label="Comment"
              required
              id="content"
              name="content"
              variant="outlined"
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.content && Boolean(formik.errors.content)}
              helperText={formik.touched.content && formik.errors.content}
            />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <DialogActions>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{ mt: 2 }}
                  disabled={isPending}
                >
                  {isPending ? "Editing..." : "Edit"}
                </Button>
                <Button
                  color="secondary"
                  variant="outlined"
                  sx={{ mt: 2 }}
                  onClick={handleDialogClose}
                  disabled={isPending}
                >
                  Cancel
                </Button>
              </DialogActions>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditCommentDialog;
