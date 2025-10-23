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
import Link from "next/link";
import { useUserContext } from "@/lib/user.context";

const NavBar = () => {
  const { user, LogOut } = useUserContext();
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
    console.log("Login clicked");
    handleMenuClose();
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    handleMenuClose();
    LogOut();
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
              component={Link}
              href="/"
              sx={{
                px: { xs: 1, sm: 1.25 },
                py: 0.5,
                borderRadius: 1,
                border: "1px solid",
                borderColor: "divider",
                fontWeight: 800,
                letterSpacing: 1,
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
                textDecoration: "none",
              }}
            >
              NERDY
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

          {/* Right Cluster: Boards and Login buttons */}
          {!isMobile ? (
            /* Desktop View */
            <Box>
              <Stack direction="row" spacing={2}>
                <Box
                  display={user.id ? "block" : "none"}
                  component={Link}
                  href="/my-boards"
                >
                  <Button
                    size="small"
                    sx={{
                      color: "primary.contrastText",
                      textTransform: "none",
                      fontWeight: 600,
                      bgcolor: "primary.main",
                      ":hover": { bgcolor: "primary.dark" },
                      fontSize: { sm: "0.9rem", md: "1rem" },
                      px: 3,
                    }}
                  >
                    Boards
                  </Button>
                </Box>
                <Box component={Link} href="/welcome">
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      textTransform: "none",
                      fontWeight: 600,
                      bgcolor: "primary.main",
                      ":hover": { bgcolor: "primary.dark" },
                      fontSize: { sm: "0.9rem", md: "1rem" },
                      px: 3,
                    }}
                    onClick={user ? handleLogout : handleLogin}
                  >
                    {user.id ? "Logout" : "Login"}
                  </Button>
                </Box>
              </Stack>
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
                slotProps={{
                  paper: {
                    sx: {
                      mt: 1,
                      minWidth: 120,
                    },
                  },
                }}
              >
                <MenuItem
                  sx={{ p: 0, display: user.id ? "block" : "none", mb: 0.5 }}
                  LinkComponent={Link}
                  href="/my-boards"
                >
                  <Button
                    variant="text"
                    sx={{
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      ":hover": { bgcolor: "primary.dark" },
                      m: 0,
                      width: "100%",
                    }}
                  >
                    Boards
                  </Button>
                </MenuItem>
                <MenuItem
                  onClick={user.id ? handleLogout : handleLogin}
                  sx={{ p: 0 }}
                  LinkComponent={Link}
                  href="/welcome"
                >
                  <Button
                    sx={{
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      ":hover": { bgcolor: "primary.dark" },
                      m: 0,
                      width: "100%",
                    }}
                  >
                    {user.id ? "Logout" : "Login"}
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
