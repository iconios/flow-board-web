import InAppFooter from "@/components/InAppFooter";
import InAppHeader from "@/components/InAppHeader";
import { SocketProvider } from "@/lib/socketProvider";
import { Box, Paper } from "@mui/material";

const BoardsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        justifyContent: { xs: "normal", md: "center" },
        alignItems: { xs: "normal", md: "center" },
        display: "flex",
        minHeight: "100vh",
        p: { xs: 0 },
      }}
    >
      <Paper
        sx={{
          borderRadius: 2,
          p: { xs: 0 },
          width: { xs: "100%", md: "70%" },
          display: "flex",
          flexDirection: "column",
          minHeight: { xs: "100vh", md: "auto" },
        }}
      >
        <InAppHeader title={"My Boards"} backView={false} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: { xs: "center", md: "flex-start" },
            alignItems: "center",
            flex: 1,
            minHeight: { xs: "calc(100vh - 64px)", md: "auto" },
            p: { xs: 0, sm: 4 },
          }}
        >
          <SocketProvider>{children}</SocketProvider>
        </Box>
        <InAppFooter xs={"100%"} sm={"80%"} md={"70%"} />
      </Paper>
    </Box>
  );
};

export default BoardsLayout;
