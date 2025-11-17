import { type UserData } from "../types";
import { logger } from "@/utils/clientLogger";

export async function fetchUser(): Promise<UserData[]> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${API_URL}/users`);;

    if (response.status !== 200) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    logger.error("Failed to fetch user", error, {
      function: "fetchUser"
    });
    return [];
  }
}
