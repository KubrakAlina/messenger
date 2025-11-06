"use client"
import { fetchChats } from "../../api/chats/fetchChats"
import { type ChatsData } from "../../api/types";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import UserSearch from "../SearchUser/SearchUser";
import MessengerContext from "@/context/MessengerContext";

function Chats() {
  const router = useRouter();
  const [chats, setChats] = useState<ChatsData[]>([]);

  const context = useContext(MessengerContext);
  const { currentUser, setCurrentChat } = context;

  useEffect(() => {
    if (currentUser) {
      try {
        const loadChats = async () => {
          const chatsData = await fetchChats();
          const filteredChats = chatsData.filter(
            (chat) => chat.user1 === currentUser?.id || chat.user2 === currentUser?.id
          );
          setChats(filteredChats);
        }
        loadChats();
      } catch (err) {
        console.error(err);
      }
    }
  }, [currentUser])

  function handleClick(chat: ChatsData) {
    sessionStorage.setItem("chat", JSON.stringify(chat))
    setCurrentChat(chat);
    router.push(`/chat/${chat.id}`);
  }

  return (
    <>
      <ul>
        {chats.map((item: ChatsData) => {
          if (item.user1 !== currentUser?.id && item.user2 !== currentUser?.id) return null;
          return (
            <li
              key={item.id}
              onClick={() => handleClick(item)}
            >
              Open chat {item.id}
            </li>)
        })
        }
      </ul>
      <UserSearch />
    </>
  )
}

export default Chats;
