"use client"
import { useRef, useLayoutEffect, useEffect, useState } from "react";
import Message from "../message/message";
import { ChatsData, fetchChats, fetchMessages, type MessageData, type UserData } from "../fetchData/fetchData";
import s from "./styles.module.scss";
import SendMessage from "../form/sendMessage";

interface ChatProps {
  chatId: string;
}

function Chat({ chatId }: ChatProps) {
  const [user, setUser] = useState<UserData>();
  const [chat, setChat] = useState<ChatsData>();
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
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
        console.error("Can't find chat");
        return;
      }
      setChat(currentChat);
    };
    loadChat();
  }, [chatId]);

  useEffect(() => {
    const loadMessages = async () => {
      if(!hasMore) return;
        try {
          const newMessages = await fetchMessages({
            chatId,
            page
          });

          setMessages((prev) => [...newMessages.reverse(), ...prev]);
        } catch (err) {
          console.error("Error fetching messages:", err);
        } finally {
          setHasMore(false);
          setPage(page+1)
        }
      }

    loadMessages();
    const chatEl = chatRef.current;
    if (!chatEl) return;

    const handleScroll = () => {
      console.log(chatEl.scrollTop)
      if (chatEl.scrollTop === 0 ) {
        loadMessages();
        setHasMore(true)
      }
  };

  chatEl.addEventListener("scroll", handleScroll);
  return () => chatEl.removeEventListener("scroll", handleScroll);

  }, [chatId, hasMore])

  const addMessage = (message: MessageData) => {
    setMessages((prev) => [...prev, message]);
  };

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
      <SendMessage from={user.id} to={to} chatId={chatId} onSuccess={addMessage}/>
    </div>
  );
}


export default Chat;
