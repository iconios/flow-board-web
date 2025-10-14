import { CommentType } from "@/lib/comment.types";
import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";

const CommentContent = ({ comment }: { comment: CommentType }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          mt: 2,
          mb: -2
        }}
      >
        <Typography >{comment.content}</Typography>
        <Box>
          <IconButton onClick={() => console.log("Edit button clicked")}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => console.log("Delete button clicked")}>
            <Delete />
          </IconButton>
        </Box>
      </Box>
      <Typography variant="subtitle2">
            {comment.updatedAt ? `Updated at: ${comment.updatedAt}` : ""}
        </Typography>
    </>
  );
};

export default CommentContent;
