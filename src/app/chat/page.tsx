import type { Metadata } from "next";
import { ChatApp } from "@/components/ChatApp";

export const metadata: Metadata = {
  title: "Tanya Kerajaan Mataram Islam Bot",
};

export default function ChatPage() {
  return <ChatApp />;
}
