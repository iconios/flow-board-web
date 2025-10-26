import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Skeleton,
} from "@mui/material";

const BoardPageSkeleton = () => {
  return (
    <Container maxWidth="xs">
      <Card
        sx={{
          height: 150,
          minHeight: { xs: 140, sm: 180 },
          flexShrink: 0,
          flexBasis: {
            xs: "100%",
            sm: "calc(50% - 8px)",
            md: "calc(33.333% - 4px)",
            lg: "calc(23% - 2px)",
          },
          mb: 2
        }}
      >
        {/* Color Header */}
        <CardMedia
          sx={{
            flexShrink: 0,
          }}
        >
          <Skeleton variant="rectangular" sx={{ height: { xs: 50, sm: 80 } }} />
        </CardMedia>

        {/* Content Area */}
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            p: { xs: 1.5, sm: 2 },
          }}
        >
          {/* Text Content */}
          <Box
            sx={{
              minWidth: 0, // Enables text truncation
            }}
          >
            <Skeleton
              variant="text"
              sx={{
                width: "100%",
                fontSize: 24,
              }}
            />
            <Skeleton
              variant="text"
              sx={{
                width: "60%",
                fontSize: 16,
              }}
            />
          </Box>
        </CardContent>
      </Card>
      <Card
        sx={{
          height: 150,
          minHeight: { xs: 140, sm: 180 },
          flexShrink: 0,
          flexBasis: {
            xs: "100%",
            sm: "calc(50% - 8px)",
            md: "calc(33.333% - 4px)",
            lg: "calc(23% - 2px)",
          },
        }}
      >
        {/* Color Header */}
        <CardMedia
          sx={{
            flexShrink: 0,
          }}
        >
          <Skeleton variant="rectangular" sx={{ height: { xs: 50, sm: 80 } }} />
        </CardMedia>

        {/* Content Area */}
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            p: { xs: 1.5, sm: 2 },
          }}
        >
          {/* Text Content */}
          <Box
            sx={{
              minWidth: 0, // Enables text truncation
            }}
          >
            <Skeleton
              variant="text"
              sx={{
                width: "100%",
                fontSize: 24,
              }}
            />
            <Skeleton
              variant="text"
              sx={{
                width: "60%",
                fontSize: 16,
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BoardPageSkeleton;
