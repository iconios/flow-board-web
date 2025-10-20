import React from "react";
import { z } from "zod";

export const FormValuesSchema = z
  .object({
    email: z.email("Enter a valid email").nonempty("Email is required"),
    password: z
      .string("Enter your password")
      .min(8, "Password must be minimum 8 characters")
      .nonempty("Password is required")
      .refine((password) => /[A-Z]/.test(password), {
        message: "Must contain at least one uppercase letter (A-Z)",
      })
      .refine((password) => /[a-z]/.test(password), {
        message: "Must contain at least one lowercase letter (a-z)",
      })
      .refine((password) => /\d/.test(password), {
        message: "Must contain at least one number (0-9)",
      })
      .refine((password) => /[^A-Za-z0-9]/.test(password), {
        message: "Must contain at least one special character (!@#$%^&*, etc.)",
      }),
  })
  .strict();

export type FormValuesType = z.infer<typeof FormValuesSchema>;

export const RegisterFormValuesSchema = z.object({
  firstname: z
    .string("Enter your firstname")
    .min(2, "Minimum of two characters required")
    .nonempty("Firstname is required"),
  lastname: z
    .string("Enter your lastname")
    .min(2, "Minimum of two characters required")
    .nonempty("Lastname is required"),
  email: z.email("Enter a valid email").nonempty("Email is required"),
  password: z
    .string("Enter your password")
    .min(8, "Password must be minimum 8 characters")
    .nonempty("Password is required")
    .refine((password) => /[A-Z]/.test(password), {
      message: "Must contain at least one uppercase letter (A-Z)",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "Must contain at least one lowercase letter (a-z)",
    })
    .refine((password) => /\d/.test(password), {
      message: "Must contain at least one number (0-9)",
    })
    .refine((password) => /[^A-Za-z0-9]/.test(password), {
      message: "Must contain at least one special character (!@#$%^&*, etc.)",
    }),
});

export type RegisterFormValuesType = z.infer<typeof RegisterFormValuesSchema>;

export const InviteToBoardSchema = RegisterFormValuesSchema.pick({
  email: true,
});

export type InviteToBoardType = z.infer<typeof InviteToBoardSchema>;

const TabsContentsSchema = z.object({
  login: React.Component,
  register: React.Component,
});

export type TabsContentsType = z.infer<typeof TabsContentsSchema>;

export const ForgotPasswordSchema = FormValuesSchema.pick({
  email: true,
});

export type ForgotPasswordType = z.infer<typeof ForgotPasswordSchema>;

export const BoardCardSchema = z.object({
  bg_color: z.string(),
  userName: z.string(),
  title: z
    .string("Title must be alphanumeric")
    .min(2, "Minimum two characters required")
    .nonempty("Title cannot be empty"),
  boardId: z.string(),
  boardUserId: z.string(),
});

export type BoardCardType = z.infer<typeof BoardCardSchema>;

export const CreateBoardUISchema = BoardCardSchema.omit({
  userName: true,
  boardId: true,
  boardUserId: true,
});

export type CreateBoardUIType = z.infer<typeof CreateBoardUISchema>;

const BoardsReadSchema = z.object({
  _id: z.string().optional(),
  title: z.string(),
  bg_color: z.string(),
  user_id: z.string(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
  lists: z.array(z.string()),
});

export type BoardsReadType = z.infer<typeof BoardsReadSchema>;

const SignUpAuthOutputSchema = z.object({
  message: z.string(),
});

export type SignUpAuthOutputType = z.infer<typeof SignUpAuthOutputSchema>;
export type DeleteBoardOutputType = z.infer<typeof SignUpAuthOutputSchema>;

const SignUpAuthServerResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export type SignUpAuthServerResponseType = z.infer<
  typeof SignUpAuthServerResponseSchema
>;

const LoginServerResponseSchema = SignUpAuthServerResponseSchema.extend({
  error: z.string().optional(),
  token: z.string().optional(),
  user: z
    .object({
      id: z.string(),
      email: z.string(),
      firstname: z.string(),
    })
});

export type LoginServerResponseType = z.infer<typeof LoginServerResponseSchema>;

const LoginAuthOutputSchema = z.object({
    id: z.string(),
    email: z.string(),
    firstname: z.string(),
});

export type LoginAuthOutputType = z.infer<typeof LoginAuthOutputSchema>;

const NotificationBarSchema = z.object({
  message: z.string(),
  messageType: z.string(),
});

export type NotificationBarType = z.infer<typeof NotificationBarSchema>;

const UserDataSchema = z.object({
  email: z.string(),
  firstname: z.string(),
  token: z.string(),
});

export type UserDataType = z.infer<typeof UserDataSchema>;

const BoardsSchema = z.object({
  _id: z.string(),
  bg_color: z.string(),
  title: z.string(),
  user: z.object({
    _id: z.string(),
    firstname: z.string(),
    email: z.string(),
  }),
  created_at: z.string(),
  updated_at: z.string(),
});

export type BoardsType = z.infer<typeof BoardsSchema>;

export const UserContextSchema = z.object({
  user: z.object({
    id: z.string(),
    email: z.string(),
    firstname: z.string(),
  }),
  LogIn: z.function({
    input: [z.string(), z.string(), z.string()],
    output: z.void(),
  }),
  LogOut: z.function({
    input: [],
    output: z.void(),
  }),
  isLoading: z.boolean(),
});

export type UserContextType = z.infer<typeof UserContextSchema>;
export type LogInType = z.infer<typeof UserContextSchema>["LogIn"];

const OnlyUserDataSchema = UserDataSchema.omit({
  token: true,
});

const OnlyUserTokenSchema = UserDataSchema.pick({
  token: true,
});

export type OnlyUserDataType = z.infer<typeof OnlyUserDataSchema>;

export type OnlyUserTokenType = z.infer<typeof OnlyUserTokenSchema>;

const GetBoardsServerResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  boards: z
    .array(
      z.object({
        _id: z.string(),
        title: z.string(),
        bg_color: z.string(),
        user: z.object({
          _id: z.string(),
          email: z.string(),
          firstname: z.string(),
        }),
        created_at: z.string(),
        updated_at: z.string(),
      }),
    )
    .optional(),
});

