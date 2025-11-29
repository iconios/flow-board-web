"use client";

import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { forwardRef } from "react";

type FeaturesProps = {
  openFeatures: boolean;
};

const Features = forwardRef<HTMLElement, FeaturesProps>(
  ({ openFeatures }, ref) => {
    const theme = useTheme();

    const gridSize = { xs: 12, sm: 12, md: 4 };
    const gridStyle = {
      padding: 2,
      borderWidth: 1,
      borderStyle: "solid",
      borderRadius: 2,
      borderColor: "#DBDBDB",
    };
    const featureTitleStyle = { fontWeight: "400" };
    const svgBoxStyle = {
      width: 40,
      backgroundColor: "#F2F2F2",
      padding: 1,
      borderRadius: 1,
      marginBottom: 2,
    };

    if (!openFeatures) return null;

    return (
      <Box
        ref={ref}
        sx={{
          borderWidth: 1,
          borderStyle: "solid",
          borderRadius: 2,
          borderColor: "#DBDBDB",
          paddingY: 4,
          marginTop: 8,
          marginBottom: { sm: 2, lg: 12 },
        }}
      >
        <Box>
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            Features for growth
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              fontWeight: "200",
              paddingTop: 2,
              paddingX: { xs: 4, sm: 16, md: 32 },
            }}
          >
            FlowBoard enables real-time visual project management with
            customizable workflows that sync seamlessly across all devices.
          </Typography>
        </Box>
        <Grid
          container
          spacing={2}
          sx={{ marginTop: 4, paddingX: 2, marginBottom: 4 }}
        >
          <Grid size={gridSize} sx={gridStyle}>
            <Box sx={svgBoxStyle}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>bulletin-board</title>
                <path d="M12.04,2.5L9.53,5H14.53L12.04,2.5M4,7V20H20V7H4M12,0L17,5V5H20A2,2 0 0,1 22,7V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V7A2,2 0 0,1 4,5H7V5L12,0M7,18V14H12V18H7M14,17V10H18V17H14M6,12V9H11V12H6Z" />
              </svg>
            </Box>
            <Typography variant="body1" sx={featureTitleStyle}>
              Kanban Boards
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "200" }}>
              Visualize your workflow with customizable boards, lists, and cards
            </Typography>
          </Grid>
          <Grid size={gridSize} sx={gridStyle}>
            <Box sx={svgBoxStyle}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>sync</title>
                <path d="M12,18A6,6 0 0,1 6,12C6,11 6.25,10.03 6.7,9.2L5.24,7.74C4.46,8.97 4,10.43 4,12A8,8 0 0,0 12,20V23L16,19L12,15M12,4V1L8,5L12,9V6A6,6 0 0,1 18,12C18,13 17.75,13.97 17.3,14.8L18.76,16.26C19.54,15.03 20,13.57 20,12A8,8 0 0,0 12,4Z" />
              </svg>
            </Box>
            <Typography variant="body1" sx={featureTitleStyle}>
              Real-Time Sync
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "200" }}>
              See updates instantly—from moved tasks to new comments—as your
              team works together
            </Typography>
          </Grid>
          <Grid size={gridSize} sx={gridStyle}>
            <Box sx={svgBoxStyle}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>monitor-cellphone-star</title>
                <path d="M23,11H18A1,1 0 0,0 17,12V21A1,1 0 0,0 18,22H23A1,1 0 0,0 24,21V12A1,1 0 0,0 23,11M23,20H18V13H23V20M20,2H2C0.89,2 0,2.89 0,4V16A2,2 0 0,0 2,18H9V20H7V22H15V20H13V18H15V16H2V4H20V9H22V4C22,2.89 21.1,2 20,2M11.97,9L11,6L10.03,9H7L9.47,10.76L8.53,13.67L11,11.87L13.47,13.67L12.53,10.76L15,9H11.97Z" />
              </svg>
            </Box>
            <Typography variant="body1" sx={featureTitleStyle}>
              Cross-Platform
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "200" }}>
              Access and manage your projects seamlessly on desktop or mobile
            </Typography>
          </Grid>
        </Grid>
      </Box>
    );
  },
);

Features.displayName = "Features";

export default Features;
