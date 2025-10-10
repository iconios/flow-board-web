"use server";

import {
  CreateListInputSchema,
  CreateListInputType,
  CreateListServerResponseType,
} from "@/lib/list.types";
import { GetListServerResponseType } from "@/lib/types";
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

// Fetch List(s) for a Board
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
        tags: [`list:${boardId}`, "list"],
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

// Create a List for a Board
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

    return result.list;
  } catch (error) {
    console.error("Error creating list", error);

    if (error instanceof ZodError) {
      throw new Error("Error validating list input");
    }

    throw new Error("Error creating list");
  }
};

export { GetListsServerAction, CreateListServerAction };
