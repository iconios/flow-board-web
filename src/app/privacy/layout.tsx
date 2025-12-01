"use client";

import Footer from "@/components/footer";
import InAppFooter from "@/components/InAppFooter";
import InAppHeader from "@/components/InAppHeader";
import { useUserContext } from "@/lib/user.context";
import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";

const PrivacyLayout = ({ children }: { children: React.ReactNode }) => {
  const [userDetails, setUserDetails] = useState<string>("");
  const { user } = useUserContext();

  useEffect(() => {
    if (user.id) {
      setUserDetails(user.id);
    }
  }, [user]);

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 10 } }}>
      <InAppHeader
        title={"Privacy Policy"}
        backView={true}
        backRoute={userDetails ? "/profile" : "/welcome"}
      />
      {children}
      {userDetails ? (
        <InAppFooter xs={"100%"} sm={"90%"} md={"90%"} />
      ) : (
        <Footer xs={"100%"} sm={"90%"} md={"90%"} />
      )}
    </Container>
  );
};

export default PrivacyLayout;
