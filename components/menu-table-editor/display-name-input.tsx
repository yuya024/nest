"use client";

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

export const DisplayNameInput = ({
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
