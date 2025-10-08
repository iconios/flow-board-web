"use server";

import { cookies } from "next/headers";

const SERVER_BASE_URL = process.env.SERVER_BASE_URL;
const token = (await cookies()).get("token")?.value ?? "";

const ValidateServerUrlAndToken = async () => {
  if (!SERVER_BASE_URL) {
    throw new Error("Server Url is required");
  }

  if (!token) {
    throw new Error("Not authenticated");
  }

  return {
    SERVER_BASE_URL,
    token,
  };
};

export default ValidateServerUrlAndToken;
