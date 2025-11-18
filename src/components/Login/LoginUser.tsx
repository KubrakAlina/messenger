"use client"
import { useState, useContext } from "react";
import { fetchUser } from "../../api/user/fetchUser";
import s from "./login.module.scss";
import { useRouter } from "next/navigation";
import MessengerContext from "@/context/MessengerContext";

function LoginUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signUp, setSignUp] = useState(false)
  const router = useRouter();
  const { setCurrentUser } = useContext(MessengerContext);

  const handleLogin = async () => {
    const users = await fetchUser();
    const user = users.find((u: { username: string; password: string; }) => u.username === username && u.password === password);
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
      setCurrentUser(user);
      router.push('/chats')
    } else {
      setSignUp(true)
    }
  }

  const handleClickSignUp = () => {
    setSignUp(true)
    router.push('/signup')
  }

  const handleClick = () => {
    setSignUp(false)
    router.push('/login')
  }

  return (
    <div className={s.container}>
      <form className={s.form} >
        <h2 className={s.title}>Login</h2>
        <input className={s.input} type="text"
          id="username"
          placeholder="Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="off"
        />
        <input className={s.input} type="text"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
        />
        <button className={s.button} type="button" onClick={handleLogin}>Go</button>
      </form>
      {signUp && (
        <div className={s.error_container}>
          <div className={s.error_content}>
            <h3>You don`t have account yet. Go to signup?</h3>
            <button className={s.button} type="button" onClick={handleClickSignUp}>SignUp</button>
            <button className={s.button} type="button" onClick={handleClick}>Go back</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoginUser;
