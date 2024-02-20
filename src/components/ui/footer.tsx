import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RefreshCwIcon } from "@/components/ui/icons";
import ChatForm from "./chat-form";

export default function Footer() {
  return (
    <div className="mt-auto flex w-full border-t">
      <div className="w-64">
        <div className="flex items-center justify-between p-4">
          <Button className="flex items-center space-x-2" variant="secondary">
            <RefreshCwIcon className="h-4 w-4" />
            <span>Renew Plus</span>
          </Button>
          <Avatar>
            <AvatarImage
              alt="Alex Shan"
              src="/placeholder.svg?height=32&width=32"
            />
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <ChatForm />
    </div>
  );
}
