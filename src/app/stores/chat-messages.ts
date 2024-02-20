import { type ChatMessage } from "@/types";
import { create } from "zustand";

type ChatMessagesStore = {
  chatMessages: ChatMessage[];
  setChatMessages: (newMessageList: ChatMessage[]) => void;
  addMessage: (newMessage: ChatMessage) => void;
};

export const useChatMessagesStore = create<ChatMessagesStore>()((set) => ({
  chatMessages: [],
  setChatMessages(newMessageList) {
    set({ chatMessages: newMessageList });
  },
  addMessage(newMessage) {
    set((state) => ({
      chatMessages: [...state.chatMessages, newMessage],
    }));
  },
}));
