"use client";

import { ChatPageStore } from "@/app/stores/chat-page";
import { ChatTabsStore } from "@/app/stores/chat-tabs";
import ChatTab from "@/components/ui/chat-tab";

export default function Sidebar() {
  const chatPageId = ChatPageStore((s) => s.chatPageId);
  const chatTabs = ChatTabsStore.use.currentTabs();
  console.log(
    `re-rendering sidebar with newest current id ${chatPageId} and chat history list length ${chatTabs?.length}`,
  );

  return (
    <aside className="h-full w-64 flex-col overflow-y-auto bg-white">
      <div className="flex-1">
        {chatTabs.map((chat, index) => (
          <ChatTab
            key={index}
            title={chat.id == chatPageId ? "current" : String(chat.id)}
            id={chat.id}
            createdAt={chat.createdAt}
          />
        ))}
      </div>
    </aside>
  );
}
