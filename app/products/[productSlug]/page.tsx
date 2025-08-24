import { renderBlock } from "@/app/components/blog/NotionRenderer";
import { Breadcrumbs } from "@/app/components/blog/Breadcrumbs";
import { generateBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";
import { getPublishedArticles, getPageContentByTitle } from "@/lib/notion";
import { Badge } from "@/components/ui/badge";
import { tagColors } from "@/lib/utils/tag_color";
import { CalendarIcon, UserCircleIcon } from "lucide-react";
import { BlockObjectResponse } from "@notionhq/client";
import Script from "next/script";

type PageParams = {
  params: {
    blogSlug: string;
  };
};

export default async function BlogDetailPage({ params }: PageParams) {
  const blogSlug = decodeURIComponent(params.blogSlug);

  // 記事一覧の取得
  let posts: Array<{
    title: string;
    category: string;
    author: string;
    publishedAt: string;
    tags?: string[];
  }> = [];

  try {
    posts = await getPublishedArticles();
  } catch (e) {
    // 記事一覧自体が取得できない場合
    return (
      <div className="px-8 md:px-16 lg:px-20 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-sm text-muted-foreground py-10">
            記事一覧を取得できませんでした。しばらくしてから再度お試しください。
          </div>
        </div>
      </div>
    );
  }

  // URLの blogSlug（= title を想定）に一致する記事
  const post = posts.find((p) => p.title === blogSlug);

  // 0件（該当記事なし）の表示
  if (!post) {
    return (
      <div className="px-8 md:px-16 lg:px-20 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-sm text-muted-foreground py-10">
            表示できる件数がありませんでした。該当する公開記事はまだありません。
          </div>
        </div>
      </div>
    );
  }

  // 本文ブロックの取得
  let content: BlockObjectResponse[] = [];
  let contentFetchFailed = false;

  try {
    const fetched = await getPageContentByTitle(post.title);
    if (Array.isArray(fetched)) {
      content = fetched as BlockObjectResponse[];
    } else {
      contentFetchFailed = true;
    }
  } catch (e) {
    contentFetchFailed = true;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const breadcrumbItems = [
    { name: "Home", url: `${baseUrl}/` },
    { name: "Blog", url: `${baseUrl}/blog` },
    {
      name: post.category,
      url: `${baseUrl}/blog/category/${encodeURIComponent(post.category)}`,
    },
    { name: post.title },
  ];
  const jsonLd = generateBreadcrumbJsonLd(breadcrumbItems);

  return (
    <div className="px-8 md:px-16 lg:px-20 py-4 mt-8">
      {/* パンくず */}
      <Breadcrumbs category={post.category} title={post.title} />

      <div className="max-w-3xl mx-auto py-12">
        {/* 構造化データ */}
        <Script id="breadcrumb-jsonld" type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </Script>

        {/* ヘッダー */}
        <header className="mb-8 border-b pb-6">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CalendarIcon className="w-4 h-4" />
              <p>{post.publishedAt}</p>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <UserCircleIcon className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
          </div>

          {/* タグ */}
          <div className="mt-3 text-sm text-gray-500 flex flex-wrap items-center gap-2">
            {(post.tags ?? []).map((tag) => (
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
        </header>

        {/* 本文 or 0件・失敗時の案内 */}
        {contentFetchFailed ? (
          <div className="text-sm text-muted-foreground py-10 text-center">
            記事内容を取得できませんでした。しばらくしてから再度お試しください。
          </div>
        ) : content.length === 0 ? (
          <div className="text-sm text-muted-foreground py-10 text-center">
            表示できる件数がありませんでした。この記事の本文はまだ準備中です。
          </div>
        ) : (
          <article className="prose dark:prose-invert max-w-none">
            {content.map((block) => (
              <div key={block.id}>{renderBlock(block)}</div>
            ))}
          </article>
        )}
      </div>
    </div>
  );
}
