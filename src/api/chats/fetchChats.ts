import { type ChatsData } from "../types";
import { logger } from "../../utils/clientLogger";

export async function fetchChats(): Promise<ChatsData[]> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${API_URL}/chats`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    logger.error("Failed to fetch chat", error, {
      function: "fetchChats"
    });
    return [];
  }
}
