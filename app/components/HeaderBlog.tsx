"use client";
import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import SimproSvg from "@/public/Simplo_gray_main_sub.svg";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const categories = ["Skill", "Book", "Job", "Life", "Design"];

export function HeaderBlog() {
  const [hideHeader, setHideHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setHideHeader(currentY > lastScrollY && currentY > 80);
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        hideHeader ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* 上段: 白背景（ロゴ + メニュー） */}
      <div className="bg-white shadow">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xl font-bold">
              <Image
                src={SimproSvg}
                alt="Simpro Logo"
                width={100}
                height={40}
                priority
              />
            </Link>
            <p className="text-black text-xl"> - Blog</p>
          </div>

          {/* Desktopメニュー */}
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="space-x-6">
              <NavigationMenuItem>
                <Link href="#top" className="hover:underline">
                  TOP
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#category" className="hover:underline">
                  カテゴリ
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#login" className="hover:underline">
                  ログイン
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* モバイルメニュー */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="transition-transform duration-200"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* モバイルメニュー表示部 */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-60 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
          } bg-white px-6`}
        >
          <ul className="space-y-4 text-base">
            <li>
              <Link href="#top" onClick={() => setMenuOpen(false)}>
                サービス
              </Link>
            </li>
            <li>
              <Link href="#projects" onClick={() => setMenuOpen(false)}>
                実績
              </Link>
            </li>
            <li>
              <Link href="#contact" onClick={() => setMenuOpen(false)}>
                お問い合わせ
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* 下段: 黒背景のカテゴリバー */}
      <nav className="bg-neutral-800 py-3">
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
    </header>
  );
}
