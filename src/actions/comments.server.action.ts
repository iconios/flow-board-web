"use server";

import {
  CreateCommentInputSchema,
  CreateCommentInputType,
  CreateCommentServerResponseType,
  DeleteCommentInputSchema,
  DeleteCommentInputType,
  DeleteCommentServerResponseType,
  GetCommentsServerResponseType,
  UpdateCommentInputSchema,
  UpdateCommentInputType,
  UpdateCommentServerResponseType,
} from "@/lib/comment.types";
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

// Create a Comment for a Task
const CreateCommentServerAction = async (
  createCommentInput: CreateCommentInputType,
) => {
  const token = (await cookies()).get("token")?.value ?? "";
  validateServerUrlAndToken(token);

  try {
    const { taskId, content } =
      CreateCommentInputSchema.parse(createCommentInput);
    const response = await fetch(`${SERVER_BASE_URL}/comment/${taskId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    const result: CreateCommentServerResponseType = await response.json();
    console.log("Comment from server action", result);

    if (!result.success || !response.ok) {
      throw new Error(`${result.message}`);
    }

    revalidateTag("comments");
    revalidateTag(`comments:${taskId}`);

    return result.comment;
  } catch (error) {
    console.error("Error creating comment", error);

    if (error instanceof ZodError) {
      throw new Error("Error validating create comment data");
    }

    if (error instanceof Error) throw error;

    throw new Error("Error creating comment");
  }
};

// Get the Comments for a Task
const GetCommentsServerAction = async (taskId: string) => {
  const token = (await cookies()).get("token")?.value ?? "";
  validateServerUrlAndToken(token);

  try {
    const response = await fetch(`${SERVER_BASE_URL}/comment/${taskId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["comments", `comments:${taskId}`],
      },
    });

    const result: GetCommentsServerResponseType = await response.json();
    console.log("Result from getCommentServerAction", result);

    if (!result.success || !response.ok) {
      throw new Error(`${result.message}`);
    }

    return result.comments ?? [];
  } catch (error) {
    console.error("Error fetching comments", error);

    if (error instanceof Error) throw error;

    throw new Error("Error fetching comment");
  }
};

// Update Comment on Task
const UpdateCommentServerAction = async (
  updateCommentInput: UpdateCommentInputType,
) => {
  const token = (await cookies()).get("token")?.value ?? "";
  validateServerUrlAndToken(token);

  try {
    const { commentId, content, taskId } =
      UpdateCommentInputSchema.parse(updateCommentInput);
    const response = await fetch(`${SERVER_BASE_URL}/comment/${commentId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    const result: UpdateCommentServerResponseType = await response.json();
    console.log("Result from UpdateCommentServerAction", result);

    if (!result.success || !response.ok) {
      throw new Error(`${result.message}`);
    }

    revalidateTag("comments");
    revalidateTag(`comments:${taskId}`);

    return result.comment;
  } catch (error) {
    console.error("Error updating comment", error);

    if (error instanceof ZodError) {
      throw new Error("Error validating update comment data");
    }

    if (error instanceof Error) throw error;

    throw new Error("Error updating comment");
  }
};

// Delete a Comment from a Task
const DeleteCommentServerAction = async (
  deleteCommentInput: DeleteCommentInputType,
) => {
  const token = (await cookies()).get("token")?.value ?? "";
  validateServerUrlAndToken(token);

  try {
    const { taskId, commentId } =
      DeleteCommentInputSchema.parse(deleteCommentInput);
    const response = await fetch(`${SERVER_BASE_URL}/comment/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result: DeleteCommentServerResponseType = await response.json();
    console.log("Result from DeleteCommentServerAction", result);

    if (!result.success || !response.ok) {
      throw new Error(`${result.message}`);
    }

    revalidateTag("comments");
    revalidateTag(`comments:${taskId}`);

    return result.message;
  } catch (error) {
    console.error("Error deleting comment", error);

    if (error instanceof ZodError) {
      throw new Error("Error validating delete comment data");
    }

    if (error instanceof Error) throw error;

    throw new Error("Error deleting comment");
  }
};

export {
  GetCommentsServerAction,
  CreateCommentServerAction,
  UpdateCommentServerAction,
  DeleteCommentServerAction,
};
