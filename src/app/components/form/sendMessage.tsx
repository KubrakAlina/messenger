"use client"
import { useState } from "react";
import { postMessage } from "../postData/postData";
import { type MessageData } from "../fetchData/fetchData";
import s from "./styles.module.scss";

interface SendMessageProps {
  from: string;
  to: string;
  chatId: string;
  onSuccess: (message: MessageData) => void;
}

function SendMessage({ from, to, chatId, onSuccess }: SendMessageProps) {
  const [text, setText] = useState("");

  const handleSendMessage = async () => {
    if (!text.trim()) return;
    const messageData = {
      from: from,
      to: to,
      text,
      createdAt: Date.now(),
      chatId,
    };

    try {
      const newMessage = await postMessage(messageData);
      setText("");
      onSuccess(newMessage);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className={s.message_container}>
      <form className={s.form}>
        <input id="message" className={s.input} type="text"
          placeholder="Message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" onClick={handleSendMessage}>Send</button>
      </form>
    </div>
  )
}

export default SendMessage;
