import NavBar from "@/components/NavBar";
import { Container, Typography } from "@mui/material";
import React from "react";

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <NavBar />
      <Typography variant="h2" align="center" sx={{ pt: 4 }}>
        Welcome to Flow Board
      </Typography>
    </Container>
  );
};

export default Home;
