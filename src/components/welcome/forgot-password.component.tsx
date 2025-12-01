"use client";

import { Box, Button, TextField } from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import {
  ForgotPasswordSchema,
  ForgotPasswordType,
  NotificationBarType,
} from "@/lib/types";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useMutation } from "@tanstack/react-query";
import { ForgotPasswordServerAction } from "@/actions/auth.server.action";
import { useState } from "react";
import NotificationBar from "@/lib/notificationBar";

const ForgotPassword = () => {
  const [notification, setNotification] = useState<NotificationBarType | null>(
    null,
  );
  // 1. Initialize all variables or constants

  const mutation = useMutation({
    mutationKey: ["user"],
    mutationFn: (values: { email: string }) =>
      ForgotPasswordServerAction(values),
    onSuccess: (result) => {
      setNotification({
        message: result.message,
        messageType: "success",
      });
      formik.resetForm();
    },
    onError: (error) => {
      setNotification({
        message: error.message,
        messageType: "error",
      });
    },
  });
  const initialValues: ForgotPasswordType = {
    email: "",
  };
  const handleFormSubmit = async (
    values: ForgotPasswordType,
    { setSubmitting }: FormikHelpers<ForgotPasswordType>,
  ) => {
    console.log(values);
    try {
      await mutation.mutateAsync(values);
    } catch (error) {
      console.error("Network error", error);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    validationSchema: toFormikValidationSchema(ForgotPasswordSchema),
    initialValues,
    onSubmit: handleFormSubmit,
  });

  return (
    <>
      {notification && (
        <NotificationBar
          message={notification.message}
          messageType={notification.messageType}
        />
      )}
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
    </>
  );
};

export default ForgotPassword;
