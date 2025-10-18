"use client";

import { GetListsServerAction } from "@/actions/lists.server.action";
import { NotificationBarType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ListUI from "./listUI";
import NotificationBar from "@/lib/notificationBar";
import {
  Box,
  Container,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useUserContext } from "@/lib/user.context";
import { useRouter } from "next/navigation";
import { Add } from "@mui/icons-material";
import CreateListDialog from "./createListDialog";
import ListPageSkeleton from "../skeletons/listPageSkeleton";
import BoardTitleUserWelcome from "@/lib/boardTitleUserWelcome";
import CustomSizeSwitch from "@/lib/customSwitch";
import InviteToBoard from "../board/inviteToBoard";

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
  const [showInvite, setShowInvite] = useState(false);

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

  if (isPending) {
    return (
      <Container>
        <ListPageSkeleton />
      </Container>
    );
  }

  return (
    <Box padding={{ xs: 2 }}>
      {notification && (
        <NotificationBar
          message={notification.message}
          messageType={notification.messageType}
        />
      )}
      {/* Container for Board title and user welcome message */}
      <BoardTitleUserWelcome title={title} bgColor={bgColor} />

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
              mb: { xs: 1 },
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
            disabled={showInvite}
          >
            <Add />
            <Typography variant="subtitle1" sx={{ ml: 1 }}>
              Add new List
            </Typography>
          </IconButton>
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <CustomSizeSwitch
              switchSize="medium"
              checked={showInvite}
              onChange={() => setShowInvite(!showInvite)}
            />
            <Typography variant="h6" sx={{ fontWeight: 600, ml: 1, pt: 0.5 }}>
              Invite to Board
            </Typography>
          </div>
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
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-evenly",
        }}
        display={showInvite ? "none" : "flex"}
      >
        {lists.map((list) => (
          <ListUI list={list} key={list.id} />
        ))}
      </Box>

      <Box display={showInvite ? "block" : "none"}>
        <InviteToBoard boardId={boardId} />
      </Box>
    </Box>
  );
};

export default ListsForBoard;
