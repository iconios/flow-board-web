import { Box, Skeleton, Stack } from "@mui/material";

const LoginTabSkeleton = () => {
  return (
    <Box>
      <Stack direction="column">
        <Skeleton variant="text" width="100%" style={{ fontSize: 36 }} />
        <Skeleton variant="text" width="100%" style={{ fontSize: 36 }} />
      </Stack>
      <Skeleton variant="text" width="100%" style={{ fontSize: 36 }} />
    </Box>
  );
};

export default LoginTabSkeleton;
