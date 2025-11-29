"use client";
import { createTheme, ThemeOptions } from "@mui/material/styles";
import { Inter } from "next/font/google";

// Load Inter font
const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

// Define color palette
const colors = {
  bg: "#ffffff",
  text: "#0F172A", // slate-900
  muted: "#E5E4E2", // slate-600
  border: "#e2e8f0", // slate-200
  primary: {
    main: "#5C3BFF", // indigo-600
    700: "#4338ca", // indigo-700
  },
  accent: {
    main: "#FF6D00", // violet-600
  },
  success: {
    main: "#059669", // emerald-600
  },
  light: "#f8fafc", // slate-50
  secondary: {
    main: "#28C4A9",
  },
  secondaryText: "#000000",
  error: "#dc2626", // red-600
  warning: "#d97706", // amber-600
  info: "#0284c7", // sky-600
};

// Typography configuration mapped from React Native Paper
const typography = {
  fontFamily: inter.style.fontFamily,
  displayLarge: {
    fontSize: "57px",
    lineHeight: "64px",
    letterSpacing: "-0.25px",
    fontWeight: 400,
  },
  displayMedium: {
    fontSize: "45px",
    lineHeight: "52px",
    letterSpacing: "0px",
    fontWeight: 400,
  },
  displaySmall: {
    fontSize: "36px",
    lineHeight: "44px",
    letterSpacing: "0px",
    fontWeight: 400,
  },
  headlineLarge: {
    fontSize: "32px",
    lineHeight: "40px",
    letterSpacing: "0px",
    fontWeight: 800,
  },
  headlineMedium: {
    fontSize: "28px",
    lineHeight: "36px",
    letterSpacing: "0px",
    fontWeight: 700,
  },
  headlineSmall: {
    fontSize: "18px",
    lineHeight: "28px",
    letterSpacing: "0px",
    fontWeight: 600,
  },
  titleLarge: {
    fontSize: "48px",
    lineHeight: "56px",
    letterSpacing: "0px",
    fontWeight: 600,
  },
  titleMedium: {
    fontSize: "42px",
    lineHeight: "44px",
    letterSpacing: "0.15px",
    fontWeight: 600,
  },
  titleSmall: {
    fontSize: "36px",
    lineHeight: "40px",
    letterSpacing: "0.1px",
    fontWeight: 600,
  },
  bodyLarge: {
    fontSize: "24px",
    lineHeight: "32px",
    letterSpacing: "0.5px",
    fontWeight: 400,
  },
  bodyMedium: {
    fontSize: "18px",
    lineHeight: "28px",
    letterSpacing: "0.25px",
    fontWeight: 400,
  },
  bodySmall: {
    fontSize: "16px",
    lineHeight: "20px",
    letterSpacing: "0.4px",
    fontWeight: 300,
  },
  labelLarge: {
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.1px",
    fontWeight: 500,
  },
  labelMedium: {
    fontSize: "12px",
    lineHeight: "16px",
    letterSpacing: "0.5px",
    fontWeight: 500,
  },
  labelSmall: {
    fontSize: "11px",
    lineHeight: "16px",
    letterSpacing: "0.5px",
    fontWeight: 500,
  },
};

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: typography.displayLarge,
    h2: typography.displayMedium,
    h3: typography.displaySmall,
    h4: typography.headlineLarge,
    h5: typography.headlineMedium,
    h6: typography.headlineSmall,
    subtitle1: typography.titleMedium,
    subtitle2: typography.titleSmall,
    body1: typography.bodyLarge,
    body2: typography.bodyMedium,
    caption: typography.bodySmall,
    button: typography.labelLarge,
    overline: typography.labelSmall,
  },
  palette: {
    primary: {
      main: colors.primary.main,
      dark: colors.primary[700],
    },
    secondary: {
      main: colors.secondary.main,
    },
    error: {
      main: colors.error,
    },
    warning: {
      main: colors.warning,
    },
    info: {
      main: colors.info,
    },
    success: {
      main: colors.success.main,
    },
    background: {
      default: colors.bg,
      paper: colors.bg,
    },
    text: {
      primary: colors.text,
      secondary: colors.secondaryText,
    },
    action: {
      disabled: colors.muted,
      disabledBackground: colors.muted,
    },
    divider: colors.border,
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none" as const,
          borderRadius: 1,
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 1,
          boxShadow:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.bg,
          color: colors.text,
          boxShadow: "none",
          borderBottom: `1px solid ${colors.border}`,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.bg,
          color: colors.text,
        },
      },
    },
    MuiTimeline: {
      styleOverrides: {
        root: {},
      },
    },
  },
} as ThemeOptions);

export default theme;
