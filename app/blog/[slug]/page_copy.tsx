import { getPublishedArticles, getPageContentByTitle } from "@/lib/notion";
import { BlockObjectResponse } from "@notionhq/client";

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
    <div className="max-w-3xl mx-auto py-12 prose">
      <h1>{post.title}</h1>
      <p className="text-sm text-gray-500">
        {post.publishedAt} | {post.author}
      </p>
      <p className="text-xs text-gray-400">
        {post.category} | {post.tags.join(", ")}
      </p>

      {content.map((block) => {
        if (!isFullBlock(block)) return null;
        if (block.type === "paragraph") {
          return (
            <p key={block.id}>
              {block.paragraph.rich_text.map((t: any) => t.plain_text).join("")}
            </p>
          );
        }
        return null;
      })}
    </div>
  );
}

function isFullBlock(block: any): block is BlockObjectResponse {
  return block && "type" in block;
}
