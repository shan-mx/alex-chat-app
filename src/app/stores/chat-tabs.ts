import { type ChatPage as ChatTab } from "@/types";
import { create } from "zustand";

type ChatTabsStore = {
  chatTabs: ChatTab[];
  setChatTabs: (newTabList: ChatTab[]) => void;
  addTab: (newTab: ChatTab) => void;
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
