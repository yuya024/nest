import { BookOpenCheck, Home } from "lucide-react";

import ToolbarButton from "./toolbar-button";
import UserMenu from "./user-menu";

export default async function Toolbar() {
  return (
    <div className="fixed overflow-hidden gap-2 bottom-8 left-1/2 backdrop-blur -translate-x-1/2 h-16 flex items-center border border-border/20 shadow-lg rounded-full p-2 bg-muted/30">
      <ToolbarButton href="/" icon={<Home />} title="ホーム" />
      <ToolbarButton
        href="/create-menu"
        icon={<BookOpenCheck />}
        title="メニューを作成"
      />
      {<UserMenu />}
    </div>
  );
}
