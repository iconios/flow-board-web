import { ListType } from "@/lib/types";
import { Box, Paper, Typography } from "@mui/material";
import TaskInListUI from "../task/taskInListUI";
import Link from "next/link";

const ListUI = ({ list} : ListType) => {
    return (
        <Paper>
            <Box>
                <Typography>{list.title}</Typography>
                <Box
                    minHeight={100}
                >
                    { list.tasks.map((task) => (
                        <Link href={`/my-task/${task._id}`} key={task._id} style={{ textDecoration: "none"}}>
                            <TaskInListUI title={task.title} key={task._id} />
                        </Link>
                    ))}
                </Box>
            </Box>
        </Paper>
    )
}

export default ListUI;