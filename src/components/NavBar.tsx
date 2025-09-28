/*
#Plan: The navbar must meet the following requirements
1. Responsiveness
2. Have Nerdy Logo
3. White background
4. Have a Login action button at the end of the screen
5. Have a title - Nerdy Flow Board
*/

"use client";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Stack,
} from "@mui/material";

const NavBar = () => {
  return (
    <AppBar position="sticky" elevation={1}>
      <Container maxWidth="lg" disableGutters>
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
          {/* Left Cluster: Nerdy Logo + Title */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            {/* Nerdy Logo (text-based) */}
            <Box
              aria-label="Nerdy logo"
              sx={{
                px: 1.25,
                py: 0.5,
                borderRadius: 1,
                border: "1px solid",
                borderColor: "divider",
                fontWeight: 800,
                letterSpacing: 1,
                fontFamily: "monospace",
              }}
            >
              Nerdy
            </Box>

            {/* Title: Nerdy Flow Board */}
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 700,
                display: "block",
                fontSize: { xs: "0.95rem", sm: "1.1rem" },
              }}
            >
              Nerdy Flow Board
            </Typography>
          </Stack>

          {/* Flexible Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Right Cluster: Login action */}
          <Box>
            <Button
              variant="contained"
              size="medium"
              sx={{
                textTransform: "none",
                fontWeight: 600,
                bgcolor: "primary.main",
                ":hover": { bgcolor: "secondary.main" },
              }}
              onClick={() => {
                // TODO: wire up navigation or auth logic
                console.log("Login clicked");
              }}
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
