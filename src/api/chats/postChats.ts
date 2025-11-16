import { logger } from "../../utils/clientLogger";

export async function postChat(data: { user1: string; user2: string; }) {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${API_URL}/chats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    logger.error("Failed to post chat", error, {
      function: "postChat"
    });
    return null;
  }
}
