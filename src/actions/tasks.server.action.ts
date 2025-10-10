"use server";

import {
  CreateTaskFormType,
  CreateTaskInputSchema,
  GetTasksServerResponseType,
} from "@/lib/types";
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
const CreateTasksServerAction = async (createTaskInput: CreateTaskFormType) => {
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

    const result: GetTasksServerResponseType = await response.json();
    console.log("Tasks from server action", result);

    if (!result.success || !response.ok) {
      throw new Error(`${result.message}`);
    }

    revalidateTag(`list:${boardId}`);

    return result.tasks ?? [];
  } catch (error) {
    console.error("Error fetching tasks", error);

    if (error instanceof ZodError) {
      throw new Error("Error validating new task input");
    }

    throw new Error("Error fetching tasks");
  }
};

export { CreateTasksServerAction };
