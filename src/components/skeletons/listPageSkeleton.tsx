import { Box, Paper, Stack, Skeleton } from "@mui/material";

const ListPageSkeleton = () => {
  return (
    <Box padding={{ xs: 2 }}>
      {/* Container for Board title and user welcome message */}
      <Paper
        sx={{
          py: 1,
          px: 2,
          mb: 0.5,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          borderTopRightRadius: 1,
          borderTopLeftRadius: 1,
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
        }}
      >
        {/* Board title for lists */}
        <Skeleton variant="text" sx={{ fontSize: 48 }} />
        {/* Board user welcome message */}
        <Box>
          <Skeleton variant="text" sx={{ fontSize: 48 }} />
        </Box>
      </Paper>

      {/* Container for "Add new list" and "Invite to Board" buttons */}
      <Box padding={2}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
        >
          <Skeleton
            variant="rectangular"
            sx={{ width: { xs: "100%", sm: "90px", md: "120px" } }}
            height={100}
          />
          <Skeleton
            variant="rectangular"
            sx={{ width: { xs: "100%", sm: "90px", md: "120px" } }}
            height={100}
          />
        </Stack>
      </Box>

      {/* Create new List Dialog Box */}
      <Skeleton sx={{ fontSize: 48 }} />

      {/* Container to display all the Lists in a Board */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-evenly",
        }}
      >
        <Skeleton
          variant="rectangular"
          height={400}
          sx={{ width: { xs: "100%" } }}
        />
      </Box>
    </Box>
  );
};

export default ListPageSkeleton;
