"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const categories = ["Skill", "Book", "Job", "Life", "Design"];

export function HeaderBlog() {
  const [hideHeader, setHideHeader] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY && currentY > 80) {
        setHideHeader(true); // 下スクロールで隠す
      } else {
        setHideHeader(false); // 上スクロールで表示
      }
      lastScrollY = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed z-40 w-full transition-transform duration-300 ${
        hideHeader ? "-translate-y-full" : "translate-y-0"
      } bg-neutral-800`}
    >
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
