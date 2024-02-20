import { type ChatPage } from "@/types";
import { create } from "zustand";
import { createSelectors } from "./utils";

type ChatTabsStore = {
  currentTabs: ChatPage[];
  setCurrentTabs: (newTabList: ChatPage[]) => void;
  addTab: (newTab: ChatPage) => void;
};

export const ChatTabsStore = createSelectors(
  create<ChatTabsStore>()((set) => ({
    currentTabs: [],
    setCurrentTabs(newTabList) {
      set({ currentTabs: newTabList });
    },
    addTab(newTab) {
      set((state) => ({
        currentTabs: [newTab, ...state.currentTabs],
      }));
    },
  })),
);
