import { Box, Card, CardContent, CardMedia, Skeleton } from "@mui/material";
import Grid from "@mui/system/Grid";

const BoardPageSkeleton = () => {
  const items = [1, 2, 3];
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
        {items.map((item) => (
          <Grid size={{ xs: 4, sm: 4, md: 4 }} key={item}>
            <Card
              sx={{
                height: 150,
                minHeight: { xs: 140, sm: 180 },
                mb: 2,
                minWidth: { xs: 100, sm: 200 },
              }}
            >
              {/* Color Header */}
              <CardMedia>
                <Skeleton
                  variant="rectangular"
                  sx={{
                    height: { xs: 50, sm: 80 },
                    minWidth: { xs: 100, sm: 200 },
                  }}
                />
              </CardMedia>

              {/* Content Area */}
              <CardContent
                sx={{ p: { xs: 1.5, sm: 2 }, minWidth: { xs: 100, sm: 200 } }}
              >
                <Box>
                  <Skeleton
                    variant="text"
                    sx={{ width: "100%", fontSize: 24 }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ width: "60%", fontSize: 16 }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BoardPageSkeleton;
