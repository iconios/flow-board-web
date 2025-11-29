import Footer from "@/components/footer";
import NavBar from "@/components/NavBar";
import { Box, Paper, Typography } from "@mui/material";

const TabsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        justifyContent: { xs: "normal", md: "center" },
        alignItems: { xs: "normal", md: "center" },
        display: "flex",
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
            justifyContent: { xs: "center", md: "flex-start" },
            alignItems: "center",
            flex: 1,
            minHeight: { xs: "calc(100vh - 64px)", md: "auto" },
            p: { xs: 0 },
          }}
        >
          <Typography
            variant="h5"
            align="center"
            sx={{ py: { xs: 1, sm: 4 }, fontWeight: "bold" }}
          >
            Account Managment
          </Typography>
          {children}
        </Box>
        <Footer xs={"100%"} sm={"100%"} md={"70%"} />
      </Paper>
    </Box>
  );
};

export default TabsLayout;
