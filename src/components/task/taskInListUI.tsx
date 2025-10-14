// Component for each Task in List

import { Delete } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import DeleteTaskDialog from "./deleteTaskDialog";
import { useState } from "react";

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

  const handleCloseDialog = () => {
    setOpen(false);
  };
  return (
    <>
      {/* Container for the delete icon */}
      <Box
        bgcolor="#ffffff"
        padding={2}
        margin={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
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
