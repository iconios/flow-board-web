"use client";

import { useUserContext } from "@/lib/user.context";
import { Avatar, Box, Paper, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const ProfileHeader = () => {
  const theme = useTheme();
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const { user } = useUserContext();
  useEffect(() => {
    const setUser = () => {
      if (!user) return;
      setFirstname(user.firstname);
      setEmail(user.email);
    };
    setUser();
  }, [user]);
  const firstAlphabet = firstname[0];
  return (
    <Paper
      elevation={4}
      sx={{
        py: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        border: "1px gray solid",
      }}
    >
      <Avatar
        sx={{
          width: 80,
          height: 80,
          backgroundColor: "gray",
          color: "white",
          ...theme.typography.h1,
          mb: 2,
        }}
      >
        {firstAlphabet}
      </Avatar>
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        {firstname}
      </Typography>
      <Typography variant="body2" sx={{ fontSize: 14 }}>
        {email}
      </Typography>
    </Paper>
  );
};

export default ProfileHeader;
