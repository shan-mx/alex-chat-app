"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";

import { useState } from "react";

import { useChatMessagesStore } from "@/app/stores/chat-messages";
import { useChatPageStore } from "@/app/stores/chat-page";

export default function ChatForm() {
  const [messageContent, setMessageContent] = useState("");
  const chatPageId = useChatPageStore((s) => s.chatPageId);
  const addMessage = useChatMessagesStore((s) => s.addMessage);
  const createMessage = api.chatMessage.create.useMutation({
    onSettled: () => {
      setMessageContent("");
    },
    onSuccess: () => {
      addMessage({
        sender: "You",
        content: messageContent,
      });
    },
  });
  return (
    <form
      className="flex flex-grow items-center p-4"
      onSubmit={(e) => {
        e.preventDefault();
        createMessage.mutate({
          content: messageContent,
          sender: "You",
          chatPageId: chatPageId,
        });
      }}
    >
      <Input
        placeholder="Message ChatGPT..."
        type="text"
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
      />
      <Button
        className="ml-4"
        variant="secondary"
        disabled={createMessage.isLoading}
      >
        {createMessage.isLoading ? "Sending" : "Send"}
      </Button>
    </form>
  );
}
