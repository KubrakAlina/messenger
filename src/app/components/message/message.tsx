import s from "./styles.module.scss"
import { type MessageData } from "../fetchData/fetchData";

function Message(data: MessageData) {
  return(
    <div className={s.message_container}>
      <p className={s.message_body}>{data.text}</p>
      <span className={s.message_from}>from{data.from}</span>
    </div>
  )
}

export default Message;
