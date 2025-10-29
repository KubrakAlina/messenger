import s from "./styles.module.scss";
import ChatsList from "../components/chats/chats";

function ChatPage() {
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
