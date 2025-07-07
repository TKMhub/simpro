"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpenText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type Article = {
  title: string;
  slug: string;
  description?: string; // Notionには無いので省略または対応するプロパティ追加
  date: string;
  image?: string; // 現状Notion側で画像がないので optional
};

export function BlogIntroSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [visibleCount, setVisibleCount] = useState(6); // 初期は6件表示

  // 画面サイズによって表示数を調整（スマホは2件）
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 640;
      setVisibleCount(isMobile ? 2 : 6);
    };
    handleResize(); // 初期実行
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch("/api/articles");
      const data = await res.json();
      // description や image がない場合は適当に補完
      const filled = data.map((a: any) => ({
        title: a.title,
        slug: a.slug,
        description: "Simproブログ記事です。",
        date: a.publishedAt,
        image: "/images/sample1.jpg",
      }));
      setArticles(filled);
    };
    fetchArticles();
  }, []);

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.slice(0, visibleCount).map((article, i) => (
            <motion.div
              key={i}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/blog/${article.slug}`}>
                <div className="w-full h-40 relative">
                  <Image
                    src={article.image || "/images/sample1.jpg"}
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
