import { Button } from "@/components/ui/button";
import { LogOut, Settings, User } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { signOut } from "@/lib/actions/auth";
import { Avatar, AvatarImage } from "../ui/avatar";
import Link from "next/link";

export default async function UserMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          <Avatar>
            {/* <AvatarImage src="https://pbs.twimg.com/profile_images/1593962262997667840/0BWAQ2uP_400x400.jpg" /> */}
            <User className="ml-3 mt-3" />
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60">
        <div className="grid gap-4">
          <div className="flex justify-between">
            <div className="space-y-2"></div>
            {/* <ModeToggle /> */}
          </div>
          <div className="flex">
            <Link href="/setting">
              <Settings className="mr-3" />
              <p>設定</p>
            </Link>
          </div>
          <form action={signOut}>
            <button className="flex">
              <LogOut className="mr-3" />
              <p>ログアウト</p>
            </button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
