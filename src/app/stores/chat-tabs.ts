import { type ChatPage } from "@/types";
import { create } from "zustand";

type ChatTabsStore = {
  chatTabs: ChatPage[];
  setChatTabs: (newTabList: ChatPage[]) => void;
  addTab: (newTab: ChatPage) => void;
};

export const useChatTabsStore = create<ChatTabsStore>()((set) => ({
  chatTabs: [],
  setChatTabs(newTabList) {
    set({ chatTabs: newTabList });
  },
  addTab(newTab) {
    set((state) => ({
      chatTabs: [newTab, ...state.chatTabs],
    }));
  },
}));
