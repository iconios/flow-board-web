"use client";

import { Box, Button, Container, Typography, Paper } from "@mui/material";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage = ({ error, reset }: Readonly<ErrorProps>) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error caught by error boundary:", error);
  }, [error]);

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
          gap: 3,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 600,
            borderRadius: 2,
          }}
        >
          {/* Error Icon/Emoji */}
          <Box
            sx={{
              fontSize: "4rem",
              mb: 2,
            }}
          >
            😵
          </Box>

          {/* Error Title */}
          <Typography variant="h4" component="h1" gutterBottom color="error">
            Something went wrong!
          </Typography>

          {/* Error Message - Fixed paragraph prop */}
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            We encountered an unexpected error. Please try again or contact
            support if the problem persists.
          </Typography>

          {/* Error Details (only in development) */}
          {process.env.NODE_ENV === "development" && (
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                mt: 2,
                mb: 3,
                backgroundColor: "grey.50",
                textAlign: "left",
                overflow: "auto",
                maxHeight: 200,
              }}
            >
              <Typography
                variant="caption"
                component="pre"
                sx={{ whiteSpace: "pre-wrap", fontSize: "0.75rem" }}
              >
                {error.message}
                {error.digest && `\nDigest: ${error.digest}`}
              </Typography>
            </Paper>
          )}

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              onClick={reset}
              size="large"
              sx={{ minWidth: 120 }}
            >
              Try Again
            </Button>

            <Button
              variant="outlined"
              onClick={() => (window.location.href = "/")}
              size="large"
              sx={{ minWidth: 120 }}
            >
              Go Home
            </Button>

            <Button
              variant="text"
              onClick={() => { window.location.reload(); }}
              size="large"
            >
              Reload Page
            </Button>
          </Box>
        </Paper>

        {/* Additional Help */}
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Need immediate assistance?{" "}
          <Button
            variant="text"
            size="small"
            onClick={() =>
              window.open("mailto:info@nerdywebconsults.ng", "_blank")
            }
          >
            Contact Support
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default ErrorPage;
