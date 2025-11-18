"use client"
import s from "./logout.module.scss";
import MessengerContext from "@/context/MessengerContext";
import { useContext } from "react";

function LogOut() {
  const { setCurrentUser } = useContext(MessengerContext);

  function handleClick() {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      sessionStorage.clear();
      setCurrentUser(null);
    }
    //add modal
    else { console.log("you dont logged in") }
  }


  return (
    <button className={s.button} onClick={handleClick}>click</button>
  )
}

export default LogOut;
