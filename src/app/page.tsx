"use client";

import ChatArea from "@/components/ui/chat-area";
import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import Sidebar from "@/components/ui/sidebar";

import { useChatPageStore } from "@/app/stores/chat-page";
import { useChatTabsStore } from "@/app/stores/chat-tabs";
import { api } from "@/trpc/react";
import { useEffect } from "react";

export default function Homepage() {
  const queryLatestChatPage = api.chatPage.getLatest.useQuery();
  const queryAllChatPages = api.chatPage.getAll.useQuery();
  const setChatPageId = useChatPageStore((s) => s.setChatPageId);
  const setChatTabs = useChatTabsStore((s) => s.setChatTabs);

  useEffect(() => {
    console.log("Page mounted, fetching latest chat history");

    const latestChatId = queryLatestChatPage.data?.id;
    if (!latestChatId) return;
    setChatPageId(latestChatId);

    const allChatPages = queryAllChatPages.data;
    if (!allChatPages) return;
    console.log("fetching all chat tabs, length:", allChatPages.length);
    setChatTabs(
      allChatPages.map((chat) => ({
        id: chat.id,
        title: chat.id.toString(),
        createdAt: chat.createdAt.toUTCString(),
      })),
    );
  });

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex overflow-hidden">
        <Sidebar />
        <ChatArea />
      </div>
      <Footer />
    </div>
  );
}
