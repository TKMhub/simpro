import { getPublishedProducts } from '@/lib/product'
import { CategoryTabs } from '@/components/products/CategoryTabs'
import { SubCategoryTags } from '@/components/products/SubCategoryTags'
import { ProductGrid } from '@/app/components/product/ProductGrid'

export default async function ProductsPage() {
  const products = await getPublishedProducts()
  return (
    <section className="px-4 sm:px-8 md:px-16 lg:px-20 py-4 mt-8">
      <CategoryTabs />
      <SubCategoryTags type="tool" />
      <div className="mt-6">
        <ProductGrid tools={products} />
      </div>
    </section>
  )
}
