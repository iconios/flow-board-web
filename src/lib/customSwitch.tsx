import React from "react";
import { Switch, styled, SwitchProps } from "@mui/material";

type CustomSwitchSize = "small" | "medium" | "large" | "xlarge";

interface CustomSizeSwitchProps extends Omit<SwitchProps, "size"> {
  switchSize?: CustomSwitchSize; // Use different prop name to avoid conflict
}

interface SizeConfig {
  width: number;
  height: number;
  thumb: number;
  translateX: number;
}

const CustomSizeSwitch = styled(Switch, {
  shouldForwardProp: (prop) => prop !== "switchSize",
})<CustomSizeSwitchProps>(({ theme, switchSize = "medium" }) => {
  const sizes: Record<CustomSwitchSize, SizeConfig> = {
    small: {
      width: 40,
      height: 24,
      thumb: 16,
      translateX: 20,
    },
    medium: {
      width: 75,
      height: 38,
      thumb: 24,
      translateX: 38,
    },
    large: {
      width: 68,
      height: 44,
      thumb: 30,
      translateX: 24,
    },
    xlarge: {
      width: 80,
      height: 50,
      thumb: 36,
      translateX: 48,
    },
  };

  const config = sizes[switchSize];

  return {
    width: config.width,
    height: config.height,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: (config.height - config.thumb) / 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: `translateX(${config.translateX}px)`,
        "& + .MuiSwitch-track": {
          backgroundColor: theme.palette.primary.main,
          opacity: 1,
          border: 0,
        },
        "& .MuiSwitch-thumb": {
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: config.thumb,
      height: config.thumb,
      backgroundColor: theme.palette.common.white,
      boxShadow: "0 2px 4px 0 rgba(0,0,0,0.2)",
    },
    "& .MuiSwitch-track": {
      borderRadius: config.height / 2,
      backgroundColor: theme.palette.grey[400],
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  };
});

export default CustomSizeSwitch;
