"use client";

import { GetListsServerAction } from "@/actions/lists.server.action";
import { NotificationBarType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ListUI from "./listUI";
import NotificationBar from "@/lib/notificationBar";
import { Box, Button, Paper, Typography, useTheme } from "@mui/material";
import { useUserContext } from "@/lib/user.context";
import { useRouter } from "next/navigation";

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
  const { user, isLoading } = useUserContext();
  const theme = useTheme();
  const router = useRouter();
  console.log("Board Bg color", bgColor);

  // Check if user is authenticated
  useEffect(() => {
    if (isLoading) return;

    if (!user.email) {
      router.push("/welcome");
    }
  }, [user.email, router, isLoading]);

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
    staleTime: 30_000,
    retry: 1,
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

      {/* Container for "Invite to Board" button */}
      <Box
        bgcolor={theme.palette.background.paper}
        padding={2}
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          sx={{
            py: 1,
            px: 2,
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          }}
        >
          Invite to Board
        </Button>
      </Box>

      {/* Component to display each list */}
      {lists.map((list) => (
        <ListUI list={list} key={list.id} />
      ))}
    </Box>
  );
};

export default ListsForBoard;
