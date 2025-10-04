"use server";

export const getBoards = async (token: string) => {
  const SERVER_BASE_URL = process.env.SERVER_BASE_URL;
  try {
    // 1. Get the board details of the user
    const response = await fetch(`${SERVER_BASE_URL}/board/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 2. Return the result to the user
    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching board data", error);
    return {
      message: "Error fetching board data",
    };
  }
};
