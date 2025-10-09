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
} from "@mui/material";
import { useState } from "react";
import { FormikHelpers, useFormik } from "formik";
import { CreateTaskFormType, CreateTaskFormSchema } from "@/lib/types";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {
  datetimeLocalToIso,
  isoToDatetimeLocal,
} from "@/lib/dateTimeConverter";

const CreateTaskDialog = () => {
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
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

  const handleCreateTaskSubmit = async (
    values: CreateTaskFormType,
    { setSubmitting, resetForm }: FormikHelpers<CreateTaskFormType>,
  ) => {
    console.log(values);
    resetForm();
    handleDialogClose();
    setSubmitting(false);
  };

  const formik = useFormik<CreateTaskFormType>({
    initialValues,
    validationSchema: toFormikValidationSchema(CreateTaskFormSchema),
    onSubmit: handleCreateTaskSubmit,
  });

  return (
    <Box>
      <Box
        bgcolor="#E5E4E2"
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <IconButton
          sx={{
            pr: { xs: 2 },
            width: "200px",
          }}
          onClick={handleDialogOpen}
        >
          <Add />
          Add new task
        </IconButton>
      </Box>
      <Dialog open={open} onClose={handleDialogClose}>
        <DialogContent
          sx={{
            width: { xs: "100%", sm: "600px" },
            border: "red solid 2px",
          }}
        >
          <DialogTitle>Create Task</DialogTitle>
          <DialogContentText paddingBottom={2}>
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

              <TextField
                type="text"
                label="Priority"
                id="priority"
                name="priority"
                variant="outlined"
                value={formik.values.priority}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.priority && Boolean(formik.errors.priority)
                }
                helperText={formik.touched.priority && formik.errors.priority}
              />

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
                >
                  Create
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

export default CreateTaskDialog;
