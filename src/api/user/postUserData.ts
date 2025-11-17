import { logger } from "@/utils/clientLogger";

export async function postUserData(url: string, data: { username: string; password: string; }) {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    if (response.status !== 201) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    logger.error("Failed to post user data", error, {
      function: "postUserData"
    });
    return null;
  }
}


