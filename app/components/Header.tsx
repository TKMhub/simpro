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

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-white transition-all duration-300 shadow ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          <Image
            src={SimproSvg}
            alt="Simpro Logo"
            width={100}
            height={40}
            priority
          />
        </Link>

        {/* Desktopメニュー */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList className="space-x-6">
            <NavigationMenuItem>
              <Link href="#services" className="hover:underline">
                サービス
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#projects" className="hover:underline">
                実績
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#contact" className="hover:underline">
                お問い合わせ
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/tool" className="hover:underline">
                Tool
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/template" className="hover:underline">
                Template
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* モバイル用ハンバーガー */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="transition-transform duration-200"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* モバイルメニュー with アニメーション */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-60 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        } bg-white px-6`}
      >
        <ul className="space-y-4 text-base">
          <li>
            <Link href="#services" onClick={() => setMenuOpen(false)}>
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
          <li>
            <Link href="/blog" onClick={() => setMenuOpen(false)}>
              Blog
            </Link>
          </li>
          <li>
            <Link href="/tool" onClick={() => setMenuOpen(false)}>
              Tool
            </Link>
          </li>
          <li>
            <Link href="/template" onClick={() => setMenuOpen(false)}>
              Template
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
