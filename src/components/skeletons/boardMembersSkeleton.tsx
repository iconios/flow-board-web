import { Box, ListItemAvatar, Skeleton, Stack } from "@mui/material";

const BoardMembersSkeleton = () => {
  return (
    <Box sx={{ pb: 2, pl: 0 }}>
      <Stack direction="column">
        <Stack direction="row" paddingBottom={2}>
          <ListItemAvatar>
            <Skeleton variant="circular" />
          </ListItemAvatar>
          <Skeleton variant="rectangular" height={36} width={120} />
        </Stack>
        <Stack direction="row">
          <Skeleton variant="rectangular" height={36} width={120} />
          <Skeleton variant="rectangular" height={36} width={120} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default BoardMembersSkeleton;
