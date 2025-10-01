"use client";

import { Box, Button, TextField } from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import { ForgotPasswordSchema, ForgotPasswordType } from "@/lib/types";
import { toFormikValidationSchema } from "zod-formik-adapter";

const ForgotPassword = () => {
  // 1. Initialize all variables or constants
  const initialValues: ForgotPasswordType = {
    email: "",
  };
  const handleFormSubmit = (
    values: ForgotPasswordType,
    { setSubmitting, resetForm }: FormikHelpers<ForgotPasswordType>,
  ) => {
    console.log(values);
    setSubmitting(false);
    resetForm();
  };

  const formik = useFormik({
    validationSchema: toFormikValidationSchema(ForgotPasswordSchema),
    initialValues,
    onSubmit: handleFormSubmit,
  });

  return (
    <Box
      sx={{
        borderRadius: 5,
        width: { xs: "90%", sm: "70%", md: "100%", lg: "70%" },
        py: { xs: 2 },
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <TextField
          type="email"
          label="Email"
          required
          id="email"
          name="email"
          variant="outlined"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{
            width: { xs: "100%" },
          }}
        />

        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={{ mt: 2, width: { xs: "100%" } }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ForgotPassword;
