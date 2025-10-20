// Each board display

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
  useTheme,
  useMediaQuery,
  Container,
  Link,
} from "@mui/material";
import { useState } from "react";
import EditBoardDialogBox from "./editBoardDialogBox";
import DeleteBoardDialogBox from "./deleteBoardDialogBox";
import { useUserContext } from "@/lib/user.context";

const BoardCard = ({ bg_color, userName, title, boardId, boardUserId }: BoardCardType) => {
  // 1. Initialize the variables or constants
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { user } = useUserContext();

  // Handler for the Vertical More button click
  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handler for Menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handler to close dialog box
  const handleCloseDialog = () => {
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
  };

  // Handler for Edit button click
  const handleEditClick = () => {
    setOpenEditDialog(true);
    handleMenuClose();
  };

  // Handler for Delete button click
  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
    handleMenuClose();
  };

  const encodedBg = encodeURIComponent(bg_color);
  return (
    // Container for each Board card
    <Container maxWidth="xs">
      <Card
        sx={{
          height: 150,
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: theme.shadows[4],
          },
          minHeight: isMobile ? 140 : 160,
          border: "2px solid red",
          flexShrink: 0,
          flexBasis: {
            xs: "100%",
            sm: "calc(50% - 8px)",
            md: "calc(33.333% - 4px)",
            lg: "calc(23% - 2px)",
          },
        }}
      >
        {/* Color Header */}
        <Link
          href={`/my-lists/${boardId}?t=${title}&bg=${encodedBg}&uid=${boardUserId}`}
          key={boardId}
          style={{ textDecoration: "none" }}
        >
          <CardMedia
            sx={{
              height: isMobile ? 50 : 80,
              backgroundColor: bg_color,
              flexShrink: 0,
            }}
          />
        </Link>

        {/* Content Area */}
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            p: isMobile ? 1.5 : 2,
            "&:last-child": {
              pb: isMobile ? 1.5 : 2,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexGrow: 1,
              gap: 1,
            }}
          >
            {/* Text Content */}
            <Link
              href={`/my-lists/${boardId}?t=${title}&bg=${encodedBg}&uid=${boardUserId}`}
              key={boardId}
              style={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  minWidth: 0, // Enables text truncation
                }}
              >
                <Typography
                  variant={isMobile ? "subtitle2" : "subtitle1"}
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    mb: 0.5,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    lineHeight: 1.2,
                  }}
                >
                  {title}
                </Typography>
                <Typography
                  variant={isMobile ? "caption" : "body2"}
                  color="text.secondary"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    lineHeight: 1.2,
                  }}
                >
                  {userName}
                </Typography>
              </Box>
            </Link>

            {/* Menu Button */}
            <Box sx={{ flexShrink: 0, ml: 1 }}>
              <IconButton
                onClick={handleMoreClick}
                size={isMobile ? "small" : "medium"}
                sx={{
                  padding: isMobile ? "4px" : "8px",
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <MoreVert fontSize={isMobile ? "small" : "medium"} />
              </IconButton>
            </Box>
          </Box>
        </CardContent>

        {/* Menu */}
        <Menu
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          slotProps={{
            paper: {
              sx: {
                mt: 1,
                minWidth: isMobile ? 120 : 140,
              },
            },
          }}
        >
          <MenuItem
            onClick={handleEditClick}
            sx={{
              py: isMobile ? 1 : 1.5,
              fontSize: isMobile ? "0.875rem" : "1rem",
            }}
          >
            <Edit
              sx={{
                fontSize: isMobile ? "1rem" : "1.25rem",
                mr: 1.5,
                color: "text.secondary",
              }}
            />
            Edit board
          </MenuItem>
          <MenuItem
            onClick={handleDeleteClick}
            sx={{
              py: isMobile ? 1 : 1.5,
              fontSize: isMobile ? "0.875rem" : "1rem",
              color: "error.main",
            }}
          >
            <Delete
              sx={{
                fontSize: isMobile ? "1rem" : "1.25rem",
                mr: 1.5,
                color: "error.main",
              }}
            />
            Delete board
          </MenuItem>
        </Menu>
      </Card>
      <EditBoardDialogBox
        dialogOpen={openEditDialog}
        title={title}
        bg_color={bg_color}
        boardId={boardId}
        onClose={handleCloseDialog}
      />
      <DeleteBoardDialogBox
        dialogOpen={openDeleteDialog}
        boardId={boardId}
        onClose={handleCloseDialog}
      />
    </Container>
  );
};

export default BoardCard;
