'use client'
import Link from 'next/link'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePathname } from 'next/navigation'

export function CategoryTabs() {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const type = segments[2] || 'tool'

  return (
    <Tabs value={type} className="mb-4">
      <TabsList className="justify-start gap-2">
        <TabsTrigger value="tool" asChild>
          <Link href="/products/tool/webtool" className="capitalize">
            tool
          </Link>
        </TabsTrigger>
        <TabsTrigger value="template" asChild>
          <Link href="/products/template/web" className="capitalize">
            template
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
