// Component for each board member UI
import { MemberType } from "@/lib/member.types";
import { BoardMemberRoleType, BoardMemberRoleSchema } from "@/lib/types";
import { Remove } from "@mui/icons-material";
import {
  ListItem,
  Stack,
  ListItemAvatar,
  Avatar,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
  useTheme,
} from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import { useState } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import RemoveMemberDialog from "./removeMemberDialog";
import { useUserContext } from "@/lib/user.context";

const MemberUI = ({ member }: MemberType) => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = useUserContext();

  const firstAlphabet = member.user.firstname[0];
  const initialValues = {
    role: member.role,
  };

  const handleRole = (
    values: BoardMemberRoleType,
    { setSubmitting, resetForm }: FormikHelpers<BoardMemberRoleType>,
  ) => {
    console.log("values:", values);
    formik.setFieldValue("email", "");
    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(BoardMemberRoleSchema),
    onSubmit: handleRole,
  });

  if (!member) return <p>Nothing to render!</p>;

  return (
    <>
      <ListItem sx={{ pb: 2, pl: 0 }}>
        <Stack direction="column">
          <Stack direction="row" paddingBottom={2}>
            <ListItemAvatar>
              <Avatar>{firstAlphabet}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={member.user.firstname}
              sx={{
                "& .MuiListItemText-primary": {
                  ...theme.typography.body2,
                },
              }}
            />
          </Stack>
          <form>
            <Stack direction="row">
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ ...theme.typography.body2 }}
                >
                  Role
                </InputLabel>
                <Select
                  type="text"
                  label="Role"
                  id="role"
                  name="role"
                  variant="outlined"
                  size="small"
                  slotProps={{
                    input: {
                      sx: {
                        ...theme.typography.body2,
                      },
                    },
                  }}
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.role && Boolean(formik.errors.role)}
                  disabled={user.id !== member.boardOwnerUserId}
                >
                  <MenuItem value="member" sx={{ ...theme.typography.body2 }}>
                    Member
                  </MenuItem>
                  <MenuItem value="admin" sx={{ ...theme.typography.body2 }}>
                    Admin
                  </MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="text"
                onClick={() => setOpenDialog(true)}
                sx={{
                  ml: 2,
                  display:
                    user.id === member.boardOwnerUserId ? "block" : "none",
                }}
              >
                Remove
              </Button>
            </Stack>
            <RemoveMemberDialog
              memberName={member.user.firstname}
              dialogOpen={openDialog}
              onClose={() => setOpenDialog(false)}
              memberId={member.memberId}
              boardId={member.boardId}
            />
          </form>
        </Stack>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default MemberUI;
