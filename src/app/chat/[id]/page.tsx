'use client';

import Chat from "@/app/components/chat/chat";
import { ChatsData, fetchChats, fetchMessages, MessageData, UserData } from "@/app/components/fetchData/fetchData";
import { useEffect, useState } from "react";

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ChatPage({ params }: PageProps) {
  const [user, setUser] = useState<UserData>();
  const [chat, setChat] = useState<ChatsData>();
  const [initMessages, setInitMessages] = useState<MessageData[]>([]);

  useEffect(() => {
    async function loadInitData() {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      const parsedUser: UserData = JSON.parse(storedUser);
      setUser(parsedUser);

      const { id: chatId } = await params;
      const chats = await fetchChats();
      const currentChat = chats.find((c) => c.id === chatId);
      if (!currentChat) {
        console.error("Can't find chat");
        return;
      }

      setChat(currentChat);
      const messages = await fetchMessages({
        chatId
      });
      setInitMessages(messages);
    }

    loadInitData();
  }, []);

  if (!chat || !user || !initMessages.length) return null;

  return <Chat chat={chat} user={user} initMessages={initMessages} />;
}

