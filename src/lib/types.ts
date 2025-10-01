import React from "react";
import { z } from "zod";

export const FormValuesSchema = z
  .object({
    email: z.email("Enter a valid email").nonempty("Email is required"),
    password: z
      .string("Enter your password")
      .min(8, "Password must be minimum 8 characters")
      .nonempty("Password is required"),
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
    .refine((password) => /[0-9]/.test(password), {
      message: "Must contain at least one number (0-9)",
    })
    .refine((password) => /[^A-Za-z0-9]/.test(password), {
      message: "Must contain at least one special character (!@#$%^&*, etc.)",
    }),
});

export type RegisterFormValuesType = z.infer<typeof RegisterFormValuesSchema>;

export const LinkTabProps = z.object({
  label: z.string().optional(),
  href: z.string().optional(),
  selected: z.string().optional(),
});

export type LinkTabPropsType = z.infer<typeof LinkTabProps>;

const TabsContentsSchema = z.object({
  login: React.Component,
  register: React.Component,
});

export type TabsContentsType = z.infer<typeof TabsContentsSchema>;

export const ForgotPasswordSchema = FormValuesSchema.pick({
  email: true,
});

export type ForgotPasswordType = z.infer<typeof ForgotPasswordSchema>;

export const BoardCardSchema = z
  .object({
    backgroundColor: z
      .string()
      .regex(/^#?([0-9a-fA-F]{6})$/, "Invalid 6-digit hex color code"),
    userName: z.string(),
    title: z
      .string("Title must be alphanumeric")
      .min(2, "Minimum two characters required")
      .nonempty("Title cannot be empty"),
  })
  .strict();

export type BoardCardType = z.infer<typeof BoardCardSchema>;

export const CreateBoardUISchema = BoardCardSchema.omit({
  userName: true,
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
  error: z.boolean(),
  message: z.string(),
});

export type SignUpAuthOutputType = z.infer<typeof SignUpAuthOutputSchema>;

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
      email: z.email(),
      firstname: z.string(),
    })
    .optional(),
});

export type LoginServerResponseType = z.infer<typeof LoginServerResponseSchema>;

const LoginAuthOutputSchema = SignUpAuthOutputSchema.extend({
  data: z
    .object({
      token: z.string(),
      user: z.object({
        email: z.email(),
        firstname: z.string(),
      }),
    })
    .optional(),
});

export type LoginAuthOutputType = z.infer<typeof LoginAuthOutputSchema>;
