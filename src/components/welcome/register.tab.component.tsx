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
  Stack,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  useTheme,
} from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import {
  NotificationBarType,
  RegisterFormValuesSchema,
  RegisterFormValuesType,
} from "@/lib/types";
import { toFormikValidationSchema } from "zod-formik-adapter";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { SignUpServerAction } from "@/actions/auth.server.action";
import NotificationBar from "@/lib/notificationBar";
import { useMutation } from "@tanstack/react-query";

const RegisterTabPanel = () => {
  // 1. Initialize all variables or constants
  const theme = useTheme();
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState<NotificationBarType | null>(
    null,
  );
  const initialValues: RegisterFormValuesType = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  const mutation = useMutation({
    mutationKey: ["register"],
    mutationFn: (values: RegisterFormValuesType) => SignUpServerAction(values),
  });

  const handleFormSubmit = async (
    values: RegisterFormValuesType,
    { setSubmitting, resetForm }: FormikHelpers<RegisterFormValuesType>,
  ) => {
    console.log(values);

    try {
      mutation.mutateAsync(values);
      if (mutation.isError) {
        setNotification({
          message: `${mutation.error.message}`,
          messageType: "error",
        });
        return;
      }

      setNotification({
        message: "A verification email has been sent to your e-mailbox",
        messageType: "success",
      });
      resetForm();
    } catch (error: unknown) {
      console.error("Server error", error);
      setNotification({
        message: String(error),
        messageType: "error",
      });
    } finally {
      setSubmitting(false);
    }
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
      {notification && (
        <NotificationBar
          message={notification.message}
          messageType={notification.messageType}
        />
      )}
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
              size="small"
              slotProps={{
                inputLabel: {
                  style: {
                    ...theme.typography.body2,
                  },
                },
                input: {
                  sx: {
                    ...theme.typography.body2,
                  },
                },
              }}
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
              size="small"
              slotProps={{
                inputLabel: {
                  style: {
                    ...theme.typography.body2,
                  },
                },
                input: {
                  sx: {
                    ...theme.typography.body2,
                  },
                },
              }}
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
            size="small"
            slotProps={{
              inputLabel: {
                style: {
                  ...theme.typography.body2,
                },
              },
              input: {
                sx: {
                  ...theme.typography.body2,
                },
              },
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ pb: 2 }}
          />

          <TextField
            type={showPassword ? "text" : "password"}
            label="Password"
            required
            id="password"
            name="password"
            variant="outlined"
            value={formik.values.password}
            size="small"
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
                sx: {
                  ...theme.typography.body2,
                },
              },
              inputLabel: {
                style: {
                  ...theme.typography.body2,
                },
              },
            }}
          />
        </Stack>

        <FormControlLabel
          control={
            <Checkbox
              size="medium"
              checked={checked}
              required
              aria-label="Terms of service checkbox"
              onChange={() => setChecked(!checked)}
              sx={{ pt: 2 }}
            />
          }
          slotProps={{
            typography: {
              sx: {
                ...theme.typography.body2,
              },
            },
          }}
          label="I agree to the Terms of Service and Privacy Policy"
        />

        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          sx={{ mt: 2, py: 1 }}
          disabled={!checked}
        >
          Sign Up
        </Button>
      </form>
      <Typography variant="body2" sx={{ pt: 2 }} align="center">
        Already have an account? Log in
      </Typography>
    </Box>
  );
};

export default RegisterTabPanel;
