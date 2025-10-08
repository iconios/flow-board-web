import { Box, Typography } from "@mui/material";

const TaskInListUI = ({ title }: { title: string}) => {
    return (
        <Box>
            <Typography>
                {title}
            </Typography>
        </Box>
    )
}

export default TaskInListUI;