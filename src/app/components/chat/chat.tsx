"use client"
import { fetchMessages, fetchChats } from "../fetchData/fetchData";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Message from "../message/message";
import { type MessageData, UserData, ChatsData } from "../fetchData/fetchData";
import s from "./styles.module.scss";
import SendMessage from "../form/sendMessage";

interface ChatProps {
  chatId: string;
}

function Chat({ chatId }: ChatProps) {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [user, setUser] = useState<UserData>();
  const [chat, setChat] = useState<ChatsData>();
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadChat = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      const parsedUser: UserData = JSON.parse(storedUser);
      setUser(parsedUser);

      const chats = await fetchChats();
      const currentChat = chats.find((c) => c.id === chatId);
      if (!currentChat) {
        console.error("Can`t found chat");
        return;
      }
      setChat(currentChat);

      const allMessages = await fetchMessages();
      const filteredMessages = filterMessages(parsedUser, allMessages, currentChat);
      setMessages(filteredMessages);
    };

    loadChat();
  }, [chatId]);

  useLayoutEffect(() => {
    const chat = chatRef.current;
    if (!chat) return;

    const prev = chat.style.scrollBehavior;
    chat.style.scrollBehavior = "auto";
    chat.scrollTop = chat.scrollHeight;
    chat.style.scrollBehavior = prev;
  }, [messages]);

  const handleNewMessage = (message: MessageData) => {
    setMessages((prev) => [...prev, message]);
  };

  if (!user || !chat) return null;
  const to = chat.user1 === user.id ? chat.user2 : chat.user1;

  return (messages &&
    <div className={s.chat_container} ref={chatRef}>
      <ul className={s.messages_list}>
      {messages.map((message: MessageData) => {
        const isMyMessage = message.from === user?.id;
        return (
        <li key={message.id}>
          <Message data={message} my={isMyMessage} />
        </li>
        )
        })}
      </ul>
      <SendMessage from={user.id} to={to} onSuccess={handleNewMessage}/>
    </div>
  );
}

function filterMessages(user: UserData, messages: MessageData[], chat: ChatsData): MessageData[] {
  return messages.filter(
    (message) =>
      (message.from === chat.user1 && message.to === chat.user2) ||
      (message.from === chat.user2 && message.to === chat.user1)
  );
}

export default Chat;
