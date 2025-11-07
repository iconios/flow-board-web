import { UpdateBoardServerAction } from "@/actions/boards.server.action";
import NotificationBar from "@/lib/notificationBar";
import {
  EditBoardInputType,
  EditBoardInitialValuesType,
  EditBoardInitialValuesSchema,
  NotificationBarType,
} from "@/lib/types";
import { useUserContext } from "@/lib/user.context";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  Stack,
  TextField,
  DialogActions,
  Button,
  DialogTitle,
} from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import { useMemo, useState } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const EditBoardDialogBox = ({
  dialogOpen,
  title,
  bg_color,
  boardId,
  onClose,
}: EditBoardInputType) => {
  // Initialize the variables and constants
  const queryClient = useQueryClient();
  const { user } = useUserContext();
  const [notification, setNotification] = useState<NotificationBarType | null>(
    null,
  );

  const handleDialogClose = () => {
    onClose();
    setNotification(null);
  };

  const initialValues = useMemo(() => {
    return {
      bg_color: bg_color,
      title: title,
    };
  }, [bg_color, title]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: {
      boardId: string;
      values: { title?: string; bg_color?: string };
    }) => UpdateBoardServerAction(payload.boardId, payload.values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["board", user.email],
      });
      setNotification({
        message: "Board edited successfully",
        messageType: "success",
      });
    },
    onError: (error) => {
      setNotification({
        message: error.message || "Failed to edit board",
        messageType: "error",
      });
    },
  });

  const handleEditBoardSubmit = async (
    values: EditBoardInitialValuesType,
    { setSubmitting, resetForm }: FormikHelpers<EditBoardInitialValuesType>,
  ) => {
    console.log(values);
    setNotification(null);
    try {
      await mutateAsync({ boardId, values });
      handleDialogClose();
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
    validationSchema: toFormikValidationSchema(EditBoardInitialValuesSchema),
    onSubmit: handleEditBoardSubmit,
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
        <DialogTitle>Edit Board</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the board fields values</DialogContentText>
          <form onSubmit={formik.handleSubmit}>
            <Stack direction="column" spacing={2}>
              <TextField
                type="text"
                label="Title"
                required
                id="title"
                name="title"
                variant="outlined"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />

              <TextField
                type="color"
                label="Background Color"
                id="bg_color"
                name="bg_color"
                variant="outlined"
                value={formik.values.bg_color}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.bg_color && Boolean(formik.errors.bg_color)
                }
                helperText={formik.touched.bg_color && formik.errors.bg_color}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <DialogActions>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{ mt: 2 }}
                  disabled={formik.isSubmitting || isPending || !formik.dirty}
                >
                  {formik.isSubmitting ? "Updating..." : "Edit"}
                </Button>
                <Button
                  color="secondary"
                  variant="outlined"
                  sx={{ mt: 2 }}
                  onClick={handleDialogClose}
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

export default EditBoardDialogBox;
