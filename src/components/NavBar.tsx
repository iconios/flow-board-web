"use client";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    // TODO: wire up navigation or auth logic
    console.log("Login clicked");
    handleMenuClose();
  };

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        backgroundColor: "white",
        color: "text.primary",
      }}
    >
      <Container maxWidth="xl" disableGutters>
        <Toolbar
          sx={{
            minHeight: { xs: 56, sm: 64 },
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {/* Left Cluster: Nerdy Logo + Title */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            {/* Nerdy Logo (text-based) */}
            <Box
              aria-label="Nerdy logo"
              sx={{
                px: { xs: 1, sm: 1.25 },
                py: 0.5,
                borderRadius: 1,
                border: "1px solid",
                borderColor: "divider",
                fontWeight: 800,
                letterSpacing: 1,
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
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
                display: { xs: "none", sm: "block" },
                fontSize: { sm: "1.1rem", md: "1.25rem" },
              }}
            >
              Flow Board
            </Typography>
          </Stack>

          {/* Flexible Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Right Cluster: Login action */}
          {!isMobile ? (
            /* Desktop View */
            <Box>
              <Button
                variant="contained"
                size="medium"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  bgcolor: "primary.main",
                  ":hover": { bgcolor: "secondary.main" },
                  fontSize: { sm: "0.9rem", md: "1rem" },
                  px: 3,
                }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Box>
          ) : (
            /* Mobile View */
            <Box>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
                sx={{
                  color: "text.primary",
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogin}>Login</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
