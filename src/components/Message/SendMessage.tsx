"use client"
import { useState } from "react";
import { postMessage } from "../../api/messages/postMessage";
import { type MessageData } from "../../api/types";
import s from "./message.module.scss";

interface SendMessageProps {
  from: string;
  to: string;
  chatId?: string;
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
    } catch { };
  }


  return (
    <div className={s.form_container}>
      <form className={s.form}>
        <input id="message" className={s.input} type="text"
          placeholder="Message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoComplete="off"
        />
        <button className={s.button} type="submit" onClick={handleSendMessage}>Send</button>
      </form>
    </div>
  )
}

export default SendMessage;
