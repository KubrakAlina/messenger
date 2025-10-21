"use client"
import s from "./styles.module.scss";
import { useRouter } from "next/navigation";

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
      <button type="button" onClick={handleClick}>Click to go to chat</button>
    </div>
    </>

  );
}
export default ChatPage;
