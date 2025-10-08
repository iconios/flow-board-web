"use server";

import { GetListServerResponseType } from "@/lib/types";
import { cookies } from "next/headers";

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

export { GetListsServerAction };
