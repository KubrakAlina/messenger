"use client"
import s from "./logout.module.scss"

function LogOut() {

  function handleClick() {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      sessionStorage.clear();
    }
    //add modal
    else { console.log("you dont logged in") }
  }


  return (
    <button className={s.button} onClick={handleClick}>click</button>
  )
}

export default LogOut;
