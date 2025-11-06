'use client';

import Chat from "@/components/Chat/Chat";
import { type MessageData } from "@/api/types";
import { fetchMessages } from "@/api/messages/fetchMessages";
import { useEffect, useState, useContext } from "react";
import MessengerContext from "@/context/MessengerContext";


export default function ChatPage() {
  const [initMessages, setInitMessages] = useState<MessageData[]>([]);
  const context = useContext(MessengerContext);
  const { currentUser, currentChat } = context;

  useEffect(() => {
    async function loadInitData() {
      if (!currentUser || !currentChat) return;
      try {
        const messages = await fetchMessages({ chatId: currentChat.id });
        setInitMessages(messages);
      } catch (err) {
        console.error(err);
      }
    }

    loadInitData();
  }, [currentUser, currentChat]);

  if (!initMessages) return <p>Loading chat...</p>;


  return <Chat initMessages={initMessages} />;
}

