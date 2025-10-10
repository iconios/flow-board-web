// Container for each list

import { ListType } from "@/lib/types";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import TaskInListUI from "../task/taskInListUI";
import Link from "next/link";
import CreateTaskDialog from "../task/createTaskDialog";
import { Delete, Edit } from "@mui/icons-material";

const ListUI = ({ list }: ListType) => {
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
            <IconButton onClick={() => console.log("Edit button clicked")}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => console.log("Delete button clicked")}>
              <Delete />
            </IconButton>
          </Box>
        </Box>

        {/* Container for all tasks */}
        <Box minHeight={100}>
          {list.tasks.map((task) => (
            <Link
              href={`/my-task/${task._id}`}
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
