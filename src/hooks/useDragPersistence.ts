import { useCallback } from "react";
import { useSocket } from "@/lib/socketProvider";

const useDragPersistence = () => {
  const socket = useSocket();

  const persistTaskReorder = useCallback(
    (taskId: string, listId: string, newPosition: number) => {
      if (!socket?.connected) {
        console.warn("Socket not available for task move persistence");
        return;
      }

      try {
        socket.emit("task:reorder", {
          data: {
            taskId,
            listId,
            position: newPosition,
          },
        });
      } catch (error) {
        console.error("Failed to reorder task", error);
      }
    },
    [socket],
  );

  const persistTaskMove = useCallback(
    (taskId: string, listId: string) => {
      if (!socket?.connected) {
        console.warn("Socket not available for task move persistence");
        return;
      }

      try {
        console.log("Data object for task move", {
          taskId,
          listId,
        });
        socket.emit("task:move", {
          data: {
            taskId,
            listId,
          },
        });
      } catch (error) {
        console.error("Failed to move task", error);
      }
    },
    [socket],
  );

  const persistListReorder = useCallback(
    (listId: string, newPosition: number) => {
      if (!socket?.connected) {
        console.warn("Socket not available for task move persistence");
        return;
      }

      try {
        console.log("Data for list reorder", {
          listId,
          newPosition,
        });
        socket.emit("list:reorder", {
          data: {
            listId,
            position: newPosition,
          },
        });
      } catch (error) {
        console.error("Failed to reorder list", error);
      }
    },
    [socket],
  );

  return {
    persistTaskReorder,
    persistListReorder,
    persistTaskMove,
  };
};

export default useDragPersistence;
