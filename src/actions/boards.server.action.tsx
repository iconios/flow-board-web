"use server";

import {
  CreateBoardServerResponseType,
  DeleteBoardOutputType,
  DeleteBoardServerResponseType,
  GetBoardsOutputType,
  GetBoardsServerResponseType,
  UpdateBoardOutputType,
  UpdateBoardServerResponseType,
  UpdateObjectType,
} from "@/lib/types";
import { revalidateTag } from "next/cache";
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

const GetBoardsServerAction = async (): Promise<GetBoardsOutputType> => {
  const token = (await cookies()).get("token")?.value ?? "";
  validateServerUrlAndToken(token);

  try {
    // 1. Get the board details of the user
    const response = await fetch(`${SERVER_BASE_URL}/board/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["board"],
      },
    });

    const result: GetBoardsServerResponseType = await response.json();
    console.log("Boards from server action", result);

    // 2. Return the result to the user
    if (!result.success) {
      throw new Error(`${result.message}`);
    }

    if (!result.boards) {
      throw new Error("No boards found");
    }

    const boardsArrayToReturn = result.boards.map((board) => ({
      boardId: board._id,
      bgColor: board.bg_color,
      user: {
        email: board.user_id.email,
        firstname: board.user_id.firstname,
      },
      title: board.title,
      createdAt: board.created_at,
      updatedAt: board.updated_at,
    }));

    console.log("Boards details for client", boardsArrayToReturn);
    return {
      data: boardsArrayToReturn,
    };
  } catch (error) {
    console.error("Error fetching board data", error);

    throw new Error("Network error. Please try again");
  }
};

const UpdateBoardServerAction = async (
  boardId: string,
  updateObject: UpdateObjectType,
): Promise<UpdateBoardOutputType> => {
  const token = (await cookies()).get("token")?.value ?? "";
  validateServerUrlAndToken(token);

  if (!boardId) {
    console.error("Board ID is required");
    throw new Error("Board ID is required");
  }

  try {
    // 1. Call the edit point API endpoint
    const response = await fetch(`${SERVER_BASE_URL}/board/${boardId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateObject),
    });

    console.log("Board edit returned", response);

    const result: UpdateBoardServerResponseType = await response.json();

    // 2. Send the result to the user
    if (!result.success) {
      throw new Error(`${result.message}`);
    }

    if (!result.board) {
      throw new Error("No board found");
    }

    revalidateTag("board");

    return {
      boardId: result.board.id,
      title: result.board.title,
      bgColor: result.board.bg_color,
    };
  } catch (error) {
    console.error("Error editing board", error);

    throw new Error("Error editing board");
  }
};

const DeleteBoardServerAction = async (
  boardId: string,
): Promise<DeleteBoardOutputType> => {
  const token = (await cookies()).get("token")?.value ?? "";
  validateServerUrlAndToken(token);

  if (!boardId) {
    console.error("Board ID is required");
    throw new Error("Board ID is required");
  }

  try {
    // 1. Call the delete API endpoint
    const response = await fetch(`${SERVER_BASE_URL}/board/${boardId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Delete board response", response);
    const result: DeleteBoardServerResponseType = await response.json();

    // 2. Send the result to the user
    if (!result.success) {
      throw new Error(`${result.message}`);
    }

    return {
      message: result.message,
    };
  } catch (error) {
    console.error("Error deleting board", error);

    throw new Error("Error deleting board");
  }
};

// Create a board
const CreateBoardServerAction = async (values: {
  title: string;
  bg_color: string;
}) => {
  const token = (await cookies()).get("token")?.value ?? "";
  validateServerUrlAndToken(token);

  try {
    // 1. Call the create board API endpoint
    const response = await fetch(`${SERVER_BASE_URL}/board/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    console.log("Create board response", response);
    const result: CreateBoardServerResponseType = await response.json();

    // 2. Send the result to the user
    if (!result.success) {
      throw new Error(`${result.message}`);
    }

    return {
      board: result.board,
    };
  } catch (error) {
    console.error("Error creating board", error);

    throw new Error("Error creating board");
  }
};

export {
  GetBoardsServerAction,
  UpdateBoardServerAction,
  DeleteBoardServerAction,
  CreateBoardServerAction,
};
