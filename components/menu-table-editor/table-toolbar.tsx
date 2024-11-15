"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTable } from "./table-provider";

export function TableToolbar() {
  const [templateMenuName, setTemplateMenuName] = useState("");
  const { addColumn } = useTable();

  return (
    <div className="flex justify-between items-center mb-8">
      <Input
        type="text"
        placeholder="テンプレートver.1"
        className="w-96"
        value={templateMenuName}
        onChange={(e) => setTemplateMenuName(e.target.value)}
      />

      <div className="flex gap-2">
        <Button variant="outline" onClick={addColumn}>
          テンプレートカテゴリーを追加
        </Button>
        <Button>保存</Button>
      </div>
    </div>
  );
}
