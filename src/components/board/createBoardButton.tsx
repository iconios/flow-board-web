"use client";

import { CreateBoardServerAction } from "@/actions/boards.server.action";
import NotificationBar from "@/lib/notificationBar";
import {
  CreateBoardUIType,
  CreateBoardUISchema,
  NotificationBarType,
} from "@/lib/types";
import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormikHelpers, useFormik } from "formik";
import { useEffect, useState } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";

const CreateBoardButton = () => {
  // Initialize the variables and constants
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const [notification, setNotification] = useState<NotificationBarType | null>(
    null,
  );

  const handleDialogClose = () => {
    setOpen(false);
    setNotification(null);
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const initialValues = {
    bg_color: "#000000",
    title: "",
  };

  const mutation = useMutation({
    mutationKey: ["board"],
    mutationFn: (values: { title: string; bg_color: string }) =>
      CreateBoardServerAction(values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["board"] }),
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      setNotification({
        message: "Board created successfully",
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

  const handleCreateBoardSubmit = async (
    values: CreateBoardUIType,
    { setSubmitting, resetForm }: FormikHelpers<CreateBoardUIType>,
  ) => {
    console.log(values);
    setNotification(null);
    try {
      await mutation.mutateAsync(values);
      resetForm();
      handleDialogClose();
    } catch (error) {
      console.error("Error creating board", error);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(CreateBoardUISchema),
    onSubmit: handleCreateBoardSubmit,
  });

  return (
    <Paper
      sx={{
        width: { xs: "100%", sm: "33.33%", md: "25%" },
        mb: 2,
        mt: 2,
      }}
    >
      {mutation.isError && (
        <NotificationBar message={mutation.error.message} messageType="error" />
      )}
      {notification && (
        <NotificationBar
          message={notification.message}
          messageType={notification.messageType}
        />
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton onClick={handleDialogOpen}>
          <Add />
          <Typography>Create a Board</Typography>
        </IconButton>
      </Box>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        sx={{
          borderRadius: 5,
          px: 1,
          py: 2,
        }}
      >
        <DialogTitle>Create a Board</DialogTitle>
        <DialogContent
          sx={{
            width: {
              xs: "100%",
              sm: "400px",
              md: "500px",
            },
          }}
        >
          <DialogContentText paddingBottom={2}>
            Enter board details
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
    </Paper>
  );
};

export default CreateBoardButton;
