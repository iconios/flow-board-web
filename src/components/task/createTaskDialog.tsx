"use client";

import { Add, Cancel } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { FormikHelpers, useFormik } from "formik";
import { NotificationBarType } from "@/lib/types";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {
  datetimeLocalToIso,
  isoToDatetimeLocal,
} from "@/lib/dateTimeConverter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTasksServerAction } from "@/actions/tasks.server.action";
import NotificationBar from "@/lib/notificationBar";
import {
  CreateTaskInputType,
  CreateTaskFormType,
  CreateTaskFormSchema,
} from "@/lib/task.types";

const CreateTaskDialog = ({
  listId,
  boardId,
}: {
  listId: string;
  boardId: string;
}) => {
  const theme = useTheme();
  const bodyStyle = { ...theme.typography.body2 };
  const [notification, setNotification] = useState<NotificationBarType | null>(
    null,
  );
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleDialogOpen = () => {
    setOpen(true);
    setNotification(null);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const initialValues = {
    title: "",
    description: "",
    dueDate: new Date().toISOString(),
    priority: "low" as const,
    position: 0,
  };

  //  Mutation
  const mutation = useMutation({
    mutationKey: [`tasks:${listId}`, "tasks"],
    mutationFn: (newTask: CreateTaskInputType) =>
      CreateTasksServerAction(newTask),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["list", `list:${boardId}`],
      });
      setNotification({
        message: "Task created successfully",
        messageType: "success",
      });
      formik.resetForm();
      handleDialogClose();
    },
    onError: () => {
      setNotification({
        message: `${mutation.error?.message}` || "Failed to create task",
        messageType: "error",
      });
    },
  });

  // Form submission handler
  const handleCreateTaskSubmit = async (
    values: CreateTaskFormType,
    { setSubmitting }: FormikHelpers<CreateTaskFormType>,
  ) => {
    console.log(values);
    const newTaskInput = {
      listId,
      boardId,
      ...values,
    };
    try {
      await mutation.mutateAsync(newTaskInput);
    } catch (error) {
      console.error("Mutation error", error);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik<CreateTaskFormType>({
    initialValues,
    validationSchema: toFormikValidationSchema(CreateTaskFormSchema),
    onSubmit: handleCreateTaskSubmit,
  });

  return (
    <Box>
      {notification && (
        <NotificationBar
          message={notification.message}
          messageType={notification.messageType}
        />
      )}

      {/* Container for the "Add new task" button */}
      <Box
        bgcolor="#E5E4E2"
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Fab
          sx={{
            p: 2,
          }}
          variant="extended"
          onClick={handleDialogOpen}
        >
          <Add sx={{ mr: 1 }} />
          New task
        </Fab>
      </Box>

      {/* Dialog box that opens when "Add new task" button is clicked */}
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="create-task-dialog-title"
        aria-describedby="create-task-dialog-description"
      >
        <DialogContent
          sx={{
            width: { xs: "100%", sm: "600px" },
          }}
        >
          <DialogTitle
            id="create-task-dialog-title"
            component="h6"
            sx={{ textAlign: "center" }}
          >
            Create Task
          </DialogTitle>
          <DialogContentText
            id="create-task-dialog-description"
            paddingBottom={2}
            sx={{ ...theme.typography.body2 }}
          >
            Enter the details of the task
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
                size="small"
                slotProps={{
                  inputLabel: {
                    sx: bodyStyle,
                  },
                  input: {
                    sx: bodyStyle,
                  },
                }}
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />

              <TextField
                type="text"
                label="Description"
                id="description"
                name="description"
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
                multiline
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />

              <TextField
                type="datetime-local"
                label="Due Date"
                id="dueDate"
                name="dueDate"
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
                value={isoToDatetimeLocal(formik.values.dueDate)}
                onChange={(e) => {
                  formik.setFieldValue(
                    "dueDate",
                    datetimeLocalToIso(e.target.value),
                  );
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
                helperText={formik.touched.dueDate && formik.errors.dueDate}
              />

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" sx={bodyStyle}>
                  Priority
                </InputLabel>
                <Select
                  type="text"
                  label="Priority"
                  id="priority"
                  name="priority"
                  variant="outlined"
                  size="small"
                  slotProps={{
                    input: {
                      sx: bodyStyle,
                    },
                  }}
                  value={formik.values.priority}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.priority && Boolean(formik.errors.priority)
                  }
                >
                  <MenuItem value="low" sx={bodyStyle}>
                    low
                  </MenuItem>
                  <MenuItem value="medium" sx={bodyStyle}>
                    medium
                  </MenuItem>
                  <MenuItem value="high" sx={bodyStyle}>
                    high
                  </MenuItem>
                  <MenuItem value="critical" sx={bodyStyle}>
                    critical
                  </MenuItem>
                </Select>
              </FormControl>

              <TextField
                type="number"
                label="Position"
                id="position"
                name="position"
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
                value={formik.values.position}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.position && Boolean(formik.errors.position)
                }
                helperText={formik.touched.position && formik.errors.position}
              />
            </Stack>

            <DialogActions
              sx={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{ mt: 2 }}
                disabled={mutation.isPending}
                startIcon={<Add />}
              >
                {mutation.isPending ? "Creating..." : "Create"}
              </Button>
              <Button
                variant="outlined"
                sx={{
                  mt: 2,
                  borderColor: "#FF6D00",
                  color: "#FF6D00",
                  borderWidth: 1,
                  borderStyle: "solid",
                }}
                onClick={handleDialogClose}
                disabled={mutation.isPending}
                endIcon={<Cancel />}
              >
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CreateTaskDialog;
