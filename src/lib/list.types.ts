import { z } from "zod";

export const CreateListFormSchema = z.object({
  title: z.string(),
  position: z.number(),
  status: z.enum(["active", "archive"]),
});

export type CreateListFormType = z.infer<typeof CreateListFormSchema>;

export const CreateListInputSchema = CreateListFormSchema.extend({
  boardId: z.string(),
});

export type CreateListInputType = z.infer<typeof CreateListInputSchema>;

const CreateListServerResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  list: z.object({
    id: z.string(),
    title: z.string(),
    position: z.number(),
    status: z.string(),
    boardId: z.string(),
  }),
});

export type CreateListServerResponseType = z.infer<
  typeof CreateListServerResponseSchema
>;

const CreateListComponentInputSchema = z.object({
  boardId: z.string(),
  open: z.boolean(),
  onClose: z.function(),
});

export type CreateListComponentInputType = z.infer<
  typeof CreateListComponentInputSchema
>;
