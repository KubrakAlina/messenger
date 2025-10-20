"use client"
import { useState } from "react";
import PostData from "../postData/postData";
import s from "./styles.module.scss";
import { useRouter } from "next/navigation";

function SignupUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = {
      username,
      password,
    };
    const result = await PostData("users", newUser);

    if (result) {
      alert("New user added");
      setUsername("");
      setPassword("");
      router.push('/chats')
    } else {
      alert("Ooops");
      router.push('/')
    }
  }

  return(
    <div className = {s.container}>
      <form className = {s.form} onSubmit={handleSignup}>
        <h2>SignUp</h2>
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
         <button type="submit">SignUp</button>
      </form>
    </div>
  )
}

export default SignupUser;
