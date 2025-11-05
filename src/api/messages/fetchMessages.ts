import { type MessageData } from "../types";

export async function fetchMessages({
  chatId,
  startFrom = 0,
}: {
  chatId?: string;
  startFrom?: number;
}): Promise<MessageData[]> {
  const endAt = startFrom + 20;
  try {
    const urlForFetch = `http://localhost:3004/messages?chatId=${chatId}&_sort=-createdAt&_start=${startFrom}&_end=${endAt}`;
    const response = await fetch(urlForFetch);


    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data.reverse();
  } catch (error) {
    console.error("Loading error:", error);
    return [];
  }
}


