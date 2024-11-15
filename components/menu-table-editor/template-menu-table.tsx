"use client";

import {
  flexRender,
  getCoreRowModel,
  Header,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TemplateCategory, TemplateItem, useCreateColumns } from "./column";
import { cn } from "@/lib/utils";
import { CSSProperties, useId, useState } from "react";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function TemplateMenuTable({
  templateCategories,
  templateItems,
}: {
  templateCategories: TemplateCategory[];
  templateItems: TemplateItem[];
}) {
  const [columnId, setColumnId] = useState(
    templateCategories.sort((a, b) => a.order - b.order).map((c) => c.id)
  );
  const [templateMenuName, setTemplateMenuName] = useState("");
  const [templateMenuCategories, setTemplateMenuCategories] =
    useState(templateCategories);
  console.log(templateMenuCategories);

  const table = useReactTable({
    data: templateItems,
    columns: useCreateColumns(templateMenuCategories),
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    defaultColumn: {
      minSize: 40,
    },
    state: {
      columnOrder: columnId,
    },
    onColumnOrderChange: setColumnId,
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnId((columnId) => {
        const oldIndex = columnId.findIndex((id) => id === active.id);
        const newIndex = columnId.findIndex((id) => id === over.id);
        return arrayMove(columnId, oldIndex, newIndex);
      });
    }
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const id = useId();

  const addTemplateCategory = () => {
    const newCustomCategory: TemplateCategory = {
      id: crypto.randomUUID(),
      category_name: `customCategory${templateMenuCategories.length + 1}`,
      display_name: `カスタム${templateMenuCategories.length + 1}`,
      width: 100,
      order: templateMenuCategories.length,
    };
    setTemplateMenuCategories([...templateMenuCategories, newCustomCategory]);
  };

  return (
    <div className="m-4 w-fit max-w-full overflow-auto">
      <div className="flex justify-between items-center mb-8">
        <Input
          type="text"
          placeholder="テンプレートver.1"
          className="w-96"
          value={templateMenuName}
          onChange={(e) => setTemplateMenuName(e.target.value)}
        />

        <div className="flex gap-2">
          <Button variant="outline" onClick={addTemplateCategory}>
            テンプレートカテゴリーを追加
          </Button>
          <Button>保存</Button>
        </div>
      </div>

      <DndContext
        id={id}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <Table
          className="rounded-md border"
          style={{ width: table.getCenterTotalSize() }}
        >
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <SortableContext
                  items={columnId}
                  strategy={horizontalListSortingStrategy}
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <DraggableTableHeader key={header.id} header={header} />
                    );
                  })}
                </SortableContext>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </DndContext>
    </div>
  );
}

const DraggableTableHeader = ({
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
