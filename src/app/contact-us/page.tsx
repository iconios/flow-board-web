"use client"

import { Phone } from "@mui/icons-material";
import { useTheme, Box, CSSProperties, Grid, Link, Paper, Typography } from "@mui/material";

const ContactPage = () => {
  const theme = useTheme();
  const gridSize = { xs: 12, sm: 12, md: 4 };
  const gridStyle: CSSProperties = {
    padding: 2,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 2,
    borderColor: "#DBDBDB",
  };
  const contactTitleStyle = { fontWeight: "400" };
  const svgBoxStyle = {
    width: 40,
    backgroundColor: "#F2F2F2",
    padding: 1,
    borderRadius: 1,
    marginBottom: 2,
  };
  return (
    <Box sx={{ py: 2, mb: { xs: 16, sm: 12 } }}>
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          fontWeight: "200",
          paddingY: 2,
          paddingX: { xs: 4, sm: 16, md: 32 },
        }}
      >
        If you have any inquiries, get in touch with us. We will be happy to
        help you{" "}
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Grid
          container
          spacing={2}
          sx={{ marginTop: 4, paddingX: 2, marginBottom: 4 }}
        >
          <Grid size={gridSize} sx={gridStyle}>
            <Box sx={{ mb: 2}}>
              <svg
                width="46"
                height="46"
                viewBox="0 0 46 46"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0"
                  y="0"
                  width="46"
                  height="46"
                  rx="8"
                  fill="#4F46E5"
                />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#FFFFFF"
                  fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                  fontSize="26"
                  fontWeight="600"
                >
                  N
                </text>
              </svg>
            </Box>
            <Typography variant="body1" sx={contactTitleStyle}>
              Nerdy Web Consults
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "200" }}>
              A dynamic web development agency for Africa's startups and SMEs.
            </Typography>
          </Grid>
          <Grid size={gridSize} sx={gridStyle}>
            <Box sx={svgBoxStyle}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>office-building</title>
                <path d="M5,3V21H11V17.5H13V21H19V3H5M7,5H9V7H7V5M11,5H13V7H11V5M15,5H17V7H15V5M7,9H9V11H7V9M11,9H13V11H11V9M15,9H17V11H15V9M7,13H9V15H7V13M11,13H13V15H11V13M15,13H17V15H15V13M7,17H9V19H7V17M15,17H17V19H15V17Z" />
              </svg>
            </Box>
            <Typography variant="body1" sx={contactTitleStyle}>
              Head Office Address
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "200" }}>
              #7, Olayiwola Street, Off Charity Road, Oko-Oba, Lagos, Nigeria
            </Typography>
          </Grid>
          <Grid size={gridSize} sx={gridStyle}>
            <Box sx={svgBoxStyle}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>card-account-mail</title>
                <path d="M21,8V7L18,9L15,7V8L18,10M22,3H2A2,2 0 0,0 0,5V19A2,2 0 0,0 2,21H22A2,2 0 0,0 24,19V5A2,2 0 0,0 22,3M8,6A3,3 0 0,1 11,9A3,3 0 0,1 8,12A3,3 0 0,1 5,9A3,3 0 0,1 8,6M14,18H2V17C2,15 6,13.9 8,13.9C10,13.9 14,15 14,17M22,12H14V6H22" />
              </svg>
            </Box>
            <Typography variant="body1" sx={contactTitleStyle}>
              Contact
            </Typography>
            <Link href="tel:2348038399414" underline="hover" sx={{display: "inline-flex", alignItems: "center", textDecoration: "none", color: theme.palette.text.primary, ...theme.typography.body2, fontWeight: "200"}}>
             Phone: +234 803 839 9414
            </Link>
            <Typography variant="body2" sx={{ fontWeight: "200" }}>
              Email: info@nerdywebconsults.ng
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "200" }}>
              Website: https://nerdywebconsults.ng
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ContactPage;
