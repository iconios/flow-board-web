"use client";

import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FormikHelpers, useFormik } from "formik";
import { NotificationBarType } from "@/lib/types";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import NotificationBar from "@/lib/notificationBar";
import {
  CreateListComponentInputType,
  CreateListFormSchema,
  CreateListFormType,
  CreateListInputType,
} from "@/lib/list.types";
import { CreateListServerAction } from "@/actions/lists.server.action";

const CreateListDialog = ({
  boardId,
  open,
  onClose,
}: CreateListComponentInputType) => {
  const [notification, setNotification] = useState<NotificationBarType | null>(
    null,
  );
  const queryClient = useQueryClient();

  const initialValues = {
    title: "",
    position: 0,
    status: "active" as const,
  };

  const handleDialogClose = () => {
    onClose();
  };

  //  Mutation
  const mutation = useMutation({
    mutationKey: ["list"],
    mutationFn: (newList: CreateListInputType) =>
      CreateListServerAction(newList),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["list"] }),
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      setNotification({
        message: "List created successfully",
        messageType: "success",
      });
    }

    if (mutation.isError) {
      setNotification({
        message: `${mutation.error?.message}` || "Failed to create list",
        messageType: "error",
      });
    }
  }, [mutation.isSuccess, mutation.isError, mutation.error]);

  // Form submission handler
  const handleCreateListSubmit = async (
    values: CreateListFormType,
    { setSubmitting, resetForm }: FormikHelpers<CreateListFormType>,
  ) => {
    console.log(values);
    const newListInput = {
      boardId,
      ...values,
    };
    try {
      await mutation.mutateAsync(newListInput);
      resetForm();
      handleDialogClose();
    } catch (error) {
      console.error("Mutation error", error);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik<CreateListFormType>({
    initialValues,
    validationSchema: toFormikValidationSchema(CreateListFormSchema),
    onSubmit: handleCreateListSubmit,
  });

  return (
    <Box>
      {notification && (
        <NotificationBar
          message={notification.message}
          messageType={notification.messageType}
        />
      )}
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="create-list-dialog-title"
        aria-describedby="create-list-dialog-description"
      >
        <DialogContent
          sx={{
            width: { xs: "100%", sm: "600px" },
          }}
        >
          <DialogTitle id="create-list-dialog-title">Create List</DialogTitle>
          <DialogContentText
            id="create-list-dialog-description"
            paddingBottom={2}
          >
            Enter the details of the List
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
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Creating..." : "Create"}
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
    </Box>
  );
};

export default CreateListDialog;
