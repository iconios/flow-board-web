import { EditListServerAction } from "@/actions/lists.server.action";
import {
  EditListFormType,
  EditListInitialValuesSchema,
  EditListInitialValuesType,
  EditListInputType,
} from "@/lib/list.types";
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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { FormikHelpers, useFormik } from "formik";
import { useState, useMemo, useEffect } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";

const EditListDialog = ({
  dialogOpen,
  title,
  position,
  status,
  boardId,
  listId,
  onClose,
}: EditListFormType) => {
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
      title,
      position,
      status,
    };
  }, [title, position, status]);

  const {
    mutateAsync,
    isSuccess,
    isPending,
    isError,
    error: serverError,
  } = useMutation({
    mutationFn: (values: EditListInputType) => EditListServerAction(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["list", `list:${boardId}`],
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      handleDialogClose();
      setNotification({
        message: "List edited successfully",
        messageType: "success",
      });
    }

    if (isError) {
      setNotification({
        message: `${serverError?.message}` || "Failed to edit list",
        messageType: "error",
      });
    }
  }, [isSuccess, isError, serverError]);

  const handleEditBoardSubmit = async (
    values: EditListInitialValuesType,
    { setSubmitting, resetForm }: FormikHelpers<EditListInitialValuesType>,
  ) => {
    console.log(values);
    setNotification(null);
    try {
      await mutateAsync({
        ...values,
        boardId,
        listId,
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
    validationSchema: toFormikValidationSchema(EditListInitialValuesSchema),
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
        <DialogTitle>Edit List</DialogTitle>
        <DialogContent>
          <DialogContentText paddingBottom={2}>
            Enter the list fields values
          </DialogContentText>
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

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  type="text"
                  label="Status"
                  id="status"
                  name="status"
                  variant="outlined"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.status && Boolean(formik.errors.status)}
                >
                  <MenuItem value="active">active</MenuItem>
                  <MenuItem value="archive">archive</MenuItem>
                </Select>
              </FormControl>

              <TextField
                type="number"
                label="Position"
                id="position"
                name="position"
                variant="outlined"
                value={formik.values.position}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.position && Boolean(formik.errors.position)
                }
                helperText={formik.touched.position && formik.errors.position}
              />
            </Stack>

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

export default EditListDialog;
