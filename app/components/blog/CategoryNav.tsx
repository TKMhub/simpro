"use client";
import Link from "next/link";

const categories = ["Skill", "Book", "Job", "Life", "Design"];

export function CategoryNav() {
  return (
    <nav className="bg-neutral-800 w-full py-3">
      <ul className="flex justify-center gap-8">
        {categories.map((category) => (
          <li key={category}>
            <Link
              href={`/category/${category.toLowerCase()}`}
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
