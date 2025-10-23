import { useState, useEffect } from "react";
import { type UserData, ChatsData, MessageData } from "../../fetchData/fetchData";
import { fetchChats, fetchMessages } from "../../fetchData/fetchData";
import { filterMessages } from "../../utils/filterMessages";

export function useChatData(chatId: string) {
  const [user, setUser] = useState<UserData>();
  const [chat, setChat] = useState<ChatsData>();
  const [messages, setMessages] = useState<MessageData[]>([]);

  useEffect(() => {
    const loadChat = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      const parsedUser: UserData = JSON.parse(storedUser);
      setUser(parsedUser);

      const chats = await fetchChats();
      const currentChat = chats.find((c) => c.id === chatId);
      if (!currentChat) {
        console.error("Can't find chat");
        return;
      }
      setChat(currentChat);

      const allMessages = await fetchMessages();
      const filteredMessages = filterMessages(parsedUser, allMessages, currentChat);
      setMessages(filteredMessages);
    };

    loadChat();
  }, [chatId]);

  const addMessage = (message: MessageData) => {
    setMessages((prev) => [...prev, message]);
  };

  return { user, chat, messages, addMessage };
}
