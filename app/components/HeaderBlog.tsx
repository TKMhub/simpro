"use client";
import Link from "next/link";

const categories = ["Skill", "Book", "Job", "Life", "Design"];

export function HeaderBlog() {
  return (
    <nav className="sticky top-16 z-40 bg-neutral-800 py-3">
      <ul className="flex justify-center gap-8">
        {categories.map((category) => (
          <li key={category}>
            <Link
              href={`/blog/category/${category}`}
              className="text-white text-lg tracking-wide hover:underline transition"
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
