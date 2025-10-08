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
import { Box, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import NotificationBar from "@/lib/notificationBar";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const BoardsPage = () => {
  // 1. Initialize the needed variables and constants
  const router = useRouter();
  const { isLoading, user } = useUserContext();

  useEffect(() => {
    if (isLoading) return;

    if (!user.email) {
      router.push("/welcome");
    }
  }, [user.email, router, isLoading]);

  // Get the boards from server
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["board", user.email],
    queryFn: () => GetBoardsServerAction(),
    enabled: !!user.email && !isLoading,
    staleTime: 30_000,
    retry: 1,
  });

  console.log("Board details frontend", data);

  if (isError)
    return <NotificationBar message={error.message} messageType="error" />;

  // 3. Show the boards info
  if (isPending) return <div>Please wait...</div>;

  const boards = data?.data;

  if (boards && boards.length === 0) {
    return (
      <>
        <Typography>No boards available</Typography>
        <CreateBoardButton />
      </>
    );
  }

  if (boards && boards.length > 0) {
    return (
      <Container>
        <CreateBoardButton />
        <Box
          sx={{
            borderStyle: "solid",
            borderWidth: "2px",
            borderColor: "black",
          }}
        >
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            flexWrap="wrap"
            justifyContent="space-around"
            alignItems="stretch"
            gap={2}
            sx={{
              borderStyle: "solid",
              borderWidth: "2px",
              borderColor: "blue",
              mb: 4,
            }}
          >
            {boards.map((board) => (
              <Link href={`/my-lists/${board.boardId}`} key={board.boardId} style={{ textDecoration: "none" }}>
                <BoardCard
                  bg_color={board.bgColor}
                  title={board.title}
                  userName={board.user.firstname}
                  key={board.boardId}
                  boardId={board.boardId!}
                />
              </Link>
            ))}
          </Box>
        </Box>
      </Container>
    );
  }

  return <CreateBoardButton />;
};

export default BoardsPage;
