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

export const RegisterFormValuesSchema = z
  .object({
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
      .nonempty("Password is required"),
  })
  .strict();

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
