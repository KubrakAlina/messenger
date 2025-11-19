"use client"

import { createContext, useState, useEffect, ReactNode } from "react"
import { type UserData, ChatsData } from "@/api/types"
import { fetchUser } from "@/api/user/fetchUser";

interface MessengerContextType {
  currentUser: UserData | null;
  setCurrentUser: (user: UserData | null) => void;

  currentChat: ChatsData | null;
  setCurrentChat: (chat: ChatsData | null) => void;

  chatPartner: UserData | null;
  setChatPartner: (user: UserData | null) => void;
}

export const MessengerContext = createContext({} as MessengerContextType);

export function MessengerProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [currentChat, setCurrentChat] = useState<ChatsData | null>(null);
  const [chatPartner, setChatPartner] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (currentChat && currentUser) {
      try {
        const findChatPartner = async () => {
          const partnerId = currentChat.user1 === currentUser.id ? currentChat.user2 : currentChat.user1;
          const users = await fetchUser();
          const chatPartner = users.find((user: { id: string; }) => partnerId === user.id);
          if (chatPartner) {
            setChatPartner(chatPartner)
          }
        }
        findChatPartner();
      } catch { }
    }
  }, [currentChat, currentUser]);

  const value: MessengerContextType = {
    currentUser,
    setCurrentUser,
    currentChat,
    setCurrentChat,
    chatPartner,
    setChatPartner,
  };

  return <MessengerContext.Provider value={value}>{children}</MessengerContext.Provider>;
}

export default MessengerContext;
