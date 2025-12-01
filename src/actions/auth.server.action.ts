/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use server";

import {
  ForgotPasswordType,
  FormValuesType,
  LoginAuthOutputType,
  LoginServerResponseType,
  RegisterFormValuesType,
  SignUpAuthOutputType,
  SignUpAuthServerResponseType,
} from "@/lib/types";
import { cookies } from "next/headers";

const SERVER_BASE_URL = process.env.SERVER_BASE_URL;

const SignUpServerAction = async ({
  firstname,
  lastname,
  email,
  password,
}: RegisterFormValuesType): Promise<SignUpAuthOutputType> => {
  if (!SERVER_BASE_URL) {
    throw new Error("Server Url required");
  }

  try {
    const response = await fetch(`${SERVER_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
      }),
    });

    const result: SignUpAuthServerResponseType = await response.json();

    if (!result.success) {
      throw new Error(result.message);
    }

    return {
      message: result.message,
    };
  } catch (error) {
    console.error(`Error registering ${email}`, error);

    if (error instanceof Error) throw error;

    throw new Error("Network error. Please try again");
  }
};

// Login server action
const LoginServerAction = async ({
  email,
  password,
}: FormValuesType): Promise<LoginAuthOutputType> => {
  if (!SERVER_BASE_URL) {
    throw new Error("Server Url is required");
  }

  console.log("Login server action called", {
    email,
  });

  try {
    const response = await fetch(`${SERVER_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
      cache: "no-store",
    });

    const result: LoginServerResponseType = await response.json();

    if (!result.success || !response.ok) {
      throw new Error(result.message);
    }

    const token = result.token;
    if (!token) throw new Error("Missing token");
    (await cookies()).set("token", token, {
      httpOnly: true, // protects against XSS
      secure: process.env.NODE_ENV === "production", // only over HTTPS (true in prod)
      sameSite: "lax", // good default for app flows
      path: "/",
      maxAge: 60 * 60 * 24 * 1,
    });

    return result.user;
  } catch (error) {
    console.error(`Error logging in ${email}`, error);

    if (error instanceof Error) throw error;

    throw new Error("Error logging in. Please try again");
  }
};

// Forgot Password Server Action
const ForgotPasswordServerAction = async ({
  email,
}: ForgotPasswordType): Promise<SignUpAuthOutputType> => {
  if (!SERVER_BASE_URL) {
    throw new Error("Server Url is required");
  }

  try {
    const response = await fetch(`${SERVER_BASE_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const result: SignUpAuthServerResponseType = await response.json();

    if (!result.success) {
      throw new Error(result.message);
    }

    return {
      message: result.message,
    };
  } catch (error) {
    console.error(`Error in forgot password for ${email}`, error);

    if (error instanceof Error) throw error;

    throw new Error("Network error. Please try again");
  }
};

const LogoutServerAction = async () => {
  (await cookies()).delete("token");
};

export {
  LoginServerAction,
  SignUpServerAction,
  ForgotPasswordServerAction,
  LogoutServerAction,
};
