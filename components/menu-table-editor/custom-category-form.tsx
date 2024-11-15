"use client";

import { Input } from "../ui/input";

export default function CustomCategoryForm() {
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
        <Button variant="outline" onClick={addTemplateCategory}>
          テンプレートカテゴリーを追加
        </Button>
        <Button>保存</Button>
      </div>
    </div>
  );
}
