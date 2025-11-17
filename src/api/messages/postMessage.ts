import { logger } from "../../utils/clientLogger";


export async function postMessage(data: { from: string; to: string; text: string }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const urlForFetch = `${API_URL}/messages`;
    const response = await fetch(urlForFetch, {
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
    logger.error("Failed to post message", error, {
      function: "postMessage"
    });
    return null;
  }
}
