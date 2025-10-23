"use client"
import { useRef, useLayoutEffect } from "react";
import { useChatData } from "./hooks/useChatData";
import Message from "../message/message";
import { type MessageData } from "../fetchData/fetchData";
import s from "./styles.module.scss";
import SendMessage from "../form/sendMessage";

interface ChatProps {
  chatId: string;
}

function Chat({ chatId }: ChatProps) {
  const { user, chat, messages, addMessage } = useChatData(chatId);
  const chatRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const chat = chatRef.current;
    if (!chat) return;

    const prev = chat.style.scrollBehavior;
    chat.style.scrollBehavior = "auto";
    chat.scrollTop = chat.scrollHeight;
    chat.style.scrollBehavior = prev;
  }, [messages]);

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
      <SendMessage from={user.id} to={to} onSuccess={addMessage}/>
    </div>
  );
}


export default Chat;
