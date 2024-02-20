"use client";

import { useChatPageStore } from "@/app/stores/chat-page";
import { useChatTabsStore } from "@/app/stores/chat-tabs";
import ChatTab from "@/components/ui/chat-tab";

export default function Sidebar() {
  const chatPageId = useChatPageStore((s) => s.chatPageId);
  const chatTabs = useChatTabsStore((s) => s.chatTabs);
  console.log(
    `re-rendering sidebar with newest current id ${chatPageId} and chat history list length ${chatTabs?.length}`,
  );

  return (
    <aside className="h-full w-64 flex-col overflow-y-auto bg-white">
      <div className="flex-1">
        {chatTabs.map((chat, index) => (
          <ChatTab
            key={index}
            title={String(chat.title)}
            id={chat.id}
            createdAt={chat.createdAt}
          />
        ))}
      </div>
    </aside>
  );
}
