"use client"
import { fetchChats } from "../fetchData/fetchData"
import { type ChatsData, UserData } from "../fetchData/fetchData";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function ChatsList () {
  const router = useRouter();
  const [chats, setChats] = useState<ChatsData[]>([]);
  const [user, setUser] = useState <UserData>();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try{
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
      } catch(err) {
        console.error(err);
      }
    }
  }, [])

  function handleClick() {
    router.push("/chat");
  }


  return(
    <ul>
      {chats.map((item: ChatsData)=> {
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
  )
}

export default ChatsList;
