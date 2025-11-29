import BoardTitleUserWelcome from "@/lib/boardTitleUserWelcome";
import CustomSizeSwitch from "@/lib/customSwitch";
import { useDndBoard } from "@/lib/DnDBoardContext";
import NotificationBar from "@/lib/notificationBar";
import theme from "@/lib/theme";
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  TouchSensor,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  DndContext,
  DragOverlay,
  CollisionDetection,
  closestCenter,
  pointerWithin,
  rectIntersection,
} from "@dnd-kit/core";
import {
  sortableKeyboardCoordinates,
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Add } from "@mui/icons-material";
import {
  Box,
  Stack,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import InviteToBoard from "../board/inviteToBoard";
import CreateListDialog from "./createListDialog";
import ListUI from "./listUI";
import { useEffect, useState } from "react";
import { NotificationBarType } from "@/lib/types";
import { useSocket } from "@/lib/socketProvider";
import useDragPersistence from "@/hooks/useDragPersistence";
import { useHandleTaskReorder } from "@/hooks/useHandleTaskReorder";

const DndBoardLists = ({
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
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const handleTaskReorderSuccess = useHandleTaskReorder();
  const socket = useSocket();
  const [notification, setNotification] = useState<NotificationBarType | null>(
    null,
  );
  const { persistListReorder, persistTaskReorder, persistTaskMove } =
    useDragPersistence();
  const [openCreateListDialog, setOpenCreateListDialog] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const {
    lists: dndLists,
    activeId,
    moveTask,
    reorderTask,
    reorderList,
    setActiveId,
  } = useDndBoard();

  // Configure sensors for different input methods
  const sensors = useSensors(
    useSensor(PointerSensor, {
      // Optional configuration for pointer sensor
      activationConstraint: {
        distance: 4,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 120,
        tolerance: 6,
      },
    }),
  );

  useEffect(() => {
    if (!socket) {
      console.error("Socket not available for board", boardId);
      return;
    }

    const handleSuccess = (response: { message: string; roomId: string }) => {
      setNotification({
        message: `${response.message} for room-id ${response?.roomId}`,
        messageType: "success",
      });
    };

    const handleError = (response: { message: string }) => {
      setNotification({
        message: `${response.message}`,
        messageType: "error",
      });
    };

    const handleTaskMoveOrReorder = () => {
      setNotification({
        message: "Task moved. Please refresh to see changes",
        messageType: "success",
      });
    };

    // socket.on("room:join:success", handleSuccess);
    socket.on("room:join:error", handleError);
    socket.on("task:move:success", () => {
      handleTaskMoveOrReorder();
    });
    socket.on("task:move:error", handleError);
    socket.on("task:reorder:success", (response) =>
      handleTaskReorderSuccess(response),
    );
    socket.on("task:reorder:error", handleError);
    socket.on("list:reorder:error", handleError);

    if (dndLists.length > 0) {
      for (let list of dndLists) {
        const roomId = `listId-${list.id}`;
        socket.emit("room:join", roomId);
      }
    }

    // Cleanup listeners and leave rooms
    return () => {
      socket.off("room:join:success", handleSuccess);
      socket.off("room:join:error", handleError);
      socket.off("task:reorder:error", handleError);
      socket.off("list:reorder:success", handleSuccess);
      socket.off("list:reorder:error", handleError);
      socket.off("task:move:success", handleSuccess);
      socket.off("task:move:error", handleError);
      socket.off("task:reorder:success", handleSuccess);

      // Leave all list rooms
      if (dndLists.length > 0) {
        for (let list of dndLists) {
          const roomId = `listId-${list.id}`;
          socket.emit("room:leave", roomId);
        }
      }
    };
  }, [socket, dndLists, boardId]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    console.log("Drag over:", { activeId, overId });

    // Find the active task
    const activeTask = dndLists
      .flatMap((lis) => lis.tasks)
      .find((task) => task._id === activeId);

    if (!activeTask) {
      console.log("Active task not found");
      return;
    }

    const activeListId = activeTask.listId;
    console.log("Active task is in list:", activeListId);

    // SCENARIO 1: Dragging over a LIST (the list container/header)
    const isOverList = dndLists.some((lis) => lis.id === overId);
    if (isOverList && activeListId !== overId) {
      console.log(
        "Moving task to different list:",
        activeId,
        "from",
        activeListId,
        "to",
        overId,
      );
      moveTask(activeId, overId);
      persistTaskMove(activeId, overId);
      return;
    }

    // SCENARIO 2: Dragging over a TASK
    const overTask = dndLists
      .flatMap((lis) => lis.tasks)
      .find((task) => task._id === overId);

    if (overTask) {
      const overListId = overTask.listId;
      console.log("Over task is in list:", overListId);

      // SCENARIO 2A: Moving to different list (dragging over a task in another list)
      if (activeListId !== overListId) {
        console.log(
          "Moving task to different list (via task):",
          activeId,
          "from",
          activeListId,
          "to",
          overListId,
        );
        moveTask(activeId, overListId);
        persistTaskMove(activeId, overListId);
        return;
      }

      // SCENARIO 2B: Reordering within same list
      const dndList = dndLists.find((lis) => lis.id === activeListId);
      if (!dndList) return;

      const activePosition = dndList.tasks.findIndex(
        (task) => task._id === activeId,
      );
      const overPosition = dndList.tasks.findIndex(
        (task) => task._id === overId,
      );

      console.log("Reordering positions:", { activePosition, overPosition });

      if (activePosition !== overPosition) {
        console.log("Reordering task within same list");
        reorderTask(activeListId, activeId, overPosition);
        persistTaskReorder(activeId, activeListId, overPosition);
      }
    }

    // SCENARIO 3: Dragging over EMPTY SPACE in a list
    console.log("Unknown drag scenario - might be over empty space in a list");
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const isListDrag =
      active.data?.current?.type === "list" &&
      over.data?.current?.type === "list";

    if (isListDrag && active.id !== over.id) {
      reorderList(active.id as string, over.id as string);
      persistListReorder(
        active.id as string,
        over?.data?.current?.position as number,
      );
    }
  };

  // FInd active task for overlay
  const activeTask = activeId
    ? dndLists.flatMap((lis) => lis.tasks).find((task) => task._id === activeId)
    : null;

  const listOnlyCollisions: CollisionDetection = (args) => {
    const isDraggingList = args.active?.data?.current?.type === "list";
    if (isDraggingList) {
      // Filter droppbles to only lists
      const filtered = {
        ...args,
        droppableContainers: args.droppableContainers.filter(
          (c) => c.data?.current?.type === "list",
        ),
      };

      // Try pointerWithin first (feels best for list rows), then fall back
      return pointerWithin(filtered).length
        ? pointerWithin(filtered)
        : closestCenter(filtered);
    }

    // Default flow for tasks
    return pointerWithin(args).length
      ? pointerWithin(args)
      : rectIntersection(args);
  };

  // Handler to Create List
  const handleDialogOpen = () => {
    setNotification(null);
    setOpenCreateListDialog(true);
  };

  const handleDialogClose = () => {
    setOpenCreateListDialog(false);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={listOnlyCollisions}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box padding={{ xs: 2 }} sx={{ marginBottom: { xs: 12, sm: 16 } }}>
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
              <Typography variant="body2" sx={{ ml: 1 }}>
                Add new List
              </Typography>
            </IconButton>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <CustomSizeSwitch
                switchSize="medium"
                checked={showInvite}
                onChange={() => setShowInvite(!showInvite)}
              />
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, ml: 1, pt: 0.5 }}
              >
                Invite to Board
              </Typography>
            </div>
          </Stack>
        </Box>

        {/* Create new List Dialog Box */}
        {openCreateListDialog && (
          <CreateListDialog
            boardId={boardId}
            open={openCreateListDialog}
            onClose={handleDialogClose}
          />
        )}

        {/* Container to display all the Lists in a Board */}
        <Box
          sx={{
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-evenly",
          }}
          display={showInvite ? "none" : "flex"}
        >
          <SortableContext
            items={dndLists.map((list) => list.id)}
            strategy={
              isMdUp
                ? horizontalListSortingStrategy
                : verticalListSortingStrategy
            }
          >
            {dndLists.map((list) => (
              <ListUI list={list} key={list.id} bgColor={bgColor} />
            ))}
          </SortableContext>
        </Box>

        <Box display={showInvite ? "block" : "none"}>
          <InviteToBoard boardId={boardId} userId={userId} />
        </Box>
      </Box>
      <DragOverlay>
        {/* Your drag overlay content */}
        {activeTask && (
          <Box
            component="div"
            sx={{
              bgcolor: "background.paper",
              p: 2,
              border: "2px dashed",
              borderColor: "primary.main",
              borderRadius: 1,
              boxShadow: 3,
              opacity: 0.8,
              transform: "rotate(5deg)",
            }}
          >
            <Typography variant="body1" fontWeight={500}>
              Drag preview for {activeTask.title}
            </Typography>
          </Box>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default DndBoardLists;
