import { type ChatMessage } from "@/types";
import { create } from "zustand";
import { createSelectors } from "./utils";

type ChatMessagesStore = {
  currentMessages: ChatMessage[];
  setCurrentMessages: (newMessageList: ChatMessage[]) => void;
  addMessage: (newMessage: ChatMessage) => void;
};

export const ChatMessagesStore = createSelectors(
  create<ChatMessagesStore>()((set) => ({
    currentMessages: [],
    setCurrentMessages(newMessageList) {
      set({ currentMessages: newMessageList });
    },
    addMessage(newMessage) {
      set((state) => ({
        currentMessages: [...state.currentMessages, newMessage],
      }));
    },
  })),
);
