"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import SimproSvg from "@/public/Simplo_gray_main_sub.svg";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuContentForSimpro,
} from "@/components/ui/navigation-menu";
import { navigation } from "@/data/navigation";
import { HeaderBlog } from "./HeaderBlog";
import { HeaderProduct } from "./HeaderProduct";

export function Header() {
  const [hideHeader, setHideHeader] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // PC用
  const [menuOpen, setMenuOpen] = useState(false); // SPアコーディオン
  const pathname = usePathname();

  // SPの「子メニュー開閉」状態を項目タイトルごとに保持
  const [mobileOpenMap, setMobileOpenMap] = useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(
        navigation
          .filter((i) => i.children && i.children.length > 0)
          .map((i) => [i.title, false])
      ) as Record<string, boolean>
  );

  // スクロールでヘッダー自動隠し
  useEffect(() => {
    const handleScroll = () => setHideHeader(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ルートが変わったらSPメニューは閉じる＆サブアコーディオンも閉じる
  useEffect(() => {
    setMenuOpen(false);
    setMobileOpenMap(
      (prev) =>
        Object.fromEntries(Object.keys(prev).map((k) => [k, false])) as Record<
          string,
          boolean
        >
    );
    setOpenDropdown(null);
  }, [pathname]);

  const toggleMobileSection = (title: string) =>
    setMobileOpenMap((prev) => ({ ...prev, [title]: !prev[title] }));

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        hideHeader ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="bg-white shadow-sm">
        {/* --- TOP BAR --- */}
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          {/* 左：ロゴ（SP/PC共通） */}
          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
            <Image
              src={SimproSvg}
              alt="Simpro Logo"
              width={100}
              height={40}
              priority
            />
            {pathname.startsWith("/blog") && (
              <span className="text-blue-600">- Blog</span>
            )}
            {pathname.startsWith("/products") && (
              <span className="text-blue-600">- Products</span>
            )}
          </Link>

          {/* 右：PCメニュー（md以上のみ表示＝挙動は従来のまま） */}
          <nav className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="space-x-6 font-medium tracking-wide">
                {navigation.map((item) => {
                  return (
                    <NavigationMenuItem
                      key={item.title}
                      className="relative"
                      onMouseEnter={() => setOpenDropdown(item.title)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {item.children && item.children.length > 0 ? (
                        <>
                          <NavigationMenuTrigger>
                            <span className="cursor-pointer">
                              <Link href={item.href}>{item.title}</Link>
                            </span>
                          </NavigationMenuTrigger>
                          <NavigationMenuContentForSimpro
                            isOpen={openDropdown === item.title}
                          >
                            {item.children}
                          </NavigationMenuContentForSimpro>
                        </>
                      ) : (
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className={
                              pathname.startsWith(item.href)
                                ? "text-blue-600"
                                : "hover:underline"
                            }
                          >
                            {item.title}
                          </Link>
                        </NavigationMenuLink>
                      )}
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* 右：ハンバーガー（SPのみ表示） */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="メニューを開閉"
              aria-controls="mobile-accordion"
              aria-expanded={menuOpen}
              className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
              <span className="sr-only">メニュー</span>
            </button>
          </div>
        </div>

        {/* --- SP：アコーディオンメニュー（白背景、上→下アニメ） --- */}
        <div
          id="mobile-accordion"
          className={`md:hidden overflow-hidden bg-white transition-all duration-300 ${
            menuOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <ul className="space-y-4 text-base">
              {navigation.map((item) => {
                const hasChildren = !!item.children?.length;
                const opened = hasChildren ? mobileOpenMap[item.title] : false;

                return (
                  <li key={item.title} className=" pb-6">
                    <div className="flex items-center justify-between gap-2">
                      {/* タイトル：押下でそのページへ遷移 */}
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className={`block font-medium ${
                          pathname.startsWith(item.href) ? "text-blue-600" : ""
                        }`}
                      >
                        {item.title}
                      </Link>

                      {/* Blog/Products 等：三角トグルで子を開閉 */}
                      {hasChildren && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleMobileSection(item.title);
                          }}
                          aria-label={`${item.title} を展開`}
                          aria-expanded={opened}
                          className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <ChevronDown
                            size={20}
                            className={`transition-transform ${
                              opened ? "rotate-180" : "rotate-0"
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* 子メニュー：アコーディオン（自動高さの滑らかアニメ） */}
                    {hasChildren && (
                      <div
                        className={`grid transition-all duration-300 ease-out ${
                          opened
                            ? "grid-rows-[1fr] opacity-100 mt-2"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <ul className="overflow-hidden pl-4 space-y-2 text-sm">
                          {item.children!.map((child) => (
                            <li key={child.title}>
                              <Link
                                href={child.href}
                                onClick={() => setMenuOpen(false)}
                                className="block py-1"
                              >
                                - {child.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {/* --- /SPアコーディオン --- */}
      </div>

      {/* コンテキスト別サブヘッダー（既存のまま） */}
      {pathname.startsWith("/blog") && <HeaderBlog />}
      {pathname.startsWith("/products") && <HeaderProduct />}
    </header>
  );
}
