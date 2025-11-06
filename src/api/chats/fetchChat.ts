import { type ChatsData } from "../types";

export async function fetchChat(id: string): Promise<ChatsData> {
  try {
    const urlForFetch = `http://localhost:3004/chats?id=${id}`;
    const response = await fetch(urlForFetch);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data[0] ?? {};
  } catch (error) {
    console.error("Loading error:", error);
    return {} as ChatsData;
  }
}
