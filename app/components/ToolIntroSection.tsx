"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Wrench } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type Tool = {
  title: string;
  description: string;
  date: string;
  image: string;
  slug: string;
};

const tools: Tool[] = [
  {
    title: "Excel業務自動化マクロ集",
    description: "日報・勤怠・メール送信など、定型業務を一括自動化。",
    date: "2024-06-20",
    image: "/Simplo_gray_main_sub.jpg",
    slug: "excel-automation-tools",
  },
  {
    title: "請求書自動生成ツール",
    description: "顧客情報と取引履歴からPDF形式で一括出力。",
    date: "2024-06-25",
    image: "/Simplo_gray_main_sub.jpg",
    slug: "invoice-generator",
  },
  {
    title: "ファイル整理バッチツール",
    description: "フォルダ構成を自動で仕分け・整理するデスクトップツール。",
    date: "2024-07-01",
    image: "/Simplo_gray_main_sub.jpg",
    slug: "file-organizer",
  },
  {
    title: "PowerPointテンプレートジェネレータ",
    description: "プレゼン資料の基本構成をボタン1つで作成。",
    date: "2024-07-02",
    image: "/Simplo_gray_main_sub.jpg",
    slug: "ppt-template-gen",
  },
  {
    title: "業務日報簡易作成ツール",
    description: "日報記入を定型化。文章と表形式を自動出力。",
    date: "2024-07-03",
    image: "/Simplo_gray_main_sub.jpg",
    slug: "daily-report-maker",
  },
  {
    title: "ショートカットキー一覧表示アプリ",
    description: "主要ソフトの操作効率を劇的に上げる早見表。",
    date: "2024-07-04",
    image: "/Simplo_gray_main_sub.jpg",
    slug: "shortcut-guide",
  },
];

export function ToolIntroSection() {
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 640;
      setVisibleCount(isMobile ? 2 : 6);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="toolIntro"
      className="relative min-h-[calc(100vh-64px)] py-[64px] px-4 bg-gradient-to-b from-gray-50 via-white to-gray-50"
    >
      <motion.div
        className="max-w-5xl mx-auto text-center space-y-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* 見出し */}
        <div className="flex justify-center items-center gap-2 text-green-600">
          <Wrench size={28} />
          <span className="text-sm font-medium tracking-wide uppercase">
            自動化ツール配布
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          日々の業務を<span className="text-green-600">自動化</span>しませんか？
        </h2>

        <p className="text-gray-600 max-w-xl mx-auto">
          ExcelマクロやVBA、自作ツールなどを無料・一部有料で提供。
          作業効率を劇的に改善する仕組みを体験できます。
        </p>

        {/* カード一覧 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.slice(0, visibleCount).map((tool, i) => (
            <motion.div
              key={i}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <Link href={`/products`}>
                <div className="w-full h-40 relative">
                  <Image
                    src={tool.image}
                    alt={tool.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 text-left space-y-1">
                  <p className="text-sm text-gray-500">{tool.date}</p>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {tool.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/products"
          className="inline-block mt-6 bg-green-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-green-700 transition"
        >
          プロダクト一覧を見る
        </Link>
      </motion.div>
    </section>
  );
}
