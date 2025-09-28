"use client";

import { LinkTabPropsType, LinkTabProps } from "@/lib/types";
import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";

const LoginRegisterTabs = () => {
  const [value, setValue] = useState(0);

  const LinkTab = ({ label, href, selected }: LinkTabPropsType) => {
    return <Tab LinkComponent="a" {...LinkTabProps} />;
  };

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
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
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

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs"
        aria-labelledby="navigation"
      >
        <LinkTab label="Login" href="/login" />
        <LinkTab label="Register" href="#" />
      </Tabs>
    </Box>
  );
};

export default LoginRegisterTabs;
