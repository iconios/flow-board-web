"use client";

import { Box, Skeleton, Stack } from "@mui/material";

const WelcomePageSkeleton = () => {
  return (
    <Box>
      <Stack direction="row">
        <Skeleton variant="text" width="calc(50% - 4px" />
        <Skeleton variant="text" width="calc(50% - 4px" />
      </Stack>
      <Stack direction="column">
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
      </Stack>
      <Skeleton variant="text" />
    </Box>
  );
};

export default WelcomePageSkeleton;
