import { create } from "zustand";
import { createSelectors } from "./utils";

type ChatPageStore = {
  chatPageId: number;
  setChatPageId: (id: number) => void;
};

export const ChatPageStore = createSelectors(
  create<ChatPageStore>()((set) => ({
    chatPageId: 0,
    setChatPageId: (id) => set({ chatPageId: id }),
  })),
);
