import { type ChatsData } from "../types";

export async function fetchChats(): Promise<ChatsData[]> {
  try {
    const urlForFetch = `http://localhost:3004/chats`;
    const response = await fetch(urlForFetch);

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
