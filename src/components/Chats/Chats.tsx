"use client"
import { fetchChats } from "../../api/chats/fetchChats"
import { type ChatsData, type UserData } from "../../api/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserSearch from "../SearchUser/SearchUser";

function Chats() {
  const router = useRouter();
  const [chats, setChats] = useState<ChatsData[]>([]);
  const [user, setUser] = useState<UserData>();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser: UserData = JSON.parse(storedUser);
        setUser(parsedUser);
        const loadChats = async () => {
          const chatsData = await fetchChats();
          const fiteredChats = chatsData.filter(
            (chat) => chat.user1 === parsedUser.id || chat.user2 === parsedUser.id
          );
          setChats(fiteredChats);
        }
        loadChats();
      } catch (err) {
        console.error(err);
      }
    }
  }, [])

  function handleClick(chatId: string) {
    router.push(`/chat/${chatId}`);
  }

  return (
    <>
      <ul>
        {chats.map((item: ChatsData) => {
          if (item.user1 !== user?.id && item.user2 !== user?.id) return null;
          return (
            <li
              key={item.id}
              onClick={() => handleClick(item.id)}
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
