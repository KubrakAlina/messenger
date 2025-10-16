import DefaultLayout from "./components/layout/layout";
import Link from "next/link";

export default function page() {
  return (
  <DefaultLayout>
    <h2>Start here</h2>
    <div>
      <h3>Navigation</h3>
      <ul>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/chat">Chat</Link>
        </li>
        <li>
          <Link href="/signup">Signup</Link>
        </li>
      </ul>
    </div>
  </DefaultLayout>
  );
}
