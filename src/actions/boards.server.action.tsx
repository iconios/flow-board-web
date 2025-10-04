"use server";

import {
  DeleteBoardOutputType,
  DeleteBoardServerResponseType,
  GetBoardsOutputType,
  GetBoardsServerResponseType,
  UpdateBoardOutputType,
  UpdateBoardServerResponseType,
  UpdateObjectType,
} from "@/lib/types";

const SERVER_BASE_URL = process.env.SERVER_BASE_URL;

const validateServerUrlAndToken = (token: string) => {
  if (!SERVER_BASE_URL) {
    return {
      error: true,
      message: "Server Url is required",
    };
  }
  if (!token) {
    return {
      error: true,
      message: "Token is required",
    };
  }
};

const GetBoardsServerAction = async (
  token: string,
): Promise<GetBoardsOutputType> => {
  validateServerUrlAndToken(token);

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

const UpdateBoardServerAction = async (
  token: string,
  boardId: string,
  updateObject: UpdateObjectType,
): Promise<UpdateBoardOutputType> => {
  validateServerUrlAndToken(token);

  if (!boardId) {
    console.error("Board ID is required");
    return {
      error: true,
      message: "Board ID is required",
    };
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
      return {
        error: true,
        message: result.message,
      };
    }

    if (!result.board) {
      return {
        error: false,
        message: "No board found",
      };
    }

    return {
      error: false,
      message: result.message,
      data: {
        boardId: result.board.id,
        title: result.board.title,
        bgColor: result.board.bg_color,
      },
    };
  } catch (error) {
    console.error("Error editing board", error);

    return {
      error: true,
      message: "Error editing board",
    };
  }
};

const DeleteBoardServerAction = async (
  token: string,
  boardId: string,
): Promise<DeleteBoardOutputType> => {
  validateServerUrlAndToken(token);

  if (!boardId) {
    console.error("Board ID is required");
    return {
      error: true,
      message: "Board ID is required",
    };
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
      return {
        error: true,
        message: result.message,
      };
    }

    return {
      error: false,
      message: result.message,
    };
  } catch (error) {
    console.error("Error deleting board", error);

    return {
      error: true,
      message: "Error deleting board",
    };
  }
};

export {
  GetBoardsServerAction,
  UpdateBoardServerAction,
  DeleteBoardServerAction,
};
