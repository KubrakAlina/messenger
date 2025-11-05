'use client';

import Chat from "@/components/Chat/Chat";
import { type ChatsData, type MessageData, type UserData } from "@/api/types";
import { fetchChats } from "@/api/chats/fetchChats";
import { fetchMessages } from "@/api/messages/fetchMessages";
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

  if (!chat || !user) return null;

  return <Chat chat={chat} user={user} initMessages={initMessages} />;
}

