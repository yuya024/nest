"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react";
import { TemplateCategory, TemplateItem } from "./column";
import { getCoreRowModel, useReactTable, Table } from "@tanstack/react-table";
import { DisplayNameInput } from "./display-name-input";

type ContextType = {
  table: Table<TemplateItem>;
  columns: TemplateCategory[];
  addColumn: () => void;
  updateColumn: (column: TemplateCategory) => void;
  updateCoumns: Dispatch<SetStateAction<TemplateCategory[]>>;
  columnOrder: string[];
  setColumnOrder: Dispatch<SetStateAction<string[]>>;
};

const Context = createContext<ContextType>({} as ContextType);

export function TeamplteTableProvider({
  children,
  templateItems,
  templateCategories,
}: {
  children: ReactNode;
  templateItems: TemplateItem[];
  templateCategories: TemplateCategory[];
}) {
  const updateColumn = useCallback((column: TemplateCategory) => {
    setColumns((categories) =>
      categories.map((c) => (c.id === column.id ? column : c))
    );
  }, []);

  const [columns, setColumns] =
    useState<TemplateCategory[]>(templateCategories);
  const [columnOrder, setColumnOrder] = useState<string[]>(
    columns.map((c) => c.id)
  );

  const memolizeColumns = useMemo(() => {
    return columns.map((col) => ({
      accessorKey: col.category_name,
      header: () => (
        <DisplayNameInput category={col} handleBlur={updateColumn} />
      ),
      size: col.width,
      id: col.id,
    }));
  }, [columns, updateColumn]);

  const table = useReactTable({
    data: templateItems,
    columns: memolizeColumns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    defaultColumn: {
      minSize: 40,
    },
    state: {
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
  });
  const columnLength = columns.length;

  const addColumn = useCallback(() => {
    const newCustomCategory: TemplateCategory = {
      id: crypto.randomUUID(),
      category_name: `customCategory${columnLength + 1}`,
      display_name: `カスタム${columnLength + 1}`,
      width: 100,
      order: columnLength,
    };
    setColumns((currentValue) => [...currentValue, newCustomCategory]);
  }, [columnLength]);

  return (
    <Context.Provider
      value={{
        addColumn,
        columns,
        table,
        updateColumn,
        updateCoumns: setColumns,
        columnOrder,
        setColumnOrder,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useTable = () => useContext(Context);
