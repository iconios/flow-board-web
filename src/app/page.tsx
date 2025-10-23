import Footer from "@/components/footer";
import NavBar from "@/components/NavBar";
import WelcomeSignInButton from "@/lib/welcomeSign-inButton";
import { Box, Chip, Container, Typography } from "@mui/material";
import React from "react";

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4, bgcolor: "#ffffff" }}>
      <NavBar />
      <Typography variant="h2" align="center" sx={{ pt: 4, mx: "auto" }}>
        Welcome to FlowBoard
      </Typography>
      <Typography variant="body1" sx={{ pb: 3 }}>
        Welcome to FlowBoard, your new hub for seamless team collaboration and
        project management.
      </Typography>
      <Box sx={{ pb: 2 }}>
        <Typography style={{ fontWeight: 600 }} variant="h6" sx={{ pb: 1 }}>
          What You Can Do -{" "}
        </Typography>
        <Box>
          <Chip
            size="small"
            color="primary"
            variant="outlined"
            label="Kanban Boards"
            sx={{ mr: 1 }}
          />
          Visualize your workflow with customizable boards, lists, and cards.
        </Box>
        <Box>
          <Chip
            size="small"
            color="primary"
            variant="outlined"
            label="Real-Time Sync"
            sx={{ mr: 1 }}
          />
          See updates instantly—from moved tasks to new comments—as your team
          works together.
        </Box>
        <Box>
          <Chip
            size="small"
            color="primary"
            variant="outlined"
            label="Cross-Platform"
            sx={{ mr: 1 }}
          />
          Access and manage your projects seamlessly on desktop or mobile.
        </Box>
      </Box>
      <Box sx={{ pb: 2 }}>
        <Typography style={{ fontWeight: 600 }} variant="h6" sx={{ pb: 1 }}>
          Perfect For -
        </Typography>
        <Chip
          size="small"
          variant="outlined"
          label="Agile Sprints"
          sx={{ mr: 1, px: 1 }}
        />
        <Chip
          size="small"
          variant="outlined"
          label="Campaign Tracking"
          sx={{ mr: 1, px: 1 }}
        />
        <Chip
          size="small"
          variant="outlined"
          label="Personal Tasks"
          sx={{ mr: 1, px: 1 }}
        />
        <Chip
          size="small"
          variant="outlined"
          label="Team Brainstorming"
          sx={{ mr: 1, px: 1 }}
        />
      </Box>
      <Typography>Ready to organize your workflow?</Typography>
      <WelcomeSignInButton />
      <Typography sx={{ mt: 2 }}>
        We're excited to see how you bring your projects to life. Happy
        organizing! — The FlowBoard Team
      </Typography>
      <Footer />
    </Container>
  );
};

export default Home;
