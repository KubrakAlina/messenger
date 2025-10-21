export interface MessageData {
    id: string;
    from: string;
    to: string;
    text: string
}

  export interface UserData {
  id: string;
  username: string;
  name: string;
  password: string;
}

export async function fetchData(url:string) {
  try {
    const urlForFetch = `http://localhost:3004/${url}`;
    const response = await fetch(urlForFetch);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Loading error:", error);
    return null;
  }
}

export async function fetchMessages(): Promise<MessageData[]> {
  try {
    const urlForFetch = `http://localhost:3004/messages`;
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
