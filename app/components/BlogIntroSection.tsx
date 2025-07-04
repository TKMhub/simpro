"use client";
import { motion } from "framer-motion";
import { BookOpenText, Newspaper } from "lucide-react";
import Link from "next/link";

export function BlogIntroSection() {
  return (
    <section className="bg-gray-50 py-20 px-4">
      <motion.div
        className="max-w-5xl mx-auto text-center space-y-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="flex justify-center items-center gap-2 text-blue-600">
          <BookOpenText size={28} />
          <span className="text-sm font-medium tracking-wide uppercase">
            Simproブログのご紹介
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          ITと業務改善を、<span className="text-blue-600">わかりやすく</span>
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          キャリア戦略、プロジェクト管理、プログラミングの初歩など、
          実践的なノウハウをシンプルに解説する情報ブログです。
        </p>
        <Link
          href="/blog"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition"
        >
          記事一覧を見る
        </Link>
      </motion.div>
    </section>
  );
}
