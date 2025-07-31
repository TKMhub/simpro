import { ProductGrid } from "@/app/components/product/ProductGrid";
import { getProductsByTypeAndCategory } from "@/lib/product";
import { ProductBreadcrumbs } from "@/app/components/product/ProductBreadcrumbs";
import { generateBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";
import { categoryDetails } from "@/data/categoryDetails";
import Image from "next/image";
import Script from "next/script";
import { notFound } from "next/navigation";

export default async function ProductTypeCategoryPage({
  params,
}: {
  params: { type: string; category: string };
}) {
  const { type, category: raw } = params;
  const category = decodeURIComponent(raw);
  const products = await getProductsByTypeAndCategory(type.toUpperCase(), category);

  const detail = categoryDetails[type]?.[category];

  if (!detail && products.length === 0) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const breadcrumbItems = [
    { name: "Home", url: `${baseUrl}/` },
    { name: "Products", url: `${baseUrl}/product` },
    { name: category },
  ];
  const jsonLd = generateBreadcrumbJsonLd(breadcrumbItems);

  return (
    <section className="px-20 py-4 mt-8 space-y-6">
      <Script id="breadcrumb-product-category-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>

      <ProductBreadcrumbs type={type} category={category} title="" />
      <h1 className="text-2xl text-gray-800">プロダクト一覧<span>（{category}）</span></h1>
      {detail && (
        <div className="flex flex-col items-center text-center gap-4">
          <Image
            src={detail.image}
            alt={category}
            width={600}
            height={400}
            className="w-full max-w-xl h-64 object-cover rounded-lg"
          />
          <p className="text-gray-700 leading-relaxed max-w-2xl">{detail.description}</p>
        </div>
      )}
      <div className="py-2">
        {products.length > 0 ? (
          <ProductGrid tools={products} />
        ) : (
          <p className="text-gray-600">準備中...</p>
        )}
      </div>
    </section>
  );
}
