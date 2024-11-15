"use client";

import { flexRender, Header } from "@tanstack/react-table";
import { TableHead } from "@/components/ui/table";
import { TemplateItem } from "./column";
import { cn } from "@/lib/utils";
import { CSSProperties } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export const DraggableTableHeader = ({
  header,
}: {
  header: Header<TemplateItem, unknown>;
}) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: header.column.id,
    });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: "width transform 0.2s ease-in-out",
    whiteSpace: "nowrap",
    width: header.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <TableHead
      key={header.id}
      className="relative px-0.5"
      colSpan={header.colSpan}
      ref={setNodeRef}
      style={{
        width: `${header.getSize()}px`,
        ...style,
      }}
    >
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger className="w-full">
            {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent side="top">
              <button className="" {...attributes} {...listeners}>
                🟰
              </button>
            </TooltipContent>
          </TooltipPortal>

          <div
            {...{
              onDoubleClick: () => header.column.resetSize(),
              onMouseDown: (e) => {
                // blur処理を強制的に実行
                const activeElement = document.activeElement as HTMLElement;
                if (activeElement) {
                  activeElement.blur();
                }
                // その後、resize処理を実行
                header.getResizeHandler()(e);
              },
              onTouchStart: header.getResizeHandler(),
              className: cn(
                "absolute inset-y-0 right-0 h-full w-1 bg-gray-500 cursor-col-resize touch-none",
                header.column.getIsResizing()
                  ? "bg-blue-500 opacity-100"
                  : "hover:opacity-100 opacity-0"
              ),
            }}
          />
        </Tooltip>
      </TooltipProvider>
    </TableHead>
  );
};
