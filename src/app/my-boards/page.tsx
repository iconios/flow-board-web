/*
#Plan:
1. Initialize the needed variables and constants
2. Fetch the user's boards
3. Show the boards info
4. Show the Create Board button
*/

"use client";

import { GetBoardsServerAction } from "@/actions/boards.server.action";
import CreateBoardButton from "@/components/board/createBoardButton";
import BoardCard from "@/components/board/showBoardCard";
import { useUserContext } from "@/lib/user.context";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import NotificationBar from "@/lib/notificationBar";
import { useQuery } from "@tanstack/react-query";
import BoardPageSkeleton from "@/components/skeletons/boardPageSkeleton";

const BoardsPage = () => {
  // 1. Initialize the needed variables and constants
  const router = useRouter();
  const { isLoading, user } = useUserContext();
  const redirected = useRef(false);

  useEffect(() => {
    if (redirected.current) return;

    if (!user.id) {
      redirected.current = true;
      router.replace("/welcome");
    }
  }, [user.id, router]);

  // Get the boards from server
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["board", user.email],
    queryFn: () => GetBoardsServerAction(),
    enabled: !!user.id,
    staleTime: 30_000,
    retry: 1,
  });

  console.log("Board details frontend", data);

  if (isError)
    return <NotificationBar message={error.message} messageType="error" />;

  // 3. Show the boards info
  if (isPending || isLoading) {
    return <BoardPageSkeleton />;
  }

  if (!user.id) {
    return null;
  }

  const boards = data?.data;

  if (boards && boards.length === 0) {
    return (
      <>
        <Typography>No boards available</Typography>
        <CreateBoardButton />
      </>
    );
  }

  // UI elements to display when there are boards
  if (boards && boards.length > 0) {
    return (
      <Container sx={{ marginBottom: { xs: 16, sm: 12 } }}>
        <CreateBoardButton />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {boards.map((board) => (
              <BoardCard
                bg_color={board.bg_color}
                title={board.title}
                userName={board.user.firstname}
                key={board._id}
                boardId={board._id}
                boardUserId={board.user._id}
              />
            ))}
          </Grid>
        </Box>
      </Container>
    );
  }

  return <CreateBoardButton />;
};

export default BoardsPage;
