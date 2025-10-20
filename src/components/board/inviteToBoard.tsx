"use client";

import {
  InviteToBoardSchema,
  InviteToBoardType,
  NotificationBarType,
} from "@/lib/types";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CreateBoardMemberServerAction } from "@/actions/board.member.server.action";
import { CreateBoardMemberInputType } from "@/lib/member.types";
import NotificationBar from "@/lib/notificationBar";
import BoardMembersList from "./boardMembersList";
import { useUserContext } from "@/lib/user.context";

const InviteToBoard = ({ boardId, userId }: { boardId: string, userId: string }) => {
  const {user} = useUserContext();
  const queryClient = useQueryClient();
  const [notification, setNotification] = useState<NotificationBarType | null>(
    null,
  );
  console.log("Board user id", userId);
  console.log("Logged-in user id", user.id)
  const mutation = useMutation({
    mutationKey: ["board-member-invite"],
    mutationFn: (values: CreateBoardMemberInputType) =>
      CreateBoardMemberServerAction(values),
    onSuccess: (result) => {
      setNotification({
        message: `${result.message}`,
        messageType: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["board-member", `board-member:${boardId}`],
      });
      formik.resetForm();
    },
    onError: (error) => {
      setNotification({
        message: `${error.message}` || "Error creating board member",
        messageType: "error",
      });
    },
  });

  const initialValues = {
    email: "",
  };

  const handleInviteToBoard = async (
    values: InviteToBoardType,
    { setSubmitting, resetForm }: FormikHelpers<InviteToBoardType>,
  ) => {
    console.log(values);
    try {
      await mutation.mutateAsync({
        board_id: boardId,
        userEmail: values.email,
        role: "member",
      });
    } catch (error) {
      console.error("Network error", error);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(InviteToBoardSchema),
    onSubmit: handleInviteToBoard,
  });
  return (
    <Box>
      {notification && (
        <NotificationBar
          message={notification.message}
          messageType={notification.messageType}
        />
      )}
      <Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* Container for "Invite to Board" */}
        <Paper
          sx={{
            py: 4,
            px: 4,
            width: { xs: "100%", md: "60%" },
          }}
        >
          <Typography
            variant="h6"
            style={{ fontWeight: 400, marginBottom: 12 }}
          >
            Invite to Board
          </Typography>
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <Stack direction="column">
              <TextField
                name="email"
                id="email"
                type="email"
                variant="outlined"
                label="Email"
                required
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                disabled={ userId !== user.id }
              />
              <Button type="submit" variant="contained" sx={{ mt: 2 }} disabled={ userId !== user.id }>
                Send Invite
              </Button>
            </Stack>
          </form>
        </Paper>
        <Paper
          sx={{
            py: 4,
            bgcolor: "#ffffff",
            width: { xs: "100%", md: "40%" },
            pl: 2,
          }}
        >
          <Typography variant="h5" style={{ fontWeight: 600 }}>
            Members
          </Typography>
          <BoardMembersList boardId={boardId} />
        </Paper>
      </Stack>
    </Box>
  );
};

export default InviteToBoard;
