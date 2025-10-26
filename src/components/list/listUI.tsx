// Container for each list

import { ListType } from "@/lib/types";
import {
  Box,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import TaskInListUI from "../task/taskInListUI";
import CreateTaskDialog from "../task/createTaskDialog";
import { Delete, Edit } from "@mui/icons-material";
import { CSSProperties, useState } from "react";
import EditListDialog from "./editListDialog";
import DeleteBListDialog from "./deleteListDialog";
import {
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import theme from "@/lib/theme";

const ListUI = ({ list }: ListType) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  // useSortable hook for colum drag and drop
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: list.id, data: { type: "list", position: list.position } });

  // CSS styles for column drag animation
  const base = CSS.Transform.toString(transform);
  const style: CSSProperties = {
    transform: isDragging ? `${base} rotate(5deg)` : base,
    transition,
    cursor: isDragging ? "grabbing" : "grab",
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  return (
    // Container for each list
    <Paper
      ref={setNodeRef}
      style={style}
      sx={{
        mb: 2,
        width: { xs: "100%", md: "calc(32% - 8px)" },
        borderRadius: 0,
        opacity: isDragging ? 0.6 : 1,
        bgcolor: isDragging ? "#eff6ff" : "background.paper",
        border: isDragging ? "2px dashed #90cdf4" : "1px solid",
        borderColor: isDragging ? "#90cdf4" : "divider",
        transition: "all 0.2s ease",
        cursor: isDragging ? "grabbing" : "grab",
        "&:hover": {
          boxShadow: isDragging ? "none" : 2,
        },
      }}
    >
      {/* Container for List title, all its tasks, and "Add new task" button */}
      <Box padding={2} bgcolor="#E5E4E2" {...attributes} {...listeners}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Typography variant="h6">{list.title}</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <IconButton onClick={() => setOpenEditDialog(true)}>
              <Edit />
            </IconButton>
            <EditListDialog
              dialogOpen={openEditDialog}
              title={list.title}
              position={list.position}
              status={list.status}
              boardId={list.boardId}
              listId={list.id}
              onClose={handleCloseEditDialog}
            />
            <IconButton onClick={() => setOpenDeleteDialog(true)}>
              <Delete />
            </IconButton>
            <DeleteBListDialog
              listId={list.id}
              boardId={list.boardId}
              onClose={handleCloseDeleteDialog}
              dialogOpen={openDeleteDialog}
            />
          </Box>
        </Box>

        {/* Container for all tasks */}
        <Box minHeight={100}>
          <SortableContext
            items={list.tasks.map((task) => task._id)}
            strategy={
              isMdUp
                ? horizontalListSortingStrategy
                : verticalListSortingStrategy
            }
          >
            {list.tasks.map((task) => (
              <TaskInListUI
                title={task.title}
                taskId={task._id}
                listId={task.listId}
                boardId={list.boardId}
                key={task._id}
              />
            ))}
          </SortableContext>
        </Box>
      </Box>

      {/* Add new task button */}
      <CreateTaskDialog boardId={list.boardId} listId={list.id} />
    </Paper>
  );
};

export default ListUI;
