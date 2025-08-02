"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import clsx from "clsx";

const toolCategories = ["Webツール", "GAS", "Excel VBA", "Executable File"];
const templateCategories = ["Webサイトテンプレート", "Webアプリテンプレート"];

export function HeaderProduct() {
  const [activeTab, setActiveTab] = useState("tool");
  const [hideHeader, setHideHeader] = useState(false);
  const router = useRouter();

  // スクロール検知
  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastY && currentY > 80) {
        setHideHeader(true);
      } else {
        setHideHeader(false);
      }
      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 遷移処理
  const handleCategoryClick = (label: string) => {
    router.push(
      `/products/categories/${activeTab}/${encodeURIComponent(label)}`
    );
  };


  return (
    <div
      className={clsx(
        "fixed w-full z-40 transition-transform duration-300",
        hideHeader ? "-translate-y-full" : "translate-y-0",
        "bg-zinc-800 text-white"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start w-full">
            {/* タブ切り替え */}
            <TabsList className="flex gap-2">
              <TabsTrigger
                value="tool"
                className="capitalize data-[state=active]:text-blue-500 data-[state=active]:font-bold"
              >
                tool
              </TabsTrigger>
              <TabsTrigger
                value="template"
                className="capitalize data-[state=active]:text-blue-500 data-[state=active]:font-bold"
              >
                template
              </TabsTrigger>
            </TabsList>

            {/* カテゴリ一覧 */}
            <div className="flex-1 sm:ml-6">
              <TabsContent value="tool" className="sm:mt-0 mt-2">
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {toolCategories.map((c) => (
                    <CategoryButton
                      key={c}
                      label={c}
                      onClick={() => handleCategoryClick(c)}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="template" className="sm:mt-0 mt-2">
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {templateCategories.map((c) => (
                    <CategoryButton
                      key={c}
                      label={c}
                      onClick={() => handleCategoryClick(c)}
                    />
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

type CategoryButtonProps = {
  label: string;
  onClick: () => void;
};

function CategoryButton({ label, onClick }: CategoryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-2 py-1 sm:px-4 sm:py-2 rounded text-xs sm:text-sm transition",
        "bg-transparent text-white hover:bg-white/10",
        "border-none"
      )}
    >
      {label}
    </button>
  );
}
