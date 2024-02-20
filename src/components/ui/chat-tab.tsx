import { ChatPageStore } from "@/app/stores/chat-page";
import { type ChatPage } from "@/types";

export default function ChatTab(chat: ChatPage) {
  const setChatPageId = ChatPageStore((s) => s.setChatPageId);

  return (
    <div className="border-b p-4">
      <h3 className="text-sm font-semibold text-gray-400">
        {chat.createdAt.toString()}
      </h3>
      <button
        className="mt-2 block text-sm text-black"
        onClick={() => setChatPageId(chat.id)}
      >
        {chat.title}
      </button>
    </div>
  );
}
