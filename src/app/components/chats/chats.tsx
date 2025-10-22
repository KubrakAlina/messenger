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
          console.log(chatsData);
          setChats(chatsData);
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
         if (item.receiverId !== user?.id) return null;
        return (
        <li key={item.senderId}>
          <a onClick={handleClick}>{item.senderId}</a>
        </li>)
        })
      }
    </ul>
  )
}

export default ChatsList;
