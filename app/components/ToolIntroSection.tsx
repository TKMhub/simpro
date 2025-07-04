"use client";
import { motion } from "framer-motion";
import { Wrench, FileDown } from "lucide-react";
import Link from "next/link";

export function ToolIntroSection() {
  return (
    <section className="bg-white py-20 px-4">
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
        <Link
          href="/tools"
          className="inline-block bg-green-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-green-700 transition"
        >
          ツール一覧を見る
        </Link>
      </motion.div>
    </section>
  );
}
