"use client";

import { useChatMessagesStore } from "@/app/stores/chat-messages";
import { useChatPageStore } from "@/app/stores/chat-page";
import { api } from "@/trpc/react";
import { useEffect, useRef } from "react";
import Message from "./chat-message";

export default function ChatArea() {
  const { chatMessages, setChatMessages } = useChatMessagesStore();
  const currentChatPageId = useChatPageStore((s) => s.chatPageId);
  const getChatMessagesById = api.chatPage.getById.useQuery({
    id: currentChatPageId,
  });
  console.log(
    "re-rendering chat area with latest message:",
    chatMessages[chatMessages.length - 1],
  );
  useEffect(() => {
    console.log("current chat page id changed, fetching latest chat messages");
    setChatMessages(getChatMessagesById.data?.messages ?? []);
  }, [currentChatPageId, getChatMessagesById.data?.messages, setChatMessages]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "instant", block: "end" });
  }, [chatMessages]);

  return (
    <main className="flex h-full flex-1 flex-col overflow-y-auto">
      <div className="flex-1 space-y-4 p-4">
        {chatMessages.length ? (
          chatMessages.map(
            (message, index) =>
              Boolean(message.content) && (
                <Message
                  key={index}
                  sender={message.sender}
                  content={message.content}
                />
              ),
          )
        ) : (
          <div className="flex items-center justify-center">
            <div className="text-lg text-gray-400">No chat history yet</div>
          </div>
        )}
      </div>
      <div ref={bottomRef} />
    </main>
  );
}
