import { ProductBreadcrumbs } from "@/app/components/product/ProductBreadcrumbs";

import { generateBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";
import { getProductBySlug } from "@/lib/product";
import { Badge } from "@/components/ui/badge";
import { tagColors } from "@/lib/utils/tag_color";
import { CalendarIcon, UserCircleIcon } from "lucide-react";
import Image from "next/image";
import Script from "next/script";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({ params }: { params: any }) {
  const { productSlug: raw } = await params;
  const productSlug = decodeURIComponent(raw);
  const product = await getProductBySlug(productSlug);

  if (!product) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const breadcrumbItems = [
    { name: "Home", url: `${baseUrl}/` },
    { name: "Products", url: `${baseUrl}/products` },
    { name: product.category },
    { name: product.title },
  ];
  const jsonLd = generateBreadcrumbJsonLd(breadcrumbItems);

  return (
    <div className="px-20 py-4 mt-8">
      <ProductBreadcrumbs category={product.category} title={product.title} />

      <div className="max-w-3xl mx-auto py-12">
        <Script id="breadcrumb-product-jsonld" type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </Script>

        <header className="mb-8 border-b pb-6">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              {product.title}（{product.category}）
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CalendarIcon className="w-4 h-4" />
              <p>{product.date}</p>
            </div>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-4 text-sm text-gray-600 mt-2">
            <div className="flex items-center gap-2 p-3">
              <UserCircleIcon className="w-4 h-4" />
              <span>{product.author}</span>
            </div>
          </div>
          <div className="mt-1 text-sm text-gray-500 flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-1">
              {product.tags.map((tag) => (
                <Badge
                  key={tag}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    tagColors[tag] || tagColors.default
                  }`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </header>
        <div className="mb-8">
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={600}
            height={400}
            className="w-full h-64 object-cover"
          />
        </div>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {product.description}
        </p>
        <div className="mt-6 text-center">
          {product.buttonType === "download" ? (
            <a
              href={product.buttonUrl}
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
              download
            >
              ダウンロード
            </a>
          ) : (
            <a
              href={product.buttonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
            >
              リンク
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
