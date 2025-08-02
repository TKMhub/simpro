"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CategoryButton } from "./CategoryButton";

const toolCategories = ["Webツール", "GAS", "Excel VBA", "Executable File"];
const templateCategories = ["Webサイトテンプレート", "Webアプリテンプレート"];

export function HeaderProduct() {
  const [activeTab, setActiveTab] = useState("tool");

  return (
    <div className="sticky top-16 z-40 bg-zinc-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-4 w-full">
            <TabsList className="flex gap-2">
              <TabsTrigger
                value="tool"
                className="capitalize data-[state=active]:text-blue-600 data-[state=active]:font-bold"
              >
                tool
              </TabsTrigger>
              <TabsTrigger
                value="template"
                className="capitalize data-[state=active]:text-blue-600 data-[state=active]:font-bold"
              >
                template
              </TabsTrigger>
            </TabsList>
            <div className="flex-1 sm:ml-6">
              <TabsContent value="tool" className="sm:mt-0 mt-2">
                <div className="flex flex-wrap gap-3">
                  {toolCategories.map((c) => (
                    <CategoryButton key={c} label={c} type="tool" />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="template" className="sm:mt-0 mt-2">
                <div className="flex flex-wrap gap-3">
                  {templateCategories.map((c) => (
                    <CategoryButton key={c} label={c} type="template" />
                  ))}
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
