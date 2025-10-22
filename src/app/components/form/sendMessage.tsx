"use client"
import { useState } from "react";
import { postMessage } from "../postData/postData";
import s from "./styles.module.scss";

// interface MessageProps {
//   from: string;
//   to: string;
// } {from, to}: MessageProps

function SendMessage() {
  const [text, setText] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const newMessage = {
      from,
      to,
      text
    };
    await postMessage(newMessage);
  }

  return(
    <div className = {s.message_container}>
      <form className = {s.form} onSubmit={handleSendMessage}>
        <input className = {s.input} type = "text"
        placeholder = "Message"
        value = {text}
        onChange = {(e) => setText(e.target.value)}
         />
         <input className = {s.input} type = "text"
        placeholder = "From"
        value = {from}
        onChange = {(e) => setFrom(e.target.value)}
         />
         <input className = {s.input} type = "text"
        placeholder = "To"
        value = {to}
        onChange = {(e) => setTo(e.target.value)}
         />
         <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default SendMessage;
