export interface MessageData {
  id?: string;
  from: string;
  to: string;
  text: string
  createdAt: number;
  chatId: string;
}

export interface UserData {
  id: string;
  username: string;
  name: string;
  password: string;
}

export interface ChatsData {
  id: string;
  user1: string;
  user2: string;
}

export async function fetchUser(): Promise<UserData[]> {
  try {
    const urlForFetch = `http://localhost:3004/users`;
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

export async function fetchMessages({
  chatId,
  startFrom = 0,
}: {
  chatId: string;
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
