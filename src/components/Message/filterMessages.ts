import { type UserData, MessageData, ChatsData } from "@/api/types";

export function filterMessages(user: UserData, messages: MessageData[], chat: ChatsData): MessageData[] {
  return messages.filter(
    (message) =>
      (message.from === chat.user1 && message.to === chat.user2) ||
      (message.from === chat.user2 && message.to === chat.user1)
  );
}
