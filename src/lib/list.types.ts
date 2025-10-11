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

export const EditListInputSchema = z.object({
  title: z.string().optional(),
  position: z.number().optional(),
  status: z.string().optional(),
  boardId: z.string(),
  listId: z.string(),
});

export type EditListInputType = z.infer<typeof EditListInputSchema>;

const EditListServerResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  list: z.object({
    id: z.string(),
    title: z.string(),
    position: z.number(),
    status: z.string(),
  }),
});

export type EditListServerResponseType = z.infer<
  typeof EditListServerResponseSchema
>;

const DeleteListServerResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  list: z.object({
    id: z.string(),
  }),
});

export type DeleteListServerResponseType = z.infer<
  typeof DeleteListServerResponseSchema
>;

export const DeleteListInputSchema = z.object({
  listId: z.string(),
  boardId: z.string(),
});

export type DeleteListInputType = z.infer<typeof DeleteListInputSchema>;

const EditListFormSchema = z.object({
  dialogOpen: z.boolean(),
  title: z.string(),
  position: z.number(),
  status: z.string(),
  boardId: z.string(),
  listId: z.string(),
  onClose: z.function(),
});

export type EditListFormType = z.infer<typeof EditListFormSchema>;

export const EditListInitialValuesSchema = EditListFormSchema.pick({
  title: true,
  position: true,
  status: true,
});

export type EditListInitialValuesType = z.infer<
  typeof EditListInitialValuesSchema
>;

export const DeleteListDialogInputSchema = DeleteListInputSchema.extend({
  onClose: z.function(),
  dialogOpen: z.boolean(),
});

export type DeleteListDialogInputType = z.infer<
  typeof DeleteListDialogInputSchema
>;
