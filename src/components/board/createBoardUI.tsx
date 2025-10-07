import {
  Stack,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { CreateBoardUISchema, CreateBoardUIType } from "@/lib/types";
import { useState } from "react";

const CreateBoardUI = () => {
  // Initialize the variables and constants
  const [open, setOpen] = useState(true);

  const handleDialogClose = () => {
    setOpen(false);
  };
  const initialValues = {
    bg_color: "#000000",
    title: "",
  };

  const handleCreateBoardSubmit = (
    values: CreateBoardUIType,
    { setSubmitting, resetForm }: FormikHelpers<CreateBoardUIType>,
  ) => {
    console.log(values);
    setSubmitting(false);
    resetForm();
    handleDialogClose();
  };

  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(CreateBoardUISchema),
    onSubmit: handleCreateBoardSubmit,
  });

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      sx={{
        borderRadius: 5,
        px: 1,
        py: 2,
      }}
    >
      <DialogContent>
        <DialogContentText>Enter board details</DialogContentText>
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
              error={formik.touched.bg_color && Boolean(formik.errors.bg_color)}
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
  );
};

export default CreateBoardUI;
