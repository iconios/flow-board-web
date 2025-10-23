// Component for each Task in List

import { Delete } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import DeleteTaskDialog from "./deleteTaskDialog";
import { CSSProperties, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TaskInListUI = ({
  title,
  taskId,
  listId,
  boardId,
}: {
  title: string;
  taskId: string;
  listId: string;
  boardId: string;
}) => {
  const [open, setOpen] = useState(false);

  // useSortable hook for draggable task in list
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: taskId });

  // CSS styles for the drag animation
  const style: CSSProperties = {
    transform:
      CSS.Transform.toString(transform) + (isDragging ? " scale(1.02)" : ""),
    transition,
    opacity: isDragging ? "0.5" : 1,
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  return (
    <>
      {/* Container for each Task in List */}
      <Box
        ref={setNodeRef}
        component="div"
        bgcolor="#ffffff"
        padding={2}
        margin={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
        style={style}
        {...attributes}
        {...listeners}
      >
        <Link
          href={`/my-task/${taskId}/list/${listId}`}
          style={{ textDecoration: "none", flexGrow: 1 }}
        >
          <Typography variant="h6" color="info">
            {title}
          </Typography>
        </Link>
        <IconButton onClick={() => setOpen(true)}>
          <Delete />
        </IconButton>
      </Box>
      <DeleteTaskDialog
        taskId={taskId}
        listId={listId}
        onClose={handleCloseDialog}
        dialogOpen={open}
        boardId={boardId}
      />
    </>
  );
};

export default TaskInListUI;
