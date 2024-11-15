"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Input } from "../ui/input";
import { useState } from "react";

export type TemplateCategory = {
  id: string;
  category_name: string;
  display_name: string;
  width: number;
  order: number;
};

export type TemplateItem = {
  [key: string]: string | number;
};

export const useCreateColumns = (
  templateCategories: TemplateCategory[]
): ColumnDef<TemplateItem>[] => {
  const [categories, setCategories] = useState(templateCategories);
  console.log(templateCategories);

  const updateCategories = (category: TemplateCategory) => {
    setCategories((categories) =>
      categories.map((c) => (c.id === category.id ? category : c))
    );
  };

  return categories.map((category) => ({
    accessorKey: category.category_name,
    header: () => (
      <EditDisplayNameInputForm
        category={category}
        handleBlur={updateCategories}
      />
    ),
    size: category.width,
    id: category.id,
  }));
};

export const EditDisplayNameInputForm = ({
  category,
  handleBlur,
}: {
  category: TemplateCategory;
  handleBlur: (category: TemplateCategory) => void;
}) => {
  const [column, setColumn] = useState(category);

  return (
    <Input
      value={column.display_name}
      onChange={(e) => {
        const value = e.target.value;
        setColumn({ ...column, display_name: value });
      }}
      onBlur={() => {
        handleBlur(column);
      }}
      className="px-1"
    />
  );
};
