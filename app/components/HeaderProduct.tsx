"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SimproSvg from "@/public/Simplo_gray_main_sub.svg";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CategoryButton } from "./CategoryButton";

const toolCategories = ["Webツール", "GAS", "Excel VBA", "Executable File"];
const templateCategories = ["Webサイトテンプレート", "Webアプリテンプレート"];

export function HeaderProduct() {
  const [hideHeader, setHideHeader] = useState(false);
  const [activeTab, setActiveTab] = useState("tool");

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setHideHeader(currentY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${hideHeader ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
            <Image src={SimproSvg} alt="Simpro Logo" width={100} height={40} priority />
            <span className="text-black">- Products</span>
          </Link>
          <div className="flex-1 mx-4 hidden md:block" />
          <nav className="flex gap-6 text-sm font-medium">
            <Link href="/" className="hover:underline">
              TOP
            </Link>
            <Link href="#category" className="hover:underline">
              カテゴリ
            </Link>
            <Link href="/login" className="hover:underline">
              ログイン
            </Link>
          </nav>
        </div>
        <div className="bg-zinc-800 text-white">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-3 justify-start gap-2">
                <TabsTrigger
                  value="tool"
                  className="capitalize data-[state=active]:bg-white data-[state=active]:text-zinc-800"
                >
                  tool
                </TabsTrigger>
                <TabsTrigger
                  value="template"
                  className="capitalize data-[state=active]:bg-white data-[state=active]:text-zinc-800"
                >
                  template
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tool">
                <div className="flex flex-wrap gap-3">
                  {toolCategories.map((c) => (
                    <CategoryButton key={c} label={c} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="template">
                <div className="flex flex-wrap gap-3">
                  {templateCategories.map((c) => (
                    <CategoryButton key={c} label={c} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </header>
  );
}
