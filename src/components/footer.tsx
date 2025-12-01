"use client";
import { Box, Container, Typography, Stack } from "@mui/material";
import Link from "next/link";

const Footer = ({ xs, sm, md }: { xs: string; sm: string; md: string }) => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "background.default",
        borderTop: "1px solid",
        borderColor: "divider",
        py: 3,
        mt: 4,
        marginTop: 2,
        position: "fixed",
        bottom: 0,
        width: { xs, sm, md },
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 2, sm: 0 }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Link href={"/"} style={{ textDecoration: "none" }}>
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ textAlign: { xs: "center", sm: "left" } }}
            >
              © {new Date().getFullYear()} Nerdy Flow Board
            </Typography>
          </Link>

          <Stack direction="row" spacing={3}>
            <Link href={"/privacy"} style={{ textDecoration: "none" }}>
              <Typography
                variant="overline"
                color="text.secondary"
                sx={{
                  "&:hover": { color: "primary.main", cursor: "pointer" },
                }}
              >
                Privacy
              </Typography>
            </Link>
            <Link href={"/terms"} style={{ textDecoration: "none" }}>
              <Typography
                variant="overline"
                color="text.secondary"
                sx={{
                  "&:hover": { color: "primary.main", cursor: "pointer" },
                }}
              >
                Terms
              </Typography>
            </Link>
            <Link href={"/contact-us"} style={{ textDecoration: "none" }}>
              <Typography
                variant="overline"
                color="text.secondary"
                sx={{
                  "&:hover": { color: "primary.main", cursor: "pointer" },
                }}
              >
                Contact
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
