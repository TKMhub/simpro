import type { Metadata } from 'next'
import { Header } from '@/components/navigation/Header'
import { Footer } from '@/app/components/Footer'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Product distribution',
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-[130px]">{children}</main>
      <Footer />
    </div>
  )
}
