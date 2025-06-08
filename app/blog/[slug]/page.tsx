import { renderBlock } from "@/app/components/blog/NotionRenderer";
import { getPublishedArticles, getPageContentByTitle } from "@/lib/notion";

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const posts = await getPublishedArticles();
  const post = posts.find((p) => p.title === decodeURIComponent(params.slug));

  if (!post)
    return <div className="p-4 text-red-500">記事が見つかりません</div>;

  const content = await getPageContentByTitle(post.title);

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <header className="mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
        <p className="mt-2 text-sm text-gray-500">
          {post.publishedAt} | {post.author}
        </p>
        <p className="mt-1 text-sm text-gray-400">
          {post.category} | {post.tags.join(", ")}
        </p>
      </header>

      <article className="prose dark:prose-invert max-w-none">
        {content.map((block) => (
          <div key={block.id}>{renderBlock(block)}</div>
        ))}
      </article>
    </div>
  );
}
