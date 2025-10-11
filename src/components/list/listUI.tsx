// Container for each list

import { ListType } from "@/lib/types";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import TaskInListUI from "../task/taskInListUI";
import Link from "next/link";
import CreateTaskDialog from "../task/createTaskDialog";
import { Delete, Edit } from "@mui/icons-material";
import { useState } from "react";
import EditListDialog from "./editListDialog";
import DeleteBListDialog from "./deleteListDialog";

const ListUI = ({ list }: ListType) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  return (
    // Container for each list
    <Paper
      sx={{
        mb: 2,
        width: { xs: "100%", md: "calc(32% - 8px)" },
        borderRadius: 0,
      }}
    >
      {/* Container for List title, all its tasks, and "Add new task" button */}
      <Box padding={2} bgcolor="#E5E4E2">
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
          {list.tasks.map((task) => (
            <Link
              href={`/my-task/${task._id}/list/${list.id}`}
              key={task._id}
              style={{ textDecoration: "none" }}
            >
              <TaskInListUI title={task.title} key={task._id} />
            </Link>
          ))}
        </Box>
      </Box>

      {/* Add new task button */}
      <CreateTaskDialog boardId={list.boardId} listId={list.id} />
    </Paper>
  );
};

export default ListUI;
