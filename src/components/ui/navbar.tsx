"use client";

import { ChatPageStore } from "@/app/stores/chat-page";
import { ChatTabsStore } from "@/app/stores/chat-tabs";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { ChevronDownIcon, SettingsIcon } from "./icons";

export default function Navbar() {
  const setChatPageId = ChatPageStore((s) => s.setChatPageId);
  const addChatTab = ChatTabsStore((s) => s.addTab);

  const createChatPage = api.chatPage.create.useMutation({
    onSuccess: (data) => {
      console.log("Chat page created", data, "adding to tabs");
      setChatPageId(data.id);
      addChatTab({
        id: data.id,
        title: data.id.toString(),
        createdAt: data.createdAt.toString(),
      });
    },
  });
  return (
    <div className="flex border-b">
      <div className="w-64">
        <div className="flex items-center justify-between p-3">
          <Button
            className="text-lg font-semibold"
            onClick={() => {
              createChatPage.mutate();
            }}
          >
            New chat
          </Button>
          <SettingsIcon className="h-6 w-6" />
        </div>
      </div>

      <div className="flex-1 items-center justify-between p-4">
        <h1 className="text-xl font-semibold">ChatGPT 3.5</h1>
        <ChevronDownIcon className="h-6 w-6" />
      </div>
    </div>
  );
}
