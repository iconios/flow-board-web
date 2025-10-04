/*
#Plan:
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
import {
  FormValuesSchema,
  FormValuesType,
  NotificationBarType,
} from "@/lib/types";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Link from "next/link";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useState } from "react";
import { LoginServerAction } from "@/actions/auth.server.action";
import NotificationBar from "@/lib/notificationBar";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/lib/user.context";

const LoginTabPanel = () => {
  // 1. Initialize all variables or constants
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState<NotificationBarType | null>(
    null,
  );
  const { LogIn, isLoading } = useUserContext();
  const initialValues: FormValuesType = {
    email: "",
    password: "",
  };

  const router = useRouter();

  const handleFormSubmit = async (
    values: FormValuesType,
    { setSubmitting, resetForm }: FormikHelpers<FormValuesType>,
  ) => {
    console.log(values);
    try {
      // Call the Login server action, validate the result and notify user
      const result = await LoginServerAction(values);

      console.log("Server message", result);
      if (result.error) {
        setNotification({
          message: result.message,
          messageType: "error",
        });
        return;
      }

      // Update the state variable with the result
      if (result.data) {
        LogIn(
          result.data.user.email,
          result.data.user.firstname,
          result.data.token,
        );

        console.log("User details", result.data.user);
        console.log("User token", result.data.token);

        setNotification({
          message: result.message,
          messageType: "success",
        });

        resetForm();
        setTimeout(() => {
          router.push("/my-boards");
        }, 1500);
      }
    } catch (error) {
      console.error("Server error message", error);
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
    validationSchema: toFormikValidationSchema(FormValuesSchema),
    initialValues,
    onSubmit: handleFormSubmit,
  });

  if (isLoading) {
    return <p>Please wait...</p>;
  }

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
