import NavBar from "@/components/NavBar";
import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const ForgotPasswordLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        p: { xs: 0 },
      }}
    >
      <Paper
        sx={{
          borderRadius: 2,
          p: { xs: 0 },
          width: { xs: "100%", md: "70%" },
          display: "flex",
          flexDirection: "column",
          minHeight: { xs: "100vh", md: "auto" },
        }}
      >
        <NavBar />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            py: { xs: 1, sm: 3 },
            px: { xs: 1, sm: 3 },
          }}
        >
          <Typography
            variant="h6"
            align="center"
            sx={{
              mb: 3, // Consistent margin bottom instead of py
              fontWeight: "bold",
              width: "100%",
            }}
          >
            Forgot Password
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {children}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ForgotPasswordLayout;
