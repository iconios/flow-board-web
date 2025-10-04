"use server";

import { GetBoardsOutputType, GetBoardsServerResponseType } from "@/lib/types";

const SERVER_BASE_URL = process.env.SERVER_BASE_URL;

const GetBoardsServerAction = async (
  token: string,
): Promise<GetBoardsOutputType> => {
  if (!SERVER_BASE_URL) {
    return {
      error: true,
      message: "Server Url is required",
    };
  }

  if (!token) {
    console.error("Token is required");
    return {
      error: true,
      message: "Token is required",
    };
  }

  try {
    // 1. Get the board details of the user
    const response = await fetch(`${SERVER_BASE_URL}/board/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result: GetBoardsServerResponseType = await response.json();
    console.log("Boards from server action", result);

    // 2. Return the result to the user
    if (!result.success) {
      return {
        error: true,
        message: result.message,
      };
    }

    if (!result.boards) {
      return {
        error: false,
        message: "No boards found",
      };
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
      error: false,
      message: result.message,
      data: boardsArrayToReturn,
    };
  } catch (error) {
    console.error("Error fetching board data", error);

    return {
      error: true,
      message: "Network error. Please try again",
    };
  }
};

export { GetBoardsServerAction };
