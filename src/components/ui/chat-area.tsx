"use client";

import { ChatMessagesStore } from "@/app/stores/chat-messages";
import { ChatPageStore } from "@/app/stores/chat-page";
import { api } from "@/trpc/react";
import { useEffect } from "react";
import Message from "./chat-message";

export default function ChatArea() {
  const currentChatPageMessages = ChatMessagesStore.use.currentMessages();
  const currentChatPageId = ChatPageStore((s) => s.chatPageId);
  const getChatMessagesById = api.chatPage.getById.useQuery({
    id: currentChatPageId,
  });
  const setCurrentMessages = ChatMessagesStore.use.setCurrentMessages();
  console.log("re-rendering chat area with id:", currentChatPageId);

  useEffect(() => {
    console.log("current chat page id changed, fetching latest chat messages");
    setCurrentMessages(getChatMessagesById.data?.messages ?? []);
  }, [
    currentChatPageId,
    getChatMessagesById.data?.messages,
    setCurrentMessages,
  ]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-4 p-4">
        {currentChatPageMessages.map((message, index) => (
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
