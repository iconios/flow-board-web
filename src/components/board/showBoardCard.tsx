import { BoardCardType } from "@/lib/types";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";

const BoardCard = ({ backgroundColor, userName, title }: BoardCardType) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card>
      <CardMedia
        sx={{
          height: 100,
          backgroundColor: `${backgroundColor}`,
        }}
      />
      <CardContent>
        <Box>
          <Typography>{title}</Typography>
          <Typography>{userName}</Typography>
        </Box>
        <Box>
          <IconButton onClick={handleMoreClick}>
            <MoreVert />
          </IconButton>
        </Box>
      </CardContent>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
      >
        <MenuItem>
          <Edit>Edit board</Edit>
        </MenuItem>
        <MenuItem>
          <Delete>Delete board</Delete>
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default BoardCard;
