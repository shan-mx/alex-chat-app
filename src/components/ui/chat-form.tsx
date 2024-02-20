"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";

import { useState } from "react";

import { useChatMessagesStore } from "@/app/stores/chat-messages";
import { useChatPageStore } from "@/app/stores/chat-page";

export default function ChatForm() {
  const [messageContent, setMessageContent] = useState("");
  const [isUsingForm, setIsUsingForm] = useState(false);
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
      const tokens_list = data.content.split(" ");
      let response_current = "";
      let i = 0;

      const intervalId = setInterval(function () {
        response_current += tokens_list[i] + " ";
        updateLatestMessage({
          sender: data.sender,
          content: response_current,
        });
        i++;
        if (i === tokens_list.length) {
          setIsUsingForm(false);
          clearInterval(intervalId);
        }
      }, 200);
    },
  });

  return (
    <form
      className="flex flex-grow items-center p-4"
      onSubmit={(e) => {
        e.preventDefault();
        setIsUsingForm(true);
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
        disabled={isUsingForm}
      />
      <Button className="ml-4" variant="secondary" disabled={isUsingForm}>
        {isUsingForm ? "Sending" : "Send"}
      </Button>
    </form>
  );
}
