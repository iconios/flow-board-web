"use client"

import { GetTasksServerAction } from "@/actions/tasks.server.action";
import NotificationBar from "@/lib/notificationBar";
import { NotificationBarType } from "@/lib/types";
import { Box, Container, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const ShowTask = ({ taskId, listId }: { taskId: string; listId: string }) => {
  const [notification, setNotification] = useState<NotificationBarType | null>(
    null,
  );
  const {
    isError,
    error,
    isPending,
    data: tasks,
  } = useQuery({
    queryKey: ["tasks", `tasks:${listId}`],
    queryFn: () => GetTasksServerAction(listId),
    enabled: !!taskId && !!listId,
  });

  useEffect(() => {
    if (isError) {
      setNotification({
        message: `${error.message}`,
        messageType: "error",
      });
    }
  }, [isError, error]);

  const task = tasks?.find((task) => task.id === taskId);

  if (isPending) return <p>Please wait...</p>;
  
  if (!task) return <p>Task not found</p>;

  return (
    <Container>
      {notification && (
        <NotificationBar
          message={notification.message}
          messageType={notification.messageType}
        />
      )}
      <Box>
        <Typography variant="h5">{task.title}</Typography>
      </Box>
      <Box></Box>
    </Container>
  );
};

export default ShowTask;
