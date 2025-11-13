import { type ChatsData } from "../types";

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
    console.error("Loading error:", error);
    return {} as ChatsData;
  }
}
