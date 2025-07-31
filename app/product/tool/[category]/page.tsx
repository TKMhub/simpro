import { ProductGrid } from "@/app/components/product/ProductGrid";
import { getProductsByTypeAndCategory } from "@/lib/product";
import { notFound } from "next/navigation";
import { ProductBreadcrumbs } from "@/app/components/product/ProductBreadcrumbs";
import { generateBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";
import Script from "next/script";

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ category: string }> | { category: string };
}) {
  const { category: raw } = await params;
  const category = decodeURIComponent(raw);
  const products = await getProductsByTypeAndCategory("TOOL", category);

  if (products.length === 0) {
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
    <section className="px-20 py-4 mt-8">
      <Script id="breadcrumb-product-category-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>

      <ProductBreadcrumbs type="tool" category={category} title="" />
      <h1 className="py-4 mt-4 text-2xl text-gray-800">
        プロダクト一覧<span>（{category}）</span>
      </h1>
      <div className="py-2">
        <ProductGrid tools={products} />
      </div>
    </section>
  );
}
