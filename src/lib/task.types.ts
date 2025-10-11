import { z } from "zod";

export const CreateTaskFormSchema = z.object({
  title: z
    .string("String of characters required")
    .min(2, "Minimum two characters required")
    .max(100, "Maximum of 100 characters allowed"),
  description: z
    .string("String of characters required")
    .max(255, "Maximum of 100 characters allowed"),
  dueDate: z.string(),
  priority: z.enum(["low", "medium", "high", "critical"]),
  position: z.number("Only numeric character allowed"),
});

export type CreateTaskFormType = z.infer<typeof CreateTaskFormSchema>;

const GetTasksServerResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  tasks: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      dueDate: z.string(),
      priority: z.string(),
      position: z.number(),
    }),
  ),
});

export type GetTasksServerResponseType = z.infer<
  typeof GetTasksServerResponseSchema
>;

const CreateTaskServerResponseScehma = z.object({
  success: z.boolean(),
  message: z.string(),
  task: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    dueDate: z.string(),
    priority: z.string(),
    position: z.number(),
  }),
});

export type CreateTaskServerResponseType = z.infer<
  typeof CreateTaskServerResponseScehma
>;

export const CreateTaskInputSchema = CreateTaskFormSchema.extend({
  listId: z.string(),
  boardId: z.string(),
});

export type CreateTaskInputType = z.infer<typeof CreateTaskInputSchema>;
