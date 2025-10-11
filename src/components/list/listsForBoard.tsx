"use client";

import { GetListsServerAction } from "@/actions/lists.server.action";
import { NotificationBarType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ListUI from "./listUI";
import NotificationBar from "@/lib/notificationBar";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useUserContext } from "@/lib/user.context";
import { useRouter } from "next/navigation";
import { Add, GroupAdd } from "@mui/icons-material";
import CreateListDialog from "./createListDialog";

const ListsForBoard = ({
  boardId,
  title,
  bgColor,
}: {
  boardId: string;
  title: string;
  bgColor: string;
}) => {
  const [notification, setNotification] = useState<NotificationBarType | null>(
    null,
  );
  const [openCreateListDialog, setOpenCreateListDialog] = useState(false);
  const { user, isLoading } = useUserContext();
  const theme = useTheme();
  const router = useRouter();
  console.log("Board Bg color", bgColor);

  // Check if user is authenticated
  useEffect(() => {
    if (isLoading) return;

    if (!user.email) {
      return router.push("/welcome");
    }
  }, [user.email, router, isLoading]);

  // Handler to Create List
  const handleDialogOpen = () => {
    setNotification(null);
    setOpenCreateListDialog(true);
  };

  const handleDialogClose = () => {
    setOpenCreateListDialog(false);
  };

  const handleInviteToBoard = () => {
    console.log("Invite to board clicked");
  };

  // 1. Get the board ID and Fetch the board's lists
  const {
    isPending,
    isError,
    data: lists,
    error,
  } = useQuery({
    queryKey: ["list", `list:${boardId}`],
    queryFn: () => GetListsServerAction(boardId),
    enabled: !!boardId,
  });

  if (isError) {
    setNotification({
      message: `${error.message}`,
      messageType: "error",
    });
    return;
  }

  if (isPending) return <div>Please wait...</div>;

  return (
    <Box padding={{ xs: 2 }}>
      {notification && (
        <NotificationBar
          message={notification.message}
          messageType={notification.messageType}
        />
      )}
      {/* Container for Board title and user welcome message */}
      <Paper
        sx={{
          bgcolor: { bgColor },
          py: 1,
          px: 2,
          mb: 0.5,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          borderTopRightRadius: 1,
          borderTopLeftRadius: 1,
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
        }}
      >
        {/* Board title for lists */}
        <Typography variant="h5" fontWeight={600}>
          {title}
        </Typography>
        {/* Board user welcome message */}
        <Box>
          <Typography variant="body1" fontWeight={600}>
            Hello {user.firstname}
          </Typography>
        </Box>
      </Paper>

      {/* Container for "Add new list" and "Invite to Board" buttons */}
      <Box bgcolor={theme.palette.background.paper} padding={2}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
        >
          <IconButton
            sx={{
              py: 1,
              px: 2,
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              borderRadius: 0,
              "&:hover": {
                bgcolor: theme.palette.primary.dark, // Slightly darker on hover
              },
              "&:active": {
                bgcolor: theme.palette.primary.main, // Keep same color when active/clicked
              },
              "&:focus": {
                bgcolor: theme.palette.primary.main, // Keep same color when focused
              },
              "&:focus-visible": {
                bgcolor: theme.palette.primary.main, // Keep same color for focus visibility
              },
            }}
            onClick={handleDialogOpen}
          >
            <Add />
            <Typography variant="subtitle1" sx={{ ml: 1 }}>
              Add new List
            </Typography>
          </IconButton>
          <IconButton
            sx={{
              py: 1,
              px: 2,
              bgcolor: theme.palette.secondary.main,
              color: theme.palette.primary.contrastText,
              borderRadius: 0,
              "&:hover": {
                bgcolor: theme.palette.primary.dark, // Slightly darker on hover
              },
              "&:active": {
                bgcolor: theme.palette.primary.main, // Keep same color when active/clicked
              },
              "&:focus": {
                bgcolor: theme.palette.primary.main, // Keep same color when focused
              },
              "&:focus-visible": {
                bgcolor: theme.palette.primary.main, // Keep same color for focus visibility
              },
            }}
            onClick={handleInviteToBoard}
          >
            <GroupAdd />
            <Typography variant="subtitle1" sx={{ ml: 1 }}>
              Invite to Board
            </Typography>
          </IconButton>
        </Stack>
      </Box>

      {/* Create new List Dialog Box */}
      <CreateListDialog
        boardId={boardId}
        open={openCreateListDialog}
        onClose={handleDialogClose}
      />

      {/* Container to display all the Lists in a Board */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-evenly",
        }}
      >
        {lists.map((list) => (
          <ListUI list={list} key={list.id} />
        ))}
      </Box>
    </Box>
  );
};

export default ListsForBoard;
