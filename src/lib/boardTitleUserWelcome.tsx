import { Paper, Typography, Box } from "@mui/material";
import { useUserContext } from "./user.context";

const BoardTitleUserWelcome = ({
  title,
  bgColor,
}: {
  title: string;
  bgColor: string;
}) => {
  const { user } = useUserContext();
  const decodedBg = decodeURIComponent(bgColor);
  return (
    <Paper
      sx={{
        bgcolor: { decodedBg },
        py: 1,
        px: 2,
        mb: 0.5,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        borderTopRightRadius: 1,
        borderTopLeftRadius: 1,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
      }}
    >
      {/* Board title for lists */}
      <Typography variant="h5" fontWeight={600}>
        {title}
      </Typography>
      {/* Board user welcome message */}
      <Box>
        <Typography variant="body1" fontWeight={600}>
          Hello {user.firstname}
        </Typography>
      </Box>
    </Paper>
  );
};

export default BoardTitleUserWelcome;
