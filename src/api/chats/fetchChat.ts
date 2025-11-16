import { type ChatsData } from "../types";
import { logger } from "../../utils/clientLogger";

export async function fetchChat(id: string): Promise<ChatsData> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${API_URL}/chats?id=${id}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data[0] ?? {};
  } catch (error) {
    logger.error("Failed to fetch chat", error, {
      function: "fetchChat",
      request: { id },
    });
    return {} as ChatsData;
  }
}
