"use client";

import { Button } from "@mui/material";
import Link from "next/link";
import { useUserContext } from "./user.context";

const WelcomeSignInButton = () => {
  const { user } = useUserContext();
  return (
    <Link href={user.id ? "/my-boards" : "/welcome"}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ maxWidth: "sm" }}
      >
        {user.id ? "Go to My Boards" : "Get Started / Sign In"}
      </Button>
    </Link>
  );
};

export default WelcomeSignInButton;
