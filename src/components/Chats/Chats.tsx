"use client"
import { fetchChats } from "../../api/chats/fetchChats"
import { type ChatsData } from "../../api/types";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import UserSearch from "../SearchUser/SearchUser";
import MessengerContext from "@/context/MessengerContext";
import s from "./chats.module.scss";

function Chats() {
  const router = useRouter();
  const [chats, setChats] = useState<ChatsData[]>([]);

  const context = useContext(MessengerContext);
  const { currentUser } = context;

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
    router.push(`/chat/${chat.id}`);
  }

  return (
    <div className={s.container}>
      <UserSearch />
      <ul className={s.item_list}>
        {chats.map((item: ChatsData) => {
          if (item.user1 !== currentUser?.id && item.user2 !== currentUser?.id) return null;
          return (
            <li className={s.item}
              key={item.id}
              onClick={() => handleClick(item)}
            >
              Open chat {item.id}
            </li>)
        })
        }
      </ul>
    </div>
  )
}

export default Chats;
