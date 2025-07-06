"use client";
import { motion } from "framer-motion";
import { Wrench, FileDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// 仮のデータ。実際はSupabaseやNotionなどから取得してください。
const tools = [
  {
    title: "Excel業務自動化マクロ集",
    description: "日報・勤怠・メール送信など、定型業務を一括自動化。",
    date: "2024-06-20",
    image: "/images/tool1.jpg",
    slug: "excel-automation-tools",
  },
  {
    title: "請求書自動生成ツール",
    description: "顧客情報と取引履歴からPDF形式で一括出力。",
    date: "2024-06-25",
    image: "/images/tool2.jpg",
    slug: "invoice-generator",
  },
  {
    title: "ファイル整理バッチツール",
    description: "フォルダ構成を自動で仕分け・整理するデスクトップツール。",
    date: "2024-07-01",
    image: "/images/tool3.jpg",
    slug: "file-organizer",
  },
];

export function ToolIntroSection() {
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

        {/* ツールカード表示 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <motion.div
              key={i}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/tools/${tool.slug}`}>
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
                  <p className="text-sm text-gray-600">{tool.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTAボタン */}
        <Link
          href="/tools"
          className="inline-block mt-6 bg-green-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-green-700 transition"
        >
          ツール一覧を見る
        </Link>
      </motion.div>
    </section>
  );
}
