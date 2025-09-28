import NavBar from "@/components/NavBar";
import { Container, Paper, Typography } from "@mui/material";

const TabsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container
      fixed
      sx={{ borderColor: "red", borderWidth: 2, borderStyle: "solid" }}
    >
      <Paper>
        <NavBar />
        <Typography variant="h2" align="center" sx={{ pt: 4 }}>
          Account Managment
        </Typography>
        {children}
      </Paper>
    </Container>
  );
};

export default TabsLayout;
