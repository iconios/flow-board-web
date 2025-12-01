"use client";
import {
  AppBar,
  Container,
  Toolbar,
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUserContext } from "@/lib/user.context";

const InAppHeader = ({
  title,
  backRoute,
  backView,
}: {
  title: string;
  backRoute?: string;
  backView: boolean;
}) => {
  const [userDetails, setUserDetails] = useState<string>("");
  const { user } = useUserContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (user.id) {
      setUserDetails(user.id);
    }
  }, [user.id]);
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
          {/* Left Cluster: Back Arrow */}
          <Box
            aria-label="Nerdy logo"
            component={Link}
            href={backRoute ?? "/"}
            display={backView ? "block" : "none"}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="back button"
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>

          {/* Flexible Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Change title view if user details exists */}
          {!userDetails && !isMobile ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <Image
                src={"/logo.png"}
                alt={"FlowBoard Logo"}
                height={40}
                width={200}
              />
              <Typography variant="h5" sx={{ ml: 2, pt: 0.8 }}>
                {title}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                {title}
              </Typography>
            </Box>
          )}

          {/* Flexible Spacer */}
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default InAppHeader;
