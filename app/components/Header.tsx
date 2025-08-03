"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import SimproSvg from "@/public/Simplo_gray_main_sub.svg";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { navigation } from "@/data/navigation";
import { HeaderBlog } from "./HeaderBlog";
import { HeaderProduct } from "./HeaderProduct";

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
            {pathname.startsWith("/blog") && (
              <span className="text-blue-600">- Blog</span>
            )}
            {pathname.startsWith("/products") && (
              <span className="text-blue-600">- Products</span>
            )}
          </Link>

          <NavigationMenu>
            <NavigationMenuList className="space-x-6 font-medium tracking-wide">
              {navigation.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.children && item.children.length > 0 ? (
                    <>
                      <NavigationMenuTrigger>
                        <Link href={item.href}>{item.title}</Link>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="bg-white">
                        <ul className="w-[150px]">
                          {item.children.map((child) => (
                            <li key={child.title}>
                              <NavigationMenuLink asChild>
                                <Link href={child.href}>{child.title}</Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
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
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="transition-transform duration-200"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-60 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
          } bg-white/90 backdrop-blur-md px-6`}
        >
          <ul className="space-y-4 text-base">
            {navigation.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={
                    pathname.startsWith(item.href) ? "text-blue-600" : ""
                  }
                >
                  {item.title}
                </Link>
                {item.children && item.children.length > 0 && (
                  <ul className="pl-4 pt-1 space-y-2 text-sm">
                    {item.children.map((child) => (
                      <li key={child.title}>
                        <Link
                          href={child.href}
                          onClick={() => setMenuOpen(false)}
                        >
                          - {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {pathname.startsWith("/blog") && <HeaderBlog />}
      {pathname.startsWith("/products") && <HeaderProduct />}
    </header>
  );
}
