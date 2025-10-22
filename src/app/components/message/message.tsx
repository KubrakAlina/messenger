import s from "./styles.module.scss"
import { type MessageData } from "../fetchData/fetchData";

interface MessageProps {
  data: MessageData;
  my: boolean;
}

function Message({data, my}: MessageProps) {
    return  (
      <div className={my ? s.message_container_my_message : s.message_container}>
      <p className={s.message_body}>{data.text}</p>
      <span className={s.message_from}>from{data.from}</span>
    </div>
    )
}

export default Message;
