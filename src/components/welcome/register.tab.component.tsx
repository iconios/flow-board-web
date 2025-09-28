/*
#Plan:
1. Initialize all variables or constants
2. Create the password input field
3. Create the typography with link for the Forgot Password
4. Create the login button with its onClick prop targeting the loginButtonHandler
5. Create the loginButtonHandler function
6. Create an empty typography to show the server messages
*/
"use client";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import { RegisterFormValuesSchema, RegisterFormValuesType } from "@/lib/types";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Link from "next/link";

const RegisterTabPanel = () => {
  // 1. Initialize all variables or constants
  const initialValues: RegisterFormValuesType = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };
  const handleFormSubmit = (
    values: RegisterFormValuesType,
    { setSubmitting, resetForm }: FormikHelpers<RegisterFormValuesType>,
  ) => {
    console.log(values);
    setSubmitting(false);
  };

  const formik = useFormik({
    validationSchema: toFormikValidationSchema(RegisterFormValuesSchema),
    initialValues,
    onSubmit: handleFormSubmit,
  });

  return (
    <Box
      sx={{
        borderRadius: 5,
        px: 1,
        py: 2,
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Stack direction="column">
          <Stack direction={{ sm: "column", md: "row" }} spacing={2}>
            <TextField
              type="firstname"
              label="Firstname"
              required
              id="firstname"
              name="firstname"
              variant="outlined"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstname && Boolean(formik.errors.firstname)
              }
              helperText={formik.touched.firstname && formik.errors.firstname}
              sx={{ pb: { xs: 2, sm: 0 }, width: { xs: "100%", md: "50%" } }}
            />
            <TextField
              type="lastname"
              label="Lastname"
              required
              id="lastname"
              name="lastname"
              variant="outlined"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastname && Boolean(formik.errors.lastname)}
              helperText={formik.touched.lastname && formik.errors.lastname}
              sx={{ pb: 2, width: { xs: "100%", md: "50%" } }}
            />
          </Stack>
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
            sx={{ pb: 2 }}
          />

          <TextField
            type="password"
            label="Password"
            required
            id="password"
            name="password"
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Stack>

        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          sx={{ mt: 4 }}
        >
          Sign Up
        </Button>
      </form>
    </Box>
  );
};

export default RegisterTabPanel;
