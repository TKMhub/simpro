// app/blog/page.tsx
import { getPublishedArticles } from "@/lib/notion";
import { BlogPost } from "@/types/blog";
import { BlogGrid } from "../components/blog/BlogGrid";

export default async function HomePage() {
  const posts: BlogPost[] = await getPublishedArticles();

  // Notion → BlogGrid 用の型に変換（author/日付などは仮）
  const blogs = posts.map((post) => ({
    title: post.title,
    date: post.publishedAt,
    author: post.author,
    imageUrl: undefined,
  }));

  return (
    <div>
      <section>
        <h1 className="px-20 py-4 mt-8 text-2xl text-gray-800">記事一覧</h1>
        <div className="px-20 py-2">
          <BlogGrid blogs={blogs} />
        </div>
      </section>
    </div>
  );
}
