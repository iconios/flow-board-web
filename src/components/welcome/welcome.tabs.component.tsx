"use client";

import { Box, Paper, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import LoginTabPanel from "./login.tab.component";
import RegisterTabPanel from "./register.tab.component";

const LoginRegisterTabs = () => {
  const [value, setValue] = useState<string>("login");

  const samePageLinkNavigation = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 || // ignore everything but left-click
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.shiftKey
    ) {
      return false;
    }
    return true;
  };

  // Create the tab change handler
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (
      event.type !== "click" ||
      (event.type === "click" &&
        samePageLinkNavigation(
          event as React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        ))
    ) {
      setValue(newValue);
    }
  };

  // Tab contents
  const tabContents: { [key: string]: React.JSX.Element } = {
    login: <LoginTabPanel />,
    register: <RegisterTabPanel />,
  };

  return (
    <Paper
      sx={{
        width: { xs: "100%", sm: "70%" },
        mx: { xs: 0, sm: "auto" },
        mb: 2,
        borderRadius: 2,
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs"
        aria-labelledby="navigation"
        centered
        variant="fullWidth"
      >
        <Tab value="login" label="Login" />
        <Tab value="register" label="Register" />
      </Tabs>

      <Box
        sx={{
          borderRadius: 2,
        }}
      >
        {tabContents[value]}
      </Box>
    </Paper>
  );
};

export default LoginRegisterTabs;
