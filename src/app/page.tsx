"use client";
import Footer from "@/components/footer";
import Banner from "@/components/index/banner";
import Features from "@/components/index/features";
import NavBar from "@/components/NavBar";
import { Container, useMediaQuery } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Timelines from "@/components/index/timeline";

const Home = () => {
  const theme = useTheme();
  const [openFeatures, setOpenFeatures] = useState(false);
  const featureRef = useRef<HTMLDivElement | null>(null);

  // Handler for scrolling to a point on the page
  const scrollToTarget = () => {
    featureRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    if (openFeatures) {
      scrollToTarget();
    }
  }, [openFeatures]);

  const handleSetFeatures = () => {
    setOpenFeatures(true);
  };

  // Check tablet breakpoint
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));
  if (isTablet) {
    console.log("Tablet mode");
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        bgcolor: "#ffffff",
        minHeight: "100vh",
        flex: 1,
      }}
    >
      <NavBar />
      <Banner setFeatures={handleSetFeatures} />
      <Features openFeatures={openFeatures} ref={featureRef} />
      <Footer xs={"100%"} sm={"90%"} md={"90%"} />
    </Container>
  );
};

export default Home;
