"use client";

import { GetListsServerAction } from "@/actions/lists.server.action";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Container } from "@mui/material";
import { useUserContext } from "@/lib/user.context";
import { useRouter } from "next/navigation";
import ListPageSkeleton from "../skeletons/listPageSkeleton";
import { DndBoardProvider } from "@/lib/DnDBoardContext";
import DndBoardLists from "./dndBoardLists";

const ListsForBoard = ({
  boardId,
  title,
  bgColor,
  userId,
}: {
  boardId: string;
  title: string;
  bgColor: string;
  userId: string;
}) => {
  const { user, isLoading } = useUserContext();
  const router = useRouter();
  console.log("Board Bg color", bgColor);
  console.log("ListsForBoard userid", userId);

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
  });

  if (isError) {
    console.error("Error fetching lists", error.message);
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
    <DndBoardProvider initialLists={lists}>
      <DndBoardLists
        boardId={boardId}
        title={title}
        bgColor={bgColor}
        userId={userId}
      ></DndBoardLists>
    </DndBoardProvider>
  );
};

export default ListsForBoard;
