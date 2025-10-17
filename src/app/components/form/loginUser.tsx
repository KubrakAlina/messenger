"use client"
import { useState } from "react";
import FetchData from "../fetchData/fetchData";
import s from "./styles.module.scss";
import { permanentRedirect } from "next/navigation";

function LoginUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const users = await FetchData("users");
    console.log(users);

    const user = users.find((u: { username: string; password: string; }) => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      permanentRedirect("/chats")
    } else {
       permanentRedirect("/signup");
    }
  }

  return(
    <div className = {s.container}>
      <form className = {s.form} onSubmit={handleLogin}>
        <h2>Login</h2>
        <input className = {s.input} type = "text"
        placeholder = "Name"
        value = {username}
        onChange = {(e) => setUsername(e.target.value)}
         />
         <input className = {s.input} type = "text"
        placeholder = "Password"
        value = {password}
        onChange = {(e) => setPassword(e.target.value)}
         />
         <button type="submit">Go</button>
      </form>
    </div>
  )
}

export default LoginUser;
