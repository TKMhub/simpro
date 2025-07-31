'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

const toolCategories = ['webtool', 'gas', 'vba', 'exe']
const templateCategories = ['web', 'app']

export function SubCategoryTags({ type }: { type: string }) {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const current = segments[3] || ''
  const categories = type === 'template' ? templateCategories : toolCategories

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((c) => {
        const active = c === current
        return (
          <Button
            key={c}
            asChild
            variant={active ? 'secondary' : 'outline'}
            size="sm"
            className={active ? 'bg-blue-600 text-white border-blue-600' : ''}
          >
            <Link href={`/products/${type}/${c}`}>{c}</Link>
          </Button>
        )
      })}
    </div>
  )
}
