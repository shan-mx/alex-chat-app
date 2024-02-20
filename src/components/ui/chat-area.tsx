"use client";

import { useChatMessagesStore } from "@/app/stores/chat-messages";
import { useChatPageStore } from "@/app/stores/chat-page";
import { api } from "@/trpc/react";
import { useEffect } from "react";
import Message from "./chat-message";

export default function ChatArea() {
  const {chatMessages, setChatMessages} = useChatMessagesStore();
  const currentChatPageId = useChatPageStore((s) => s.chatPageId);
  const getChatMessagesById = api.chatPage.getById.useQuery({
    id: currentChatPageId,
  });
  console.log("re-rendering chat area with id:", currentChatPageId);

  useEffect(() => {
    console.log("current chat page id changed, fetching latest chat messages");
    setChatMessages(getChatMessagesById.data?.messages ?? []);
  }, [currentChatPageId, getChatMessagesById.data?.messages, setChatMessages]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-4 p-4">
        {chatMessages.map((message, index) => (
          <Message
            key={index}
            sender={message.sender}
            content={message.content}
          />
        ))}
      </div>
    </div>
  );
}
