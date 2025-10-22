"use client"
import { fetchMessages } from "../fetchData/fetchData";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Message from "../message/message";
import { type MessageData, UserData } from "../fetchData/fetchData";
import s from "./styles.module.scss";
import SendMessage from "../form/sendMessage";

function Chat() {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [user, setUser] = useState<UserData>();
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser: UserData = JSON.parse(storedUser);
        setUser(parsedUser);
        const loadMessages = async () => {
          const messagesData = await fetchMessages();
          const filteredMessages = filterMessages(parsedUser, messagesData);
          setMessages(filteredMessages);
        }
        loadMessages();

      } catch(err) {
        localStorage.removeItem("user");
        console.error(err);
      }
    }
  }, []);

  useLayoutEffect(() => {
    const chat = chatRef.current;
    if (!chat) return;

    const prev = chat.style.scrollBehavior;
    chat.style.scrollBehavior = "auto";
    chat.scrollTop = chat.scrollHeight;
    chat.style.scrollBehavior = prev;
  }, [messages]);

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
      <SendMessage />
    </div>
  );
}

function filterMessages(user: UserData , messages: MessageData[]): MessageData[] {
  const sortedMessages: MessageData[] = [];
  for (const message of messages) {
    if (message.from === user.id || message.to === user.id) {
      sortedMessages.push(message);
    }
  }
  return sortedMessages;
}

export default Chat;
