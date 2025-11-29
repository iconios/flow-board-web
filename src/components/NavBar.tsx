"use client";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
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
import Image from "next/image";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();
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
    router.push("/welcome");
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
        paddingY: 1,
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
          <Box aria-label="Nerdy logo" component={Link} href="/">
            <Image
              src="/logo.png"
              alt="FlowBoard Logo"
              height={40}
              width={200}
            />
          </Box>

          {/* Flexible Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Right Cluster: Boards and Login buttons */}
          {isMobile ? (
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
          ) : (
            /* Desktop View */
            <Box>
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
                  py: 1.5,
                }}
                onClick={user ? handleLogout : handleLogin}
              >
                {user.id ? "Logout" : "Login"}
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
