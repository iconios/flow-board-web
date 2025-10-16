import { z } from "zod";

export const CreateCommentInputSchema = z.object({
  taskId: z.string(),
  content: z.string(),
});

export type CreateCommentInputType = z.infer<typeof CreateCommentInputSchema>;

const CreateCommentServerResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  comment: z.object({
    id: z.string(),
    content: z.string(),
    userId: z.string(),
    taskId: z.string(),
    createdAt: z.string(),
  }),
});

export type CreateCommentServerResponseType = z.infer<
  typeof CreateCommentServerResponseSchema
>;

const GetCommentsServerResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  comments: z.array(
    z.object({
      id: z.string(),
      content: z.string(),
      userId: z.string(),
      taskId: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
    }),
  ),
});

export type GetCommentsServerResponseType = z.infer<
  typeof GetCommentsServerResponseSchema
>;

export const UpdateCommentInputSchema = z.object({
  commentId: z.string(),
  content: z.string(),
  taskId: z.string(),
});

export type UpdateCommentInputType = z.infer<typeof UpdateCommentInputSchema>;

const UpdateCommentServerResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  comment: z.object({
    id: z.string(),
    content: z.string(),
    taskId: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export type UpdateCommentServerResponseType = z.infer<
  typeof UpdateCommentServerResponseSchema
>;
export type CommentType = z.infer<
  typeof UpdateCommentServerResponseSchema
>["comment"];
const DeleteCommentServerResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export type DeleteCommentServerResponseType = z.infer<
  typeof DeleteCommentServerResponseSchema
>;

export const DeleteCommentInputSchema = z.object({
  commentId: z.string(),
  taskId: z.string(),
});

export type DeleteCommentInputType = z.infer<typeof DeleteCommentInputSchema>;

export const CommentContentSchema = z.object({
  content: z
    .string()
    .max(100, "100 characters is the maximum allowed")
    .min(2, "2 characters is the minimum allowed"),
});

export type CommentContentType = z.infer<typeof CommentContentSchema>;

const DeleteCommentDialogInputSchema = z.object({
  dialogOpen: z.boolean(),
  taskId: z.string(),
  commentId: z.string(),
  onClose: z.function(),
});

export type DeleteCommentDialogInputType = z.infer<
  typeof DeleteCommentDialogInputSchema
>;

const EditCommentFormSchema = z.object({
  dialogOpen: z.boolean(),
  content: z.string(),
  taskId: z.string(),
  commentId: z.string(),
  onClose: z.function(),
});

export type EditCommentFormType = z.infer<typeof EditCommentFormSchema>;
