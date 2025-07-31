'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from '@/components/ui/navigation-menu'
import type { NavItem } from '@/data/navigation'

export function DropdownNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname()
  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-8 font-medium tracking-wide">
        {items.map((item) =>
          item.children ? (
            <NavigationMenuItem key={item.title}>
              <NavigationMenuTrigger
                className={pathname.startsWith(item.href) ? 'underline decoration-blue-500' : ''}
              >
                {item.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="min-w-[150px] bg-white p-2 shadow-md rounded-md">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={child.href}
                          className="block px-3 py-2 hover:bg-blue-50 whitespace-nowrap"
                        >
                          {child.title}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={item.title}>
              <Link
                href={item.href}
                className={`hover:underline ${pathname === item.href ? 'underline decoration-blue-500' : ''}`}
              >
                {item.title}
              </Link>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
