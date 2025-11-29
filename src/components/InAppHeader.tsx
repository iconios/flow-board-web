"use client";
import {
  AppBar,
  Container,
  Toolbar,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const InAppHeader = ({
  title,
  backRoute,
  backView,
}: {
  title: string;
  backRoute?: string;
  backView: boolean;
}) => {
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
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5" align="center">
              {title}
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default InAppHeader;
