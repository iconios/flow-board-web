// Container for each list

import { ListType } from "@/lib/types";
import { Box, Paper, Typography } from "@mui/material";
import TaskInListUI from "../task/taskInListUI";
import Link from "next/link";
import CreateTaskDialog from "../task/createTaskDialog";

const ListUI = ({ list }: ListType) => {
  return (
    // Container for each list
    <Paper
      sx={{
        mb: 2,
        borderRadius: 1,
      }}
    >
      {/* Container for List title, all its tasks, and "Add new task" button */}
      <Box padding={2} bgcolor="#E5E4E2" borderRadius={1}>
        <Typography variant="h6">{list.title}</Typography>

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
      <CreateTaskDialog />
    </Paper>
  );
};

export default ListUI;
