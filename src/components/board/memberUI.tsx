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
} from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";

const MemberUI = ({ member }: MemberType) => {
  if (!member) return <p>Nothing to render!</p>;
  console.log("Member detail to render", member);

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

  return (
    <>
      <ListItem sx={{ pb: 2, pl: 0 }}>
        <Stack direction="column">
          <Stack direction="row" paddingBottom={2}>
            <ListItemAvatar>
              <Avatar>{firstAlphabet}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={member.user.firstname}></ListItemText>
          </Stack>
          <form>
            <Stack direction="row">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  type="text"
                  label="Role"
                  id="role"
                  name="role"
                  variant="outlined"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.role && Boolean(formik.errors.role)}
                >
                  <MenuItem value="member">Member</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="text"
                startIcon={<Remove />}
                onClick={() => console.log("Remove button clicked")}
                sx={{ ml: 2 }}
              >
                Remove
              </Button>
            </Stack>
          </form>
        </Stack>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default MemberUI;
