// app/products/categories/[productType]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Product } from "@/types/product";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
// 参考と同じカード配置を再利用
import { ProductGrid } from "@/app/components/product/ProductGrid";
import { getPublishedProducts } from "@/lib/product";

type PageProps = {
  params: { productType: string };
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

export default async function ProductTypePage({ params }: PageProps) {
  // 1) URLパラメータを正規化
  const normalized = normalizeTypeParam(decodeURIComponent(params.productType));
  if (!normalized) {
    notFound();
  }

  // 2) Supabase から「全件」取得（既存の getPublishedProducts を利用）
  const all = await getPublishedProducts();

  // 3) 取得後にフロント側で type 絞り込み（TOOL / TEMPLATE）
  const filtered = all.filter((p) => p.type === normalized);

  // 4) カテゴリでグルーピング
  const grouped: Record<string, Product[]> = filtered.reduce((acc, p) => {
    const key = p.category ?? "未分類";
    (acc[key] ||= []).push(p);
    return acc;
  }, {} as Record<string, Product[]>);

  const totalCount = filtered.length;
  const productTypeLabel = normalized.toLowerCase(); // パンくずの表示用

  // 5) パンくず（URL構造に忠実）
  const crumbs: Crumb[] = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: productTypeLabel, current: true },
  ];

  return (
    <section className="px-4 sm:px-8 md:px-16 lg:px-20 py-4 mt-8">
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
        <h1 className="text-2xl font-bold capitalize">
          {productTypeLabel} カテゴリ一覧
        </h1>
        <p className="text-sm text-muted-foreground">
          合計 <span className="font-semibold">{totalCount}</span> 件
        </p>
      </div>

      {/* カテゴリごとにセクション化し、参考と同じカード配置（ProductGrid）で表示 */}
      <div className="py-4 space-y-10">
        {Object.entries(grouped).map(([category, items]) => (
          <section key={category} className="space-y-4">
            <div className="flex items-baseline justify-between">
              <h2 className="text-lg font-semibold">{category}</h2>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-muted-foreground">{items.length} 件</span>
                <Link
                  href={`/products/categories/${encodeURIComponent(
                    productTypeLabel
                  )}/${encodeURIComponent(category)}`}
                  className="text-blue-600 hover:underline"
                >
                  詳細を見る
                </Link>
              </div>
            </div>

            {/* 参考と同じカードUI */}
            <ProductGrid tools={items} />
          </section>
        ))}

        {/* 0件時の表示（任意） */}
        {Object.keys(grouped).length === 0 && (
          <div className="text-sm text-muted-foreground py-10">
            まだ {productTypeLabel} に該当する公開プロダクトはありません。
          </div>
        )}
      </div>
    </section>
  );
}
