"use client";
import { Box, Container, Typography, Stack } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "background.default",
        borderTop: "1px solid",
        borderColor: "divider",
        py: 3,
        mt: 4,
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 2, sm: 0 }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: { xs: "center", sm: "left" } }}
          >
            © {new Date().getFullYear()} Nerdy Flow Board
          </Typography>

          <Stack direction="row" spacing={3}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                "&:hover": { color: "primary.main", cursor: "pointer" },
              }}
            >
              Privacy
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                "&:hover": { color: "primary.main", cursor: "pointer" },
              }}
            >
              Terms
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                "&:hover": { color: "primary.main", cursor: "pointer" },
              }}
            >
              Contact
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
