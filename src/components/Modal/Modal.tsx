import s from "./modal.module.scss";
import { useRouter } from "next/navigation";

function Modal() {
  const router = useRouter();

  return (
    <div className={s.error_container}>
      <div className={s.error_content}>
        <h3>You are not logged in. Please log in and try again</h3>
        <button className={s.button} type="button" onClick={() => { router.push('/signup') }}>SignUp</button>
        <button className={s.button} type="button" onClick={() => { router.push('/login') }}>LogIn</button>
      </div>
    </div>
  )
}

export default Modal;
