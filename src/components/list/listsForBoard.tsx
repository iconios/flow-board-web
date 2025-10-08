"use client"

import { GetListsServerAction } from "@/actions/lists.server.action";
import { NotificationBarType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ListUI from "./listUI";
import NotificationBar from "@/lib/notificationBar";
import { Box } from "@mui/material";

const ListsForBoard = ({ boardId }: {boardId: string}) => {
    const [ notification, setNotification ] = useState<NotificationBarType | null>(null)


    // 1. Get the board ID and Fetch the board's lists
    const { isPending, isError, data: lists, error } = useQuery({
        queryKey: ["list", `list:${boardId}`],
        queryFn: () => GetListsServerAction(boardId),
        enabled: !!boardId,
        staleTime: 30_000,
        retry: 1,
    })
    
    if (isError) {
        setNotification({
            message: `${error.message}`,
            messageType: "error"
        })
        return;
    }

    if (isPending) return <div>Please wait...</div>

    return (
        <Box
            padding={{ xs: 1, sm: 2 }}
        >
            { notification && <NotificationBar message={notification.message} messageType={notification.messageType} />}
            {
                lists.map((list) => (
                    <ListUI list={list} key={list.id} />
                ))
            }
        </Box>
    )
}

export default ListsForBoard;