"use server";

import {
  CreateTaskFormType,
  CreateTaskInputSchema,
  CreateTaskInputType,
  CreateTaskServerResponseType,
  DeleteTaskInputSchema,
  DeleteTaskInputType,
  DeleteTaskServerResponseType,
  GetTasksServerResponseType,
  UpdateTaskInputSchema,
  UpdateTaskInputType,
  UpdateTaskServerResponseType,
} from "@/lib/task.types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { ZodError } from "zod";

const SERVER_BASE_URL = process.env.SERVER_BASE_URL;

const validateServerUrlAndToken = (token: string) => {
  if (!SERVER_BASE_URL) {
    throw new Error("Server Url is required");
  }

  if (!token) {
    throw new Error("Not authenticated");
  }
};

// Create a Task for a List
const CreateTasksServerAction = async (
  createTaskInput: CreateTaskInputType,
) => {
  const token = (await cookies()).get("token")?.value ?? "";
  validateServerUrlAndToken(token);

  try {
    const validatedInput = CreateTaskInputSchema.parse(createTaskInput);
    const { listId, boardId, ...newTaskInput } = validatedInput;
    const response = await fetch(`${SERVER_BASE_URL}/task/${listId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTaskInput),
    });

    const result: CreateTaskServerResponseType = await response.json();
    console.log("Tasks from server action", result);

    if (!result.success || !response.ok) {
      throw new Error(`${result.message}`);
    }

    revalidateTag("task");
    revalidateTag(`task:${listId}`);

    return result.task;
  } catch (error) {
    console.error("Error creating tasks", error);

    if (error instanceof ZodError) {
      throw new Error("Error validating new task input");
    }

    if (error instanceof Error) throw error;

    throw new Error("Error creating tasks");
  }
};

// Read Tasks Server Action
const GetTasksServerAction = async (listId: string) => {
  const token = (await cookies()).get("token")?.value ?? "";
  validateServerUrlAndToken(token);

  try {
    const response = await fetch(`${SERVER_BASE_URL}/task/${listId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["task", `task:${listId}`],
      },
    });

    const result: GetTasksServerResponseType = await response.json();
    console.log("Tasks from server action", result);

    if (!result.success || !response.ok) {
      throw new Error(`${result.message}`);
    }

    return result.tasks ?? [];
  } catch (error) {
    console.error("Error fetching tasks", error);

    if (error instanceof Error) throw error;

    throw new Error("Error fetching tasks");
  }
};

// Update a Task Server Action
const UpdateTaskServerAction = async (updateTaskInput: UpdateTaskInputType) => {
  const token = (await cookies()).get("token")?.value ?? "";
  validateServerUrlAndToken(token);

  try {
    const { taskId, listId, ...updateTaskData } =
      UpdateTaskInputSchema.parse(updateTaskInput);
    const response = await fetch(`${SERVER_BASE_URL}/task/${taskId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateTaskData),
    });

    const result: UpdateTaskServerResponseType = await response.json();
    console.log("Result from update server action", result);

    if (!result.success || !response.ok) {
      console.error("Error from update task action", result.message);
      throw new Error(`${result.message}`);
    }

    revalidateTag("task");
    revalidateTag(`task:${listId}`);
    return result.task;
  } catch (error) {
    console.error("Error updating task", error);

    if (error instanceof ZodError) {
      throw new Error("Error validating update task data");
    }

    if (error instanceof Error) throw error;

    throw new Error("Error updating task");
  }
};

// Delete a Task Server Action
const DeleteTaskServerAction = async (deleteTaskData: DeleteTaskInputType) => {
  const token = (await cookies()).get("token")?.value ?? "";
  validateServerUrlAndToken(token);

  try {
    const { taskId, listId } = DeleteTaskInputSchema.parse(deleteTaskData);
    console.log("Task id received", taskId);
    const response = await fetch(`${SERVER_BASE_URL}/task/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result: DeleteTaskServerResponseType = await response.json();
    console.log("Result from delete server action", result);

    if (!result.success || !response.ok) {
      throw new Error(`${result.message}`);
    }

    revalidateTag("task");
    revalidateTag(`task:${listId}`);
    return result.message;
  } catch (error) {
    console.error("Error deleting task", error);

    if (error instanceof ZodError) {
      throw new Error("Error validating delete task data");
    }

    if (error instanceof Error) throw error;

    throw new Error("Error deleting task");
  }
};

export {
  CreateTasksServerAction,
  GetTasksServerAction,
  UpdateTaskServerAction,
  DeleteTaskServerAction,
};
