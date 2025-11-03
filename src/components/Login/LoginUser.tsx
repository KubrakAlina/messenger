"use client"
import { useState } from "react";
import { fetchUser } from "../../api/user/fetchUser";
import s from "./login.module.scss";
import { useRouter } from "next/navigation";

function LoginUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();


  const handleLogin = async () => {
    const users = await fetchUser();
    const user = users.find((u: { username: string; password: string; }) => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      router.push('/chats')
    } else {
      router.push('/signup')
    }
  }

  return (
    <div className={s.container}>
      <form className={s.form} >
        <h2>Login</h2>
        <input className={s.input} type="text"
          placeholder="Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input className={s.input} type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleLogin}>Go</button>
      </form>
    </div>
  )
}

export default LoginUser;
