import { Badge } from "@/components/ui/badge";
import { type ChatMessage } from "@/types";

export default function Message(message: ChatMessage) {
  return (
    <div className="flex-col space-y-2">
      <Badge className="w-16 justify-center">
        <p>{message.sender}</p>
      </Badge>
      <p className="flex break-all text-lg">{message.content}</p>
    </div>
  );
}
