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
import { BoardsType } from "@/lib/types";
import { useUserContext } from "@/lib/user.context";
import { Box, Container, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import NotificationBar from "@/lib/notificationBar";

const BoardsPage = () => {
  // 1. Initialize the needed variables and constants
  const router = useRouter();
  const { token, isLoading, user } = useUserContext();
  const [notification, setNotification] = useState({
    message: "",
    messageType: "",
  });
  const [boards, setBoards] = useState<BoardsType[] | null>(null);

  // 2. Fetch the user's boards
  useEffect(() => {
    // Check if user is authenticated
    if (!user.email) {
      router.push("/welcome");
      return;
    }

    const fetchBoards = async () => {
      try {
        const result = await GetBoardsServerAction(token);

        if (result.error) {
          setNotification({
            message: result.message,
            messageType: "error",
          });
        }

        if (result.data) {
          setBoards(result.data);
          setNotification({
            message: result.message,
            messageType: "success",
          });
        }
      } catch (error) {
        console.error("Error reading boards", error);
        setNotification({
          message: "Error reading boards",
          messageType: "error",
        });
      }
    };
    fetchBoards();
  }, [token, user, router]);

  console.log("Board details frontend", boards);

  // 3. Show the boards info
  if (isLoading) {
    return <div>Please wait...</div>;
  }

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
        {notification && (
          <NotificationBar
            message={notification.message}
            messageType={notification.messageType}
          />
        )}
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
              flexDirection= {{ xs: "column", sm: "row" }}
              flexWrap="wrap"
              justifyContent= "space-between"
              alignItems= "stretch"
              gap= {2}
              sx={{
              borderStyle: "solid",
              borderWidth: "2px",
              borderColor: "blue",             
            }}
          >
            {boards.map((board) => (
              <BoardCard
                backgroundColor={board.bgColor}
                title={board.title}
                userName={board.user.firstname}
                key={uuidv4()}
              />
            ))}
          </Box>
        </Box>
      </Container>
    );
  }

  return <CreateBoardButton />;
};

export default BoardsPage;
