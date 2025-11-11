import Link from "next/link";
import s from "./page.module.scss"
import LogOut from "@/components/LogOut/LogOut";

export default function page() {
  return (
    <>
      <h2>Start here</h2>
      <ul className={s.navigation_list}>
        <li className={s.navigation_item}>
          <Link className={s.navigation_link} href="/login"> <span>Login</span></Link>
        </li>
        <li className={s.navigation_item}>
          <Link className={s.navigation_link} href="/signup"><span>Signup</span></Link>
        </li>
        <li className={s.navigation_item}>
          <Link className={s.navigation_link} href="/chats"><span>Chats</span></Link>
        </li>
      </ul>
      <LogOut />
    </>
  );
}
