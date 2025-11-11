import Chats from "@/components/Chats/Chats";
import s from ".//chats.module.scss";

function ChatPage() {
  return (
    <>
      <h2 className={s.header_title}>ChatsPage</h2>
      <Chats />
    </>

  );
}
export default ChatPage;
