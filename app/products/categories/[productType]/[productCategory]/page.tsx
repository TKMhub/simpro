// app/products/categories/[productType]/[productCategory]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getPublishedProducts } from "@/lib/product";
import { Product } from "@/types/product";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ProductGrid } from "@/app/components/product/ProductGrid";

type PageProps = {
  params: any;
};

type LinkCrumb = { name: string; href: string };
type CurrentCrumb = { name: string; current: true };
type Crumb = LinkCrumb | CurrentCrumb;

function normalizeTypeParam(param: string): "TOOL" | "TEMPLATE" | null {
  const p = param.toLowerCase();
  if (p === "tool") return "TOOL";
  if (p === "template") return "TEMPLATE";
  return null;
}

export default async function ProductCategoryPage({ params }: PageProps) {
  const normalizedType = normalizeTypeParam(
    decodeURIComponent(params.productType)
  );
  if (!normalizedType) {
    notFound();
  }

  const decodedCategory = decodeURIComponent(params.productCategory);

  // 1) Supabaseから全件取得
  const all = await getPublishedProducts();

  // 2) フロント側で type & category で絞り込み
  const items: Product[] = all.filter(
    (p) => p.type === normalizedType && p.category === decodedCategory
  );

  // typeだけ一致しているが対象カテゴリ0件なら空表示にする（404ではない）
  const totalCount = items.length;

  // パンくず: Products > [カテゴリ(type)] > [詳細カテゴリ(category)]
  const productTypeLabel = normalizedType.toLowerCase(); // 表示は小文字: tool / template
  const crumbs: Crumb[] = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    {
      name: productTypeLabel,
      href: `/products/categories/${productTypeLabel}`,
    },
    { name: decodedCategory, current: true },
  ];

  return (
    <section className="px-8 md:px-16 lg:px-20 py-4 mt-8">
      {/* パンくず */}
      <Breadcrumb className="mb-6 px-0 text-sm text-muted-foreground">
        <BreadcrumbList className="flex flex-wrap items-center gap-x-1 gap-y-1 sm:gap-x-2">
          {crumbs.map((c, i) => {
            const isCurrent = "current" in c;
            return (
              <div key={`${c.name}-${i}`} className="flex items-center">
                <BreadcrumbItem>
                  {isCurrent ? (
                    <BreadcrumbPage className="font-medium capitalize">
                      {c.name}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link
                        href={(c as LinkCrumb).href}
                        className="hover:text-primary hover:underline transition-colors capitalize"
                      >
                        {c.name}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isCurrent && (
                  <BreadcrumbSeparator>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </BreadcrumbSeparator>
                )}
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>

      {/* ヘッダー */}
      <div className="flex items-center justify-between py-2 mt-2">
        <h1 className="text-2xl font-bold">
          {decodedCategory}（{productTypeLabel}）
        </h1>
        <p className="text-sm text-muted-foreground">
          合計 <span className="font-semibold">{totalCount}</span> 件
        </p>
      </div>

      {/* 詳細カテゴリのみで絞り込んだコンテンツを、参考と同じカードUIで表示 */}
      <div className="py-4">
        {items.length > 0 ? (
          <ProductGrid tools={items} />
        ) : (
          <div className="text-sm text-muted-foreground py-10">
            該当する公開プロダクトはありません。
          </div>
        )}
      </div>
    </section>
  );
}
