"use client"
import { fetchMessages } from "../fetchData/fetchData";
import { useState, useEffect } from "react";
import Message from "../message/message";
import { type MessageData, UserData } from "../fetchData/fetchData";

function Chat() {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [user, setUser] = useState<UserData>();

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

  return (messages &&
    <ul>
      {messages.map((message: MessageData) => {
        const isMyMessage = message.from === user?.id;
        return (
        <li key={message.id}>
          <Message data={message} my={isMyMessage} />
        </li>
      )
      })}
    </ul>
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
