"use client";
import { useState } from "react";
import { BlogCard } from "./BlogCard";

type Blog = {
  title: string;
  date: string;
  author: string;
  imageUrl?: string;
};

const allBlogs: Blog[] = [
  // 仮データ（本番はAPIやDBから取得）
  { title: "タイトル", date: "2025.5.23", author: "Taku" },
  { title: "タイトル", date: "2025.5.23", author: "Taku" },
  { title: "タイトル", date: "2025.5.23", author: "Taku" },
  { title: "タイトル", date: "2025.5.23", author: "Taku" },
  { title: "タイトル", date: "2025.5.23", author: "Taku" },
  { title: "タイトル", date: "2025.5.23", author: "Taku" },
  { title: "タイトル", date: "2025.5.23", author: "Taku" },
  { title: "タイトル", date: "2025.5.23", author: "Taku" },
];

export function BlogGrid() {
  const [visibleCount, setVisibleCount] = useState(6);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <section className="mx-auto px-6 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {allBlogs.slice(0, visibleCount).map((blog, index) => (
          <BlogCard
            key={index}
            title={blog.title}
            date={blog.date}
            author={blog.author}
            imageUrl={blog.imageUrl}
          />
        ))}
      </div>

      {visibleCount < allBlogs.length && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            className="text-gray-700 hover:underline"
          >
            もっと見る ↓
          </button>
        </div>
      )}
    </section>
  );
}
