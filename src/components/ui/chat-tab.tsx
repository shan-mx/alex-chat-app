import { useChatPageStore } from "@/app/stores/chat-page";
import { type ChatPage } from "@/types";

export default function ChatTab(chat: ChatPage) {
  const { chatPageId, setChatPageId } = useChatPageStore();

  return (
    <div
      className={`border-b p-4 ${chatPageId === chat.id ? "bg-slate-100" : "hover:bg-slate-100"}`}
      onClick={() => setChatPageId(chat.id)}
    >
      <h3 className="text-sm font-semibold text-gray-400">
        {chat.createdAt.toString()}
      </h3>
      <h3 className="mt-2 block w-full text-left text-sm text-black">
        {chat.title}
      </h3>
    </div>
  );
}
