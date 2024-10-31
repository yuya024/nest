"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function ToolbarButton({
  href,
  icon,
  title,
}: {
  href: string;
  icon: ReactNode;
  title: string;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full hover:bg-accent/70 group"
            asChild
          >
            <Link href={href}>
              <Slot className="size-5">{icon}</Slot>
              <span className="sr-only">{title}</span>
              <div
                className={cn(
                  "size-2 absolute bottom-0 translate-y-1/2 bg-sky-500 shadow-[0_0_10px_theme(colors.sky.500)] transition duration-500 rounded-full",
                  !active && "opacity-0 scale-0"
                )}
              ></div>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent>
            <p>{title}</p>
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  );
}
