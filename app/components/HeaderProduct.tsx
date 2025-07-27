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

const toolCategories = ["Webツール", "Gas", "Excel VBA", "Executable File"];
const templateCategories = ["Webサイトテンプレート", "Webアプリテンプレート"];
export function HeaderProduct() {
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
      <div className="bg-white shadow">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xl font-bold">
              <Image src={SimproSvg} alt="Simpro Logo" width={100} height={40} priority />
            </Link>
            <p className="text-black text-xl"> - Products</p>
          </div>
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
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="transition-transform duration-200">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
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
      <nav className="bg-neutral-800 py-3">
        <div className="flex justify-center gap-12">
          <div>
            <p className="text-white text-sm mb-1">tool</p>
            <ul className="flex gap-4">
              {toolCategories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/product/category/${encodeURIComponent(category)}`}
                    className="text-white text-lg hover:underline transition"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-white text-sm mb-1">template</p>
            <ul className="flex gap-4">
              {templateCategories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/product/category/${encodeURIComponent(category)}`}
                    className="text-white text-lg hover:underline transition"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
