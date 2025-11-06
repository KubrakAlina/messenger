"use client"

import { createContext, useState, useEffect, ReactNode } from "react"
import { type UserData, ChatsData } from "@/api/types"

interface MessengerContextType {
  currentUser: UserData | null;
  setCurrentUser: (user: UserData | null) => void;

  currentChat: ChatsData | null;
  setCurrentChat: (chat: ChatsData | null) => void;

  chatPartner: string | null;
  setChatPartner: (user: string | null) => void;
}

export const MessengerContext = createContext({} as MessengerContextType);

export function MessengerProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [currentChat, setCurrentChat] = useState<ChatsData | null>(null);
  const [chatPartner, setChatPartner] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

    const storedChat = sessionStorage.getItem("chat")
    if (storedChat) {
      setCurrentChat(JSON.parse(storedChat));
    }
  }, []);

  // useEffect(() => {
  //   if (currentUser) {
  //     localStorage.setItem("user", JSON.stringify(currentUser));
  //   }
  // }, [currentUser]);

  useEffect(() => {
    if (currentChat && currentUser) {
      setChatPartner(currentChat.user1 === currentUser.id ? currentChat.user2 : currentChat.user1)
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
