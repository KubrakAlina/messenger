import { type UserData } from "../types";

export async function fetchUser(): Promise<UserData[]> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${API_URL}/users`);;

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
