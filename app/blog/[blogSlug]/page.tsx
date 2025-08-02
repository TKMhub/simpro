import { renderBlock } from "@/app/components/blog/NotionRenderer";
import { Breadcrumbs } from "@/app/components/blog/Breadcrumbs";
import { generateBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";
import { getPublishedArticles, getPageContentByTitle } from "@/lib/notion";
import { Badge } from "@/components/ui/badge";
import { tagColors } from "@/lib/utils/tag_color";
import { CalendarIcon, UserCircleIcon } from "lucide-react";
import { BlockObjectResponse } from "@notionhq/client";
import Script from "next/script";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ blogSlug: string }> | { blogSlug: string };
}) {
  const { blogSlug: raw } = await params;
  const blogSlug = decodeURIComponent(raw);

  const posts = await getPublishedArticles();
  const post = posts.find((p) => p.title === blogSlug);

  if (!post) throw new Error("システムエラーです。");

  let content: BlockObjectResponse[] = [];

  try {
    const fetched = await getPageContentByTitle(post.title);
    if (!fetched || !Array.isArray(fetched)) {
      throw new Error("記事内容の取得に失敗しました。");
    }
    content = fetched;
  } catch (err) {
    console.log(err);
    throw new Error("記事内容の取得に失敗しました。");
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
    <div className="px-20 py-4 mt-8">
      <Breadcrumbs category={post.category} title={post.title} />
      <div className="max-w-3xl mx-auto py-12">
        <Script id="breadcrumb-jsonld" type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </Script>
        <header className="mb-8 border-b pb-6">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CalendarIcon className="w-4 h-4" />
              <p>{post.publishedAt}</p>
            </div>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-4 y-3 text-sm text-gray-600">
            <div className="flex items-center gap-2 p-3">
              <UserCircleIcon className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
          </div>
          <div className="mt-1 text-sm text-gray-500 flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-1">
              {post.tags.map((tag) => (
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

        <article className="prose dark:prose-invert max-w-none">
          {content.map((block) => (
            <div key={block.id}>{renderBlock(block)}</div>
          ))}
        </article>
      </div>
    </div>
  );
}
