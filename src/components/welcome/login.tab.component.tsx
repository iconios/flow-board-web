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

import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import { FormValuesSchema, FormValuesType } from "@/lib/types";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Link from "next/link";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useState } from "react";

const LoginTabPanel = () => {
  // 1. Initialize all variables or constants
  const [showPassword, setShowPassword] = useState(false);
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
    resetForm();
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const formik = useFormik({
    validationSchema: toFormikValidationSchema(FormValuesSchema),
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
        <Stack direction="column" spacing={2}>
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
          />

          <TextField
            type={showPassword ? "text" : "password"}
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
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPasswordClick}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Stack>

        <Link href={"/forgot-password"} style={{ textDecoration: "none" }}>
          <Typography
            color="primary"
            align="right"
            variant="body2"
            component="p"
            sx={{ py: 2 }}
          >
            Forgot Password?
          </Typography>
        </Link>

        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          Sign In
        </Button>
      </form>
    </Box>
  );
};

export default LoginTabPanel;
