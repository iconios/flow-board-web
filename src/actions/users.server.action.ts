"use server";

import { GetUserServerResponseType } from "@/lib/types";
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

const GetUserServerAction = async (email: string) => {
  const token = (await cookies()).get("token")?.value ?? "";
  validateServerUrlAndToken(token);

  try {
    const response = await fetch(`${SERVER_BASE_URL}/user/${email}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result: GetUserServerResponseType = await response.json();
    console.log("Tasks from server action", result);

    if (!result.success || !response.ok) {
      throw new Error(`${result.message}`);
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching the user", error);

    if (error instanceof Error) throw error;

    throw new Error("Error fetching tasks");
  }
};

// Delete User Service
/*
#Plan: 
1. Get the token
2. Call the API and pass the token
3. Return result to client
*/
const DeleteUserServerAction = async () => {
  // 1. Get the token
  const token = (await cookies()).get("token")?.value ?? "";
  validateServerUrlAndToken(token);

  try {
    // 2. Call the API and pass the token
    const response = await fetch(`${SERVER_BASE_URL}/user/delete`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result: { success: boolean; message: string } = await response.json();
    if (!result.success) {
      throw new Error(result.message);
    }

    // 3. Return result to client
    return {
      message: result.message,
    };
  } catch (error) {
    console.error("Error deleting user", error);

    if (error instanceof Error) throw error;

    throw new Error("Error deleting user");
  }
};

export { DeleteUserServerAction, GetUserServerAction };
