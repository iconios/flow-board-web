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

import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import { FormValuesSchema, FormValuesType } from "@/lib/types";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Link from "next/link";

const Login = () => {
  // 1. Initialize all variables or constants
  const initialValues: FormValuesType = {
    email: "",
    password: "",
  };
  const handleFormSubmit = (
    values: FormValuesType,
    { setSubmitting, resetForm }: FormikHelpers<FormValuesType>,
  ) => {
    console.log(values);
    setSubmitting(false);
  };

  const formik = useFormik({
    validationSchema: toFormikValidationSchema(FormValuesSchema),
    initialValues,
    onSubmit: handleFormSubmit,
  });

  return (
    <Paper
      sx={{
        borderRadius: 5,
        height: "100vh",
        px: 4,
        py: 4,
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Stack direction="column" spacing={2}>
          <TextField
            type="email"
            label="Email"
            required
            id="email"
            name="email"
            autoFocus
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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

        <Link href={""}>
          <Typography
            color="primary"
            align="right"
            variant="body1"
            sx={{ py: 2 }}
          >
            Forgot Password?
          </Typography>
        </Link>

        <Button type="submit" color="primary" variant="contained" fullWidth>
          Sign In
        </Button>
      </form>
    </Paper>
  );
};

export default Login;
