"use client";

import ProfileBody from "@/components/profile/profile.body";
import ProfileHeader from "@/components/profile/profile.header";
import { useUserContext } from "@/lib/user.context";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProfilePage = () => {
  // Initialize the variables and constants
  const router = useRouter();
  const { user } = useUserContext();

  useEffect(() => {
    if (!user.id) {
      router.replace("/welcome");
    }
  }, [user.id, router]);

  if (!user.id) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ px: 2, mb: 20 }}>
      <ProfileHeader />
      <ProfileBody />
    </Container>
  );
};

export default ProfilePage;
