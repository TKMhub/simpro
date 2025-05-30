"use client";
import { useState } from "react";
import { BlogCard } from "./BlogCard";

type Blog = {
  title: string;
  date: string;
  author: string;
  imageUrl?: string;
};

interface BlogGridProps {
  blogs: Blog[];
}

export function BlogGrid({ blogs }: BlogGridProps) {
  const [visibleCount, setVisibleCount] = useState(8);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 16);
  };

  return (
    <section className="mx-auto px-6 py-8">
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {blogs.slice(0, visibleCount).map((blog, index) => (
            <BlogCard
              key={index}
              title={blog.title}
              date={blog.date}
              author={blog.author}
              imageUrl={blog.imageUrl}
            />
          ))}
        </div>

        {visibleCount < blogs.length && (
          <div className="text-center mt-8">
            <button
              onClick={handleLoadMore}
              className="text-gray-700 hover:underline"
            >
              ↓もっと見る
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
