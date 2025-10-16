"use client"
import { useState } from "react";
import  users from "../../lib/mockData";
import s from "./styles.module.scss";

function LoginUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      console.log("user finded");
    } else {
      console.log("not user");
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
