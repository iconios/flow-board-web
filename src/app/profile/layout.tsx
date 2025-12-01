"use client";

import InAppFooter from "@/components/InAppFooter";
import InAppHeader from "@/components/InAppHeader";
import { Container } from "@mui/material";
import React from "react";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <InAppHeader title={"Profile"} backView={false} />
      {children}
      <InAppFooter xs={"100%"} sm={"100%"} md={"100%"} />
    </Container>
  );
};

export default ProfileLayout;
