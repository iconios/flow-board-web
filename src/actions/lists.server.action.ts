"use server";

import {
  CreateListInputSchema,
  CreateListInputType,
  CreateListServerResponseType,
  DeleteListInputSchema,
  DeleteListInputType,
  DeleteListServerResponseType,
  EditListInputSchema,
  EditListInputType,
  EditListServerResponseType,
} from "@/lib/list.types";
import { GetListServerResponseType } from "@/lib/types";
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

// Fetch List(s) for a Board Server Action
const GetListsServerAction = async (boardId: string) => {
  const token = (await cookies()).get("token")?.value ?? "";
  validateServerUrlAndToken(token);
  try {
    const response = await fetch(`${SERVER_BASE_URL}/list/${boardId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["list", `list:${boardId}`],
      },
    });

    const result: GetListServerResponseType = await response.json();
    console.log("Lists from server action", result);

    if (!result.success || !response.ok) {
      throw new Error(`${result.message}`);
    }

    return result.lists ?? [];
  } catch (error) {
    console.error("Error fetching lists", error);

    throw new Error("Error fetching lists");
  }
};

// Create a List for a Board Server Action
const CreateListServerAction = async (createListInput: CreateListInputType) => {
  const token = (await cookies()).get("token")?.value ?? "";
  validateServerUrlAndToken(token);

  try {
    const { boardId, ...newListData } =
      CreateListInputSchema.parse(createListInput);

    const response = await fetch(`${SERVER_BASE_URL}/list/${boardId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newListData),
    });

    const result: CreateListServerResponseType = await response.json();
    console.log("Lists from server action", result);

    if (!result.success || !response.ok) {
      throw new Error(`${result.message}`);
    }

    revalidateTag("list");
    revalidateTag(`list:${boardId}`);

    return result.list;
  } catch (error) {
    console.error("Error creating list", error);

    if (error instanceof ZodError) {
      throw new Error("Error validating list input");
    }

    throw new Error("Error creating list");
  }
};

// Edit a List Server Action
const EditListServerAction = async (editListInput: EditListInputType) => {
  const token = (await cookies()).get("token")?.value ?? "";
  validateServerUrlAndToken(token);

  try {
    const { listId, boardId, ...editListData } =
      EditListInputSchema.parse(editListInput);
    const response = await fetch(`${SERVER_BASE_URL}/list/${listId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editListData),
    });

    const result: EditListServerResponseType = await response.json();
    console.log("Edited List from server action result", result);

    if (!result.success || !response.ok) {
      throw new Error(`${result.message}`);
    }

    revalidateTag("list");
    revalidateTag(`list:${boardId}`);
    return result.list;
  } catch (error) {
    console.error("Error editing list", error);

    if (error instanceof ZodError) {
      throw new Error("Error validating the edit list input");
    }

    throw new Error("Error editing list");
  }
};

// Delete a List Server Action
const DeleteListServerAction = async (deleteListInput: DeleteListInputType) => {
  const token = (await cookies()).get("token")?.value ?? "";
  validateServerUrlAndToken(token);

  try {
    const { listId, boardId } = DeleteListInputSchema.parse(deleteListInput);
    const response = await fetch(`${SERVER_BASE_URL}/list/${listId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result: DeleteListServerResponseType = await response.json();
    console.log("Deleted List from server action result", result);

    if (!result.success || !response.ok) {
      throw new Error(`${result.message}`);
    }

    revalidateTag("list");
    revalidateTag(`list:${boardId}`);
    return result.list;
  } catch (error) {
    console.error("Edit deleting list", error);

    if (error instanceof ZodError) {
      throw new Error("Error validating the delete list input");
    }

    throw new Error("Error deleting list");
  }
};

export {
  GetListsServerAction,
  CreateListServerAction,
  EditListServerAction,
  DeleteListServerAction,
};
