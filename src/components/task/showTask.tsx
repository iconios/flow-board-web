"use client";

import {
  GetTasksServerAction,
  UpdateTaskServerAction,
} from "@/actions/tasks.server.action";
import {
  isoToDatetimeLocal,
  datetimeLocalToIso,
} from "@/lib/dateTimeConverter";
import NotificationBar from "@/lib/notificationBar";
import {
  UpdateTaskInputSchema,
  UpdateTaskInputType,
  UpdateTaskUIType,
} from "@/lib/task.types";
import { NotificationBarType } from "@/lib/types";
import { Check, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormikHelpers, useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import TaskPageSkeleton from "../skeletons/taskPageSkeleton";
import CommentsInTask from "../comments/commentsInTask";
import { useUserContext } from "@/lib/user.context";
import { useRouter } from "next/navigation";

const ShowTask = ({ taskId, listId }: { taskId: string; listId: string }) => {
  const theme = useTheme();
  const [notification, setNotification] = useState<NotificationBarType | null>(
    null,
  );
  const queryClient = useQueryClient();
  const { user, isLoading } = useUserContext();
  const bodyStyle = { ...theme.typography.body2 };
  const router = useRouter();

  const {
    isError,
    error,
    isPending,
    data: tasks,
  } = useQuery({
    queryKey: ["task", `task:${listId}`],
    queryFn: () => GetTasksServerAction(listId),
    enabled: !!taskId && !!listId,
  });

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user.firstname) {
      router.push("/welcome");
    }
    if (isError) {
      setNotification({
        message: `${error.message}`,
        messageType: "error",
      });
    }
  }, [isError, error, isLoading, user.firstname, router]);

  const task = tasks?.find((task) => task.id === taskId);
  console.log("Task to show", task);

  const initialValues = useMemo(() => {
    return {
      title: task?.title ?? "",
      description: task?.description ?? "",
      dueDate: task?.dueDate ?? "",
      priority: task?.priority ?? "low",
      position: task?.position ?? 0,
    };
  }, [task]);

  const mutation = useMutation({
    mutationKey: ["task"],
    mutationFn: (values: UpdateTaskInputType) => UpdateTaskServerAction(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task", `task:${listId}`] });
      setNotification({
        message: "Task updated successfully",
        messageType: "success",
      });
    },
    onError: () => {
      setNotification({
        message: `${mutation.error}`,
        messageType: "error",
      });
    },
  });

  const handleUpdateTaskSubmit = async (
    values: UpdateTaskUIType,
    { setSubmitting, resetForm }: FormikHelpers<UpdateTaskUIType>,
  ) => {
    console.log(values);
    setNotification(null);
    try {
      await mutation.mutateAsync({
        ...values,
        taskId,
        listId,
      });
      resetForm();
    } catch (error) {
      console.error("Error updating task", error);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(UpdateTaskInputSchema),
    onSubmit: handleUpdateTaskSubmit,
  });

  // Check if a specific field is dirty
  const isFieldDirty = (fieldName: keyof UpdateTaskUIType) => {
    return formik.initialValues[fieldName] !== formik.values[fieldName];
  };

  // Reset a specific field to its initial value
  const resetField = (fieldName: keyof UpdateTaskUIType) => {
    formik.setFieldValue(fieldName, formik.initialValues[fieldName]);
    formik.setFieldTouched(fieldName, false);
  };

  const saveField = async (
    fieldName: keyof UpdateTaskUIType,
  ): Promise<void> => {
    // Validate the field first
    await formik.validateField(fieldName);

    if (formik.errors[fieldName]) return;

    console.log(`Saving ${fieldName}:`, formik.values[fieldName]);

    // Create payload with only the changed field
    const payLoad = {
      taskId,
      listId,
      [fieldName]: formik.values[fieldName],
    } as UpdateTaskInputType;

    setNotification(null);
    try {
      await mutation.mutateAsync(payLoad);
      // After successful save, update initialValues to reflect the new state
      formik.setFieldValue(fieldName, formik.values[fieldName]);
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  if (isPending) {
    return <TaskPageSkeleton />;
  }

  if (!task) return <p>Task not found</p>;

  return (
    <Container sx={{ marginBottom: 16 }}>
      {notification && (
        <NotificationBar
          message={notification.message}
          messageType={notification.messageType}
        />
      )}
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="column" spacing={2} sx={{ mb: 2, mt: 4 }}>
            <TextField
              type="text"
              label="Title"
              required
              id="title"
              size="small"
              slotProps={{
                inputLabel: {
                  sx: bodyStyle,
                },
                input: {
                  sx: bodyStyle,
                },
              }}
              name="title"
              variant="outlined"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            {isFieldDirty("title") && (
              <Box
                sx={{
                  mt: 1,
                  display: "flex",
                  gap: 1,
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  size="small"
                  startIcon={<Close />}
                  onClick={() => resetField("title")}
                  color="inherit"
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  startIcon={<Check />}
                  variant="contained"
                  onClick={() => saveField("title")}
                  disabled={Boolean(formik.errors.title)}
                >
                  Save
                </Button>
              </Box>
            )}

            <TextField
              type="text"
              label="Description"
              id="description"
              name="description"
              variant="outlined"
              multiline
              size="small"
              slotProps={{
                inputLabel: {
                  sx: bodyStyle,
                },
                input: {
                  sx: bodyStyle,
                },
              }}
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
            {isFieldDirty("description") && (
              <Box
                sx={{
                  mt: 1,
                  display: "flex",
                  gap: 1,
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  size="small"
                  startIcon={<Close />}
                  onClick={() => resetField("description")}
                  color="inherit"
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  startIcon={<Check />}
                  variant="contained"
                  onClick={() => saveField("description")}
                  disabled={Boolean(formik.errors.description)}
                >
                  Save
                </Button>
              </Box>
            )}

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
            {isFieldDirty("dueDate") && (
              <Box
                sx={{
                  mt: 1,
                  display: "flex",
                  gap: 1,
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  size="small"
                  startIcon={<Close />}
                  onClick={() => resetField("dueDate")}
                  color="inherit"
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  startIcon={<Check />}
                  variant="contained"
                  onClick={() => saveField("dueDate")}
                  disabled={Boolean(formik.errors.dueDate)}
                >
                  Save
                </Button>
              </Box>
            )}

            <CommentsInTask taskId={taskId} />

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
            {isFieldDirty("priority") && (
              <Box
                sx={{
                  mt: 1,
                  display: "flex",
                  gap: 1,
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  size="small"
                  startIcon={<Close />}
                  onClick={() => resetField("priority")}
                  color="inherit"
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  startIcon={<Check />}
                  variant="contained"
                  onClick={() => saveField("priority")}
                  disabled={Boolean(formik.errors.priority)}
                >
                  Save
                </Button>
              </Box>
            )}

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
              error={formik.touched.position && Boolean(formik.errors.position)}
              helperText={formik.touched.position && formik.errors.position}
            />
            {isFieldDirty("position") && (
              <Box
                sx={{
                  mt: 1,
                  display: "flex",
                  gap: 1,
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  size="small"
                  startIcon={<Close />}
                  onClick={() => resetField("position")}
                  color="inherit"
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  startIcon={<Check />}
                  variant="contained"
                  onClick={() => saveField("position")}
                  disabled={Boolean(formik.errors.position)}
                >
                  Save
                </Button>
              </Box>
            )}
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default ShowTask;
