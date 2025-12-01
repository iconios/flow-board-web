import { Container, Box, Stack, Skeleton } from "@mui/material";

const TaskPageSkeleton = () => {
  return (
    <Container>
      <Box>
        <Stack direction="column" spacing={2} sx={{ mb: 2, mt: 8 }}>
          <Skeleton variant="rectangular" width="100%" height={48} />
          <Skeleton variant="rectangular" width="100%" height={96} />
          <Skeleton variant="rectangular" width="100%" height={48} />
          <Skeleton variant="rectangular" width="100%" height={48} />
          <Skeleton variant="rectangular" width="100%" height={48} />
        </Stack>
      </Box>
    </Container>
  );
};

export default TaskPageSkeleton;
