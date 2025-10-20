"use client";

import { GetBoardMembersServerAction } from "@/actions/board.member.server.action";
// Component for each board member

import { GetBoardMembersType } from "@/lib/member.types";
import { List, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import BoardMembersSkeleton from "../skeletons/boardMembersSkeleton";
import NotificationBar from "@/lib/notificationBar";
import MemberUI from "./memberUI";

const BoardMembersList = ({ boardId }: { boardId: string }) => {
  const {
    isPending,
    isError,
    data: members = [],
    error,
  } = useQuery<GetBoardMembersType[]>({
    queryKey: ["board-member", `board-member:${boardId}`],
    queryFn: () => GetBoardMembersServerAction(boardId),
    enabled: !!boardId,
    placeholderData: (prev) => prev
  });

  if (isPending) return <BoardMembersSkeleton />

  return (
    <>
      {isError && (
        <NotificationBar message={error.message} messageType="error" />
      )}
      {members.length > 0 ? (
        <List>
          {members.map((member) => (
            <MemberUI member={member} key={member.memberId} />
          ))}
        </List>
      ) : (
        <Typography>You can invite members and they'll show here!</Typography>
      )}
    </>
  );
};

export default BoardMembersList;
