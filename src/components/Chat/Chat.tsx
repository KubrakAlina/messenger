"use client"
import { useRef, useLayoutEffect, useState } from "react";
import Message from "../Message/Message";
import { type ChatsData, type MessageData, type UserData } from "../../api/types";
import { fetchMessages } from "../../api/messages/fetchMessages";
import s from "./chat.module.scss";
import SendMessage from "../Message/SendMessage";

interface ChatProps {
  chat: ChatsData;
  user: UserData;
  initMessages: MessageData[];
}

function Chat({ chat, user, initMessages }: ChatProps) {
  const [messages, setMessages] = useState<MessageData[]>(initMessages);
  const startFrom = useRef(20);
  const [hasMore, setHasMore] = useState(true);
  const chatRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadMessages = async () => {
    if (!hasMore || isLoading) return;
    setIsLoading(true);

    //to save position before new loading
    const chatEl = chatRef.current;
    if (!chatEl) return;
    const prevScrollHeight = chatEl.scrollHeight;
    const prevScrollTop = chatEl.scrollTop;

    //add timeout for loading effect
    await new Promise((res) => setTimeout(res, 700));

    //fetch new messages
    const newMessages = await fetchMessages({
      chatId: chat.id,
      startFrom: startFrom.current,
    });

    //check is these messages existent
    if (newMessages.length > 0) {
      startFrom.current += 20;
      setMessages((prev) => [...newMessages, ...prev]);
      if (newMessages.length < 20) setHasMore(false);

      //fix position when new masseges added
      requestAnimationFrame(() => {
        if (!chatEl) return;
        const newScrollHeight = chatEl.scrollHeight;
        chatEl.scrollTop = newScrollHeight - (prevScrollHeight - prevScrollTop);
      });
    }
    setIsLoading(false);
  };

  //check scroll position and load new messages when needed
  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    const chatEl = event.target as HTMLElement;
    if (chatEl.scrollTop === 0 && hasMore) {
      loadMessages();
    }
  };

  // initial scroll to bottom
  useLayoutEffect(() => {
    const chat = chatRef.current;
    if (chat && shouldScroll) {
      const chat = chatRef.current;
      if (!chat) return;
      chat.style.scrollBehavior = "auto";
      chat.scrollTop = chat.scrollHeight;
      setShouldScroll(false);
    }
  }, [shouldScroll]);

  //add sended messages
  const addMessage = (message: MessageData) => {
    setMessages((prev) => [...prev, message]);
    setShouldScroll(true);
  };

  return (
    <div className={s.chat_container} ref={chatRef} onScroll={handleScroll}>
      {isLoading && (
        <div className={s.loader_wrapper}>
          <div className={s.loader}></div>
        </div>
      )}
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
      {user && chat && (
        <SendMessage
          from={user.id}
          to={chat.user1 === user.id ? chat.user2 : chat.user1}
          chatId={chat.id}
          onSuccess={addMessage}
        />
      )}
    </div>
  );
}


export default Chat;
