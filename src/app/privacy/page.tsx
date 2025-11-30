"use client";
import { Alert, Box, CircularProgress } from "@mui/material";
import { useState } from "react";

const PrivacyPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLoad = () => {
    setLoading(false);
    setError(null);
  };

  const handleError = () => {
    setLoading(false);
    setError("Failed to load content");
  };

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box>
        {loading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "background.paper",
              zIndex: 1,
            }}
          >
            <CircularProgress />
          </Box>
        )}

        <iframe
          title="WebView"
          src="https://nerdywebconsults.ng/privacy"
          height="100%"
          style={{ border: 0, height: "100vh" }}
          onLoad={handleLoad}
          onError={handleError}
          width="100%"
        />
      </Box>
    </Box>
  );
};

export default PrivacyPage;