export type GetBoardsServerResponseType = z.infer<
  typeof GetBoardsServerResponseSchema
>;

const GetBoardsOutputSchema = z.object({
  message: z.string(),
  data: z.array(BoardsSchema),
});

export type GetBoardsOutputType = z.infer<typeof GetBoardsOutputSchema>;
export type BoardsForClient = z.infer<typeof GetBoardsOutputSchema>["data"];

const UpdateBoardServerResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  board: z
    .object({
      id: z.string(),
      title: z.string(),
      bg_color: z.string(),
    })
    .optional(),
});

export type UpdateBoardServerResponseType = z.infer<
  typeof UpdateBoardServerResponseSchema
>;

const DeleteBoardServerResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  boards: z
    .array(
      z.object({
        _id: z.string().optional(),
        title: z.string(),
        bg_color: z.string(),
        user_id: z.string(),
        created_at: z.iso.datetime(),
        updated_at: z.iso.datetime(),
        lists: z.array(z.string()),
      }),
    )
    .optional(),
});

export type DeleteBoardServerResponseType = z.infer<
  typeof DeleteBoardServerResponseSchema
>;

const CreateBoardServerResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  board: z.object({
    id: z.string(),
    title: z.string(),
    bg_color: z.string(),
    lists: z.array(z.string()),
  }),
});

export type CreateBoardServerResponseType = z.infer<
  typeof CreateBoardServerResponseSchema
>;

const UpdateBoardOutputSchema = z.object({
  boardId: z.string(),
  title: z.string(),
  bgColor: z.string(),
});

export type UpdateBoardOutputType = z.infer<typeof UpdateBoardOutputSchema>;

const UpdateObjectSchema = z.object({
  title: z.string().optional(),
  bg_color: z.string().optional(),
});

export type UpdateObjectType = z.infer<typeof UpdateObjectSchema>;

const EditBoardInputSchema = z.object({
  dialogOpen: z.boolean(),
  title: z.string(),
  bg_color: z.string(),
  boardId: z.string(),
  onClose: z.function(),
});

export type EditBoardInputType = z.infer<typeof EditBoardInputSchema>;

export const EditBoardInitialValuesSchema = z.object({
  bg_color: z.string(),
  title: z.string(),
});

export type EditBoardInitialValuesType = z.infer<
  typeof EditBoardInitialValuesSchema
>;

const DeleteBoardInputSchema = EditBoardInputSchema.omit({
  title: true,
  bg_color: true,
});

export type DeleteBoardInputType = z.infer<typeof DeleteBoardInputSchema>;

const GetListServerResponseSchema = z.object({
  message: z.string(),
  success: z.boolean(),
  lists: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        position: z.number(),
        status: z.string(),
        boardId: z.string(),
        tasks: z.array(
          z.object({
            _id: z.string(),
            description: z.string(),
            title: z.string(),
            dueDate: z.string(),
            priority: z.string(),
            position: z.number(),
            listId: z.string(),
          }),
        ),
      }),
    )
    .optional(),
});

const ListSchema = z.object({
  list: z.object({
    id: z.string(),
    title: z.string(),
    position: z.number(),
    status: z.string(),
    boardId: z.string(),
    tasks: z.array(
      z.object({
        _id: z.string(),
        description: z.string(),
        title: z.string(),
        dueDate: z.string(),
        priority: z.string(),
        position: z.number(),
        listId: z.string(),
      }),
    ),
  }),
});

export type GetListServerResponseType = z.infer<
  typeof GetListServerResponseSchema
>;
export type ListType = z.infer<typeof ListSchema>;

export type ListPageSearchParamsType = {
  t: string;
  bg: string;
  uid: string;
};

export const BoardMemberRoleSchema = z.object({
  role: z.string(),
});

export type BoardMemberRoleType = z.infer<typeof BoardMemberRoleSchema>;

const GetUserServerResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    id: z.string(),
    firstname: z.string(),
    email: z.string(),
  }),
});

export type GetUserServerResponseType = z.infer<
  typeof GetUserServerResponseSchema
>;
