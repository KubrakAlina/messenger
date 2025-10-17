import Link from "next/link";

export default function page() {
  return (
    <>
      <h2>Start here</h2>
      <h3>Navigation</h3>
      <ul>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/chats">Chat</Link>
        </li>
        <li>
          <Link href="/signup">Signup</Link>
        </li>
      </ul>
    </>
  );
}
