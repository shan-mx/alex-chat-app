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
  const updateLatestMessage = useChatMessagesStore(
    (s) => s.updateLatestMessage,
  );
  const createUserMessage = api.chatMessage.create.useMutation({
    onSettled: () => {
      setMessageContent("");
    },
    onSuccess: (data) => {
      addMessage({
        sender: data.sender,
        content: data.content,
      });
      createAIMessage.mutate({
        sender: "ChatGPT",
        content: "You said: " + data.content,
        chatPageId: chatPageId,
      });
    },
  });
  const createAIMessage = api.chatMessage.create.useMutation({
    onSuccess: (data) => {
      addMessage({
        sender: data.sender,
        content: "",
      });
      const response = data.content;
      let response_all = "";
      for (const word of response.split(" ")) {
        setTimeout(() => {
          response_all += word + " ";
          console.log(response_all);
          updateLatestMessage({
            sender: data.sender,
            content: response_all,
          });
        }, 1000);
      }
    },
  });

  return (
    <form
      className="flex flex-grow items-center p-4"
      onSubmit={(e) => {
        e.preventDefault();
        createUserMessage.mutate({
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
        disabled={createUserMessage.isLoading}
      >
        {createUserMessage.isLoading ? "Sending" : "Send"}
      </Button>
    </form>
  );
}
