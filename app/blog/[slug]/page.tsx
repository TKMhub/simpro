import { getPublishedArticles, getPageContentByTitle } from "@/lib/notion";
import { renderBlock } from "@/components/NotionRenderer";

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const posts = await getPublishedArticles();
  const post = posts.find((p) => p.title === decodeURIComponent(params.slug));

  if (!post) return <div>記事が見つかりません</div>;

  const content = await getPageContentByTitle(post.title);

  return (
    <div className="max-w-3xl mx-auto py-12 prose dark:prose-invert">
      <h1>{post.title}</h1>
      <p className="text-sm text-gray-500">
        {post.publishedAt} | {post.author}
      </p>
      <p className="text-xs text-gray-400">
        {post.category} | {post.tags.join(", ")}
      </p>

      <article>
        {content.map((block) => (
          <div key={block.id}>{renderBlock(block)}</div>
        ))}
      </article>
    </div>
  );
}
