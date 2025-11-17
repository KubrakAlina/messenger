import { type MessageData } from "../types";
import { logger } from "../../utils/clientLogger";

export async function fetchMessages({
  chatId,
  startFrom = 0,
}: {
  chatId?: string;
  startFrom?: number;
}): Promise<MessageData[]> {

  const endAt = startFrom + 20;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const urlForFetch = `${API_URL}/messages?chatId=${chatId}&_sort=-createdAt&_start=${startFrom}&_end=${endAt}`;
    const response = await fetch(urlForFetch);


    if (response.status !== 200) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data.reverse();
  } catch (error) {
    logger.error("Failed to fetch messages", error, {
      function: "fetchMessages"
    });
    return [];
  }
}


