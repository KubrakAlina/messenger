"use client"
import { useState } from "react";
import { postMessage } from "../postData/postData";
import { type MessageData } from "../fetchData/fetchData";
import s from "./styles.module.scss";

interface SendMessageProps {
  from: string;
  to: string;
  onSuccess: (message: MessageData) => void;
}

function SendMessage({ from, to, onSuccess }: SendMessageProps) {
  const [text, setText] = useState("");

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    const newMessage = {
      from: from,
      to: to,
      text
    };

    try {
      await postMessage(newMessage);
      setText("");
      onSuccess(newMessage);
    } catch (err) {
      console.error(err);
    }
  };


  return(
    <div className = {s.message_container}>
      <form className = {s.form} onSubmit={handleSendMessage}>
        <input className = {s.input} type = "text"
        placeholder = "Message"
        value = {text}
        onChange = {(e) => setText(e.target.value)}
         />
         <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default SendMessage;
