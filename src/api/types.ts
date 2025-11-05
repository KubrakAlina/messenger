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
  id?: string;
  user1: string;
  user2: string;
}
