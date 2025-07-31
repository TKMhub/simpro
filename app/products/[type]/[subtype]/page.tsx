import { ProductGrid } from '@/app/components/product/ProductGrid'
import { getProductsByTypeAndCategory } from '@/lib/product'
import { CategoryTabs } from '@/components/products/CategoryTabs'
import { SubCategoryTags } from '@/components/products/SubCategoryTags'

export default async function ProductSubCategoryPage({
  params,
}: {
  params: { type: string; subtype: string }
}) {
  const { type, subtype } = params
  const products = await getProductsByTypeAndCategory(type.toUpperCase(), decodeURIComponent(subtype))

  return (
    <section className="px-4 sm:px-8 md:px-16 lg:px-20 py-4 mt-8">
      <CategoryTabs />
      <SubCategoryTags type={type} />
      <div className="mt-6">
        {products.length > 0 ? (
          <ProductGrid tools={products} />
        ) : (
          <p className="text-gray-600">準備中...</p>
        )}
      </div>
    </section>
  )
}
