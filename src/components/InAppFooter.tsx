"use client";

import { AccountCircle, Dashboard } from "@mui/icons-material";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const InAppFooter = ({
  xs,
  sm,
  md,
}: {
  xs: string;
  sm: string;
  md: string;
}) => {
  const [value, setValue] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  // Sync the active tab with current route
  useEffect(() => {
    if (pathname === "/my-boards") {
      setValue(0);
    } else if (pathname === "/profile") {
      setValue(1);
    }
  }, [pathname]);

  const handleNavigation = (newValue: number, path: string) => {
    setValue(newValue);
    router.push(path);
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "background.default",
        borderTop: "1px solid",
        borderColor: "divider",
        py: 3,
        mt: 4,
        marginTop: 2,
        position: "fixed",
        bottom: 0,
        width: { xs, sm, md },
        zIndex: 1300,
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Boards"
          icon={<Dashboard />}
          onClick={() => handleNavigation(0, "/my-boards")}
        />
        <BottomNavigationAction
          label="Profile"
          icon={<AccountCircle />}
          onClick={() => handleNavigation(1, "/profile")}
        />
      </BottomNavigation>
    </Box>
  );
};

export default InAppFooter;
