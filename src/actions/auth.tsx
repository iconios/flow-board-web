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
import * as dotenv from "dotenv";
dotenv.config();

const SERVER_BASE_URL = process.env.SERVER_BASE_URL;

const SignUp = async ({
  firstname,
  lastname,
  email,
  password,
}: RegisterFormValuesType): Promise<SignUpAuthOutputType> => {
  if (!SERVER_BASE_URL) {
    return {
      error: true,
      message: "Server Url is required",
    };
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
    console.error(`Error registering ${email}`, error);

    return {
      error: true,
      message: "Network error. Please try again",
    };
  }
};

const Login = async ({
  email,
  password,
}: FormValuesType): Promise<LoginAuthOutputType> => {
  if (!SERVER_BASE_URL) {
    return {
      error: true,
      message: "Server Url is required",
    };
  }

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
    });

    const result: LoginServerResponseType = await response.json();

    if (!result.success) {
      return {
        error: true,
        message: result.message,
      };
    }

    return {
      error: false,
      message: result.message,
      data: {
        token: result.token!,
        user: {
          email: result.user!.email,
          firstname: result.user!.firstname,
        },
      },
    };
  } catch (error) {
    console.error(`Error logging in ${email}`, error);

    return {
      error: true,
      message: "Network error. Please try again",
    };
  }
};

const ForgotPassword = async ({
  email,
}: ForgotPasswordType): Promise<SignUpAuthOutputType> => {
  if (!SERVER_BASE_URL) {
    return {
      error: true,
      message: "Server Url is required",
    };
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
    console.error(`Error in forgot password for ${email}`, error);

    return {
      error: true,
      message: "Network error. Please try again",
    };
  }
};

export { Login, SignUp, ForgotPassword };
