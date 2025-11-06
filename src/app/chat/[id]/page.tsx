'use client';

import Chat from "@/components/Chat/Chat";
import { type MessageData } from "@/api/types";
import { fetchMessages } from "@/api/messages/fetchMessages";
import { useEffect, useState, useContext } from "react";
import MessengerContext from "@/context/MessengerContext";
import { fetchChat } from "@/api/chats/fetchChat";


export default function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const [initMessages, setInitMessages] = useState<MessageData[]>([]);
  const context = useContext(MessengerContext);
  const { currentUser, currentChat, setCurrentChat } = context;

  useEffect(() => {
    async function loadInitData() {
      const messages = await fetchMessages({ chatId: currentChat!.id });
      setInitMessages(messages);
    }

    if (currentUser && currentChat) {
      loadInitData();
    }
  }, [currentUser, currentChat]);

  useEffect(() => {
    params
      .then(({ id }) => fetchChat(id))
      .then(setCurrentChat);

    return () => {
      setCurrentChat(null);
      setInitMessages([]);
    }
  }, [setCurrentChat, params]);

  if (!initMessages) return <p>Loading chat...</p>;

  return <Chat initMessages={initMessages} />;
}

