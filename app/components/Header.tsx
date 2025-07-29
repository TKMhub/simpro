"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
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
  const [hideHeader, setHideHeader] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setHideHeader(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        hideHeader ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
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
            <NavigationMenuList className="space-x-8 font-medium tracking-wide">
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
                <Link
                  href="/blog"
                  className={
                    pathname.startsWith("/blog")
                      ? "text-blue-600"
                      : "hover:underline"
                  }
                >
                  Blog
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="/product"
                  className={
                    pathname.startsWith("/product")
                      ? "text-blue-600"
                      : "hover:underline"
                  }
                >
                  Product
                </Link>
              </NavigationMenuItem>
              {/* <NavigationMenuItem>
              <Link href="/template" className="hover:underline">
                Template
              </Link>
            </NavigationMenuItem> */}
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
          } bg-white/90 backdrop-blur-md px-6`}
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
              <Link
                href="/blog"
                onClick={() => setMenuOpen(false)}
                className={pathname.startsWith("/blog") ? "text-blue-600" : ""}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/product"
                onClick={() => setMenuOpen(false)}
                className={
                  pathname.startsWith("/product") ? "text-blue-600" : ""
                }
              >
                Product
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
