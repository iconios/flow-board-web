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

export const LinkTabProps = z.object({
  label: z.string().optional(),
  href: z.string().optional(),
  selected: z.string().optional(),
});

export type LinkTabPropsType = z.infer<typeof LinkTabProps>;
