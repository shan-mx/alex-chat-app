import { create } from "zustand";

type ChatPageStore = {
  chatPageId: number;
  setChatPageId: (id: number) => void;
};

export const useChatPageStore = create<ChatPageStore>()((set) => ({
  chatPageId: 0,
  setChatPageId: (id) => set({ chatPageId: id }),
}));
