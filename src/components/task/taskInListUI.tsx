import { Box, Typography } from "@mui/material";

const TaskInListUI = ({ title }: { title: string }) => {
  return (
    <Box bgcolor="#ffffff" padding={2} margin={2} borderRadius={1}>
      <Typography variant="h6" color="info">
        {title}
      </Typography>
    </Box>
  );
};

export default TaskInListUI;
