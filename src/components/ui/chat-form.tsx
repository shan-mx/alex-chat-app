"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";

import { ChatMessagesStore } from "@/app/stores/chat-messages";
import { ChatPageStore } from "@/app/stores/chat-page";
import { useState } from "react";

export default function ChatForm() {
  const chatPageId = ChatPageStore((s) => s.chatPageId);
  const [messageContent, setMessageContent] = useState("");
  const addMessage = ChatMessagesStore.use.addMessage();
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
