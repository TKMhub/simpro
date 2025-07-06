"use client";
import { motion } from "framer-motion";
import { BookOpenText, Newspaper } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// 仮のデータ。実際はNotion APIなどから取得してください。
const articles = [
  {
    title: "業務改善の第一歩とは？",
    description: "Excelマクロから始める業務効率化の実践手法を紹介。",
    date: "2024-06-01",
    image: "/images/sample1.jpg",
    slug: "improvement-start",
  },
  {
    title: "プロジェクトマネジメント超入門",
    description: "現場で使えるPMスキルとドキュメント管理のコツを伝授。",
    date: "2024-06-15",
    image: "/images/sample2.jpg",
    slug: "pm-beginners",
  },
  {
    title: "プログラミング初心者がつまずく5つの壁",
    description: "初学者にありがちな罠とその乗り越え方。",
    date: "2024-07-01",
    image: "/images/sample3.jpg",
    slug: "beginner-walls",
  },
];

export function BlogIntroSection() {
  return (
    <section
      id="blogIntro"
      className="relative min-h-[calc(100vh-64px)] py-[64px] px-4 bg-gradient-to-b from-white via-gray-50 to-gray-100"
    >
      <motion.div
        className="max-w-5xl mx-auto text-center space-y-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* 見出し */}
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

        {/* ブログ記事カード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.div
              key={i}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href="/blog">
                <div className="w-full h-40 relative">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 text-left space-y-1">
                  <p className="text-sm text-gray-500">{article.date}</p>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600">{article.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        {/* CTA */}
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
