"use server";

import {
  CreateBoardMemberInputSchema,
  CreateBoardMemberInputType,
  CreateBoardMemberServerResponseType,
  GetBoardMembersServerResponseType,
} from "@/lib/member.types";
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

const CreateBoardMemberServerAction = async (
  createBoardMemberInput: CreateBoardMemberInputType,
) => {
  const token = (await cookies()).get("token")?.value ?? "";
  validateServerUrlAndToken(token);

  try {
    const validatedInput = CreateBoardMemberInputSchema.parse(
      createBoardMemberInput,
    );
    const response = await fetch(`${SERVER_BASE_URL}/member/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedInput),
    });

    const result: CreateBoardMemberServerResponseType = await response.json();
    if (!result.success) {
      throw new Error(`${result.message}`);
    }

    revalidateTag("board-member");
    revalidateTag(`board-member:${validatedInput.board_id}`);
    return {
      success: true,
      message: result.message,
      member: result.member,
    };
  } catch (error) {
    console.error("Error creating board member", error);

    if (error instanceof ZodError) {
      throw new Error("Error validating the create board member input");
    }

    if (error instanceof Error) throw error;

    throw new Error("Error creating board member");
  }
};

const GetBoardMembersServerAction = async (boardId: string) => {
  const token = (await cookies()).get("token")?.value ?? "";
  validateServerUrlAndToken(token);

  try {
    const response = await fetch(`${SERVER_BASE_URL}/member/${boardId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["board-member", `board-member:${boardId}`],
      },
    });

    const result: GetBoardMembersServerResponseType = await response.json();
    if (!result.success) {
      throw new Error(`${result.message}`);
    }

    return result.members;
  } catch (error) {
    console.error("Error fetching board members", error);

    if (error instanceof Error) throw error;

    throw new Error("Error fetching board members");
  }
};

export { CreateBoardMemberServerAction, GetBoardMembersServerAction };
