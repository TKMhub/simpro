import { getPublishedProducts } from "@/lib/product";
import { generateBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";
import Script from "next/script";
import { ProductBreadcrumbs } from "../components/product/ProductBreadcrumbs";
import { ProductGrid } from "../components/product/ProductGrid";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ProductsPage() {
  const products = await getPublishedProducts();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const breadcrumbItems = [
    { name: "Home", url: `${baseUrl}/` },
    { name: "Products", url: `${baseUrl}/products` },
  ];
  const jsonLd = generateBreadcrumbJsonLd(breadcrumbItems);

  return (
    <section className="px-4 sm:px-8 md:px-16 lg:px-20 py-4 mt-8">
      <Script id="breadcrumb-products-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>

      <ProductBreadcrumbs />
      <div className="flex items-center justify-between py-4 mt-8">
        <h1 className="text-2xl text-gray-800">プロダクト一覧</h1>
        <Link href="/products/new">
          <Button
            size="sm"
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            新規登録
          </Button>
        </Link>
      </div>
      <div className="py-2">
        <ProductGrid tools={products} />
      </div>
    </section>
  );
}
