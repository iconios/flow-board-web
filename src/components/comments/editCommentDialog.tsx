import { UpdateCommentServerAction } from "@/actions/comments.server.action";
import {
  CommentContentSchema,
  CommentContentType,
  EditCommentFormType,
  UpdateCommentInputType,
} from "@/lib/comment.types";
import NotificationBar from "@/lib/notificationBar";
import { NotificationBarType } from "@/lib/types";
import { Cancel, Edit } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Stack,
  TextField,
  DialogActions,
  Button,
  useTheme,
  Typography,
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
  const theme = useTheme();
  const [notification, setNotification] = useState<NotificationBarType | null>(
    null,
  );
  const bodyStyle = { ...theme.typography.body2 };
  const handleDialogClose = () => {
    onClose();
    setNotification(null);
  };

  const initialValues = useMemo(() => {
    return {
      content,
    };
  }, [content]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values: UpdateCommentInputType) =>
      UpdateCommentServerAction(values),
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", `comments:${taskId}`],
      });
      setNotification({
        message: `${result.message}`,
        messageType: "success",
      });
      handleDialogClose();
    },
    onError: (error) => {
      setNotification({
        message: `${error.message}` || "Failed to edit comment",
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
        <DialogTitle component="h6">Edit Comment</DialogTitle>
        <DialogContent>
          <DialogContentText
            paddingBottom={2}
            sx={{ ...theme.typography.body2, textAlign: "center" }}
          >
            Edit the comment content
          </DialogContentText>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              type="text"
              label="Comment"
              required
              id="content"
              name="content"
              variant="outlined"
              size="small"
              slotProps={{
                inputLabel: {
                  sx: bodyStyle,
                },
                input: {
                  sx: bodyStyle,
                },
              }}
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.content && Boolean(formik.errors.content)}
              helperText={formik.touched.content && formik.errors.content}
              sx={{
                width: "100%",
              }}
            />

            <DialogActions
              sx={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{ mt: 2 }}
                disabled={isPending}
                startIcon={<Edit />}
              >
                {isPending ? "Editing..." : "Edit"}
              </Button>
              <Button
                variant="outlined"
                sx={{
                  mt: 2,
                  color: "#FF6D00",
                  borderColor: "#FF6D00",
                  borderWidth: 1,
                  borderStyle: "solid",
                }}
                onClick={handleDialogClose}
                disabled={isPending}
                endIcon={<Cancel />}
              >
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditCommentDialog;
