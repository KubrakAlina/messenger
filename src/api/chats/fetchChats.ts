import { type ChatsData } from "../types";

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
    console.error("Loading error:", error);
    return [];
  }
}
