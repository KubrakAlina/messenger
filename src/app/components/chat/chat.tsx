"use client"
import { fetchMessages } from "../fetchData/fetchData";
import { useState, useEffect } from "react";
import Message from "../message/message";
import { type MessageData, UserData } from "../fetchData/fetchData";

function Chat() {
  const [messages, setMessages] = useState<MessageData[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser: UserData = JSON.parse(storedUser);
        const loadMessages = async () => {
          const messagesData = await fetchMessages();
          const filteredMessages = filterMessages(parsedUser, messagesData);
          console.log({filteredMessages})
          setMessages(filteredMessages);
        }
        loadMessages();

      } catch(err) {
        localStorage.removeItem("user");
        console.error(err);
      }
    }
  }, []);



console.log(messages)
  return (messages &&
    <ul>
      {messages.map((message: MessageData) => (
        <li key={message.id}>
          <Message {... message}/>
        </li>
      ))}
    </ul>
  );
}

function filterMessages(user: UserData , messages: MessageData[]): MessageData[] {
  const sortedMessages: MessageData[] = [];
  for (const message of messages) {
    if (message.from === user.id) {
      sortedMessages.push(message);
      console.log(message)
    }
  }
  return sortedMessages;
}

export default Chat;
