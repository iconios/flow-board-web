"use client";

import WelcomeSignInButton from "@/lib/welcomeSign-inButton";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Banner = ({ setFeatures }: { setFeatures: () => void }) => {
  const theme = useTheme();
  return (
    <Box
      component="section"
      sx={{
        flex: 1,
        paddingTop: { xs: 8, sm: 16 },
        paddingX: { xs: 4, sm: 8, md: 24 },
      }}
    >
      <Typography variant="h3" sx={{ textAlign: "center", fontWeight: "500" }}>
        Your hub for{" "}
        <Typography
          component="span"
          sx={{
            ...theme.typography.h1,
            color: theme.palette.primary.main,
            fontWeight: "700",
          }}
        >
          seamless
        </Typography>{" "}
        team collaboration and project management
      </Typography>
      <Typography
        sx={{
          ...theme.typography.h6,
          textAlign: "center",
          fontWeight: "200",
          paddingTop: 2,
        }}
      >
        Streamline your team's workflow today across all devices
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          marginTop: 2,
        }}
      >
        <WelcomeSignInButton />
        <Button
          color="primary"
          size="large"
          disableElevation={false}
          sx={{
            minWidth: "sm",
            borderWidth: 1,
            borderStyle: "solid",
            ":hover": { color: theme.palette.primary.dark },
            paddingX: 2,
          }}
          onClick={() => setFeatures()}
        >
          Learn More
        </Button>
      </Box>
    </Box>
  );
};

export default Banner;
