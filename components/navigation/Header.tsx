'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import SimproSvg from '@/public/Simplo_gray_main_sub.svg'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { navigation } from '@/data/navigation'

export function Header() {
  const [hideHeader, setHideHeader] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHideHeader(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        hideHeader ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
            <Image src={SimproSvg} alt="Simpro Logo" width={100} height={40} priority />
          </Link>
          <NavigationMenu viewport={false} className="hidden md:block">
            <NavigationMenuList className="space-x-8 font-medium tracking-wide">
              {navigation.map((item) =>
                item.children ? (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-4 p-4">
                        <li className="flex flex-col gap-2">
                          {item.children.map((child) => (
                            <NavigationMenuLink asChild key={child.href}>
                              <Link href={child.href}>{child.title}</Link>
                            </NavigationMenuLink>
                          ))}
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink
                      asChild
                      className={navigationMenuTriggerStyle()}
                    >
                      <Link href={item.href}>{item.title}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              )}
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
            menuOpen ? 'max-h-60 opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
          } bg-white/90 backdrop-blur-md px-6`}
        >
          <ul className="space-y-4 text-base">
            {navigation.map((item) => (
              <li key={item.title} className="space-y-2">
                {item.children ? (
                  <details>
                    <summary className="cursor-pointer">{item.title}</summary>
                    <ul className="mt-2 pl-4 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} onClick={() => setMenuOpen(false)}>
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link href={item.href} onClick={() => setMenuOpen(false)}>
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  )
}
