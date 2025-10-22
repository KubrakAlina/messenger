"use client"
import s from "./styles.module.scss";
import { useRouter } from "next/navigation";
import ChatsList from "../components/chats/chats";

function ChatPage() {
  const router = useRouter()
  function handleClick() {
    router.push("/chat");
  }
  return (
    <>
    <h2>ChatsPage</h2>
    <div className={s.container}>
      <p>There are your chats</p>
      <ChatsList />
    </div>
    </>

  );
}
export default ChatPage;
