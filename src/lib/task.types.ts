import { z } from "zod";

export const CreateTaskFormSchema = z.object({
  title: z
    .string("String of characters required")
    .min(2, "Minimum two characters required")
    .max(100, "Maximum of 100 characters allowed"),
  description: z
    .string("String of characters required")
    .max(512, "Maximum of 512 characters allowed"),
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
    listId: z.string(),
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

export const UpdateTaskInputSchema = z.object({
  listId: z.string(),
  taskId: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.string().optional(),
  position: z.number().optional(),
});

export type UpdateTaskInputType = z.infer<typeof UpdateTaskInputSchema>;

const UpdateTaskServerResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  task: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    priority: z.string(),
    dueDate: z.string(),
    position: z.number(),
  }),
});

export type UpdateTaskServerResponseType = z.infer<
  typeof UpdateTaskServerResponseSchema
>;

const UpdateTaskUISchema = z.object({
  title: z.string(),
  description: z.string(),
  dueDate: z.string(),
  priority: z.string(),
  position: z.number(),
});

export type UpdateTaskUIType = z.infer<typeof UpdateTaskUISchema>;

const DeleteTaskServerResponseSchema = UpdateTaskServerResponseSchema.pick({
  success: true,
  message: true,
});

export type DeleteTaskServerResponseType = z.infer<
  typeof DeleteTaskServerResponseSchema
>;

export const DeleteTaskInputSchema = z.object({
  taskId: z.string(),
  listId: z.string(),
});

export type DeleteTaskInputType = z.infer<typeof DeleteTaskInputSchema>;

const DeleteTaskFormInputSchema = DeleteTaskInputSchema.extend({
  onClose: z.function(),
  dialogOpen: z.boolean(),
  boardId: z.string(),
});

export type DeleteTaskFormInputType = z.infer<typeof DeleteTaskFormInputSchema>;

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  dueDate: z.string(),
  priority: z.string(),
  position: z.number(),
  listId: z.string(),
});

export type TaskType = z.infer<typeof TaskSchema>;
