import type { Metadata } from "next";
import { ChatApp } from "@/components/ChatApp";

export const metadata: Metadata = {
  title: "Tanya Antara Bot | Surantara",
};

export default function ChatPage() {
  return <ChatApp />;
}
