"use client"

import { useParams } from "next/navigation";
import Chat from "@/app/components/chat/chat";

export default function ChatPage() {
  const { id } = useParams();
  return <Chat chatId={id as string} />;
}
