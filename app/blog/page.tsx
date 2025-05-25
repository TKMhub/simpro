import Link from "next/link";
import { BlogGrid } from "../components/blog/BlogGrid";
import { CategoryNav } from "../components/blog/CategoryNav";
import { getPublishedArticles } from "@/lib/notion";
import { BlogPost } from "@/types/blog";

export default async function HomePage() {
  const posts: BlogPost[] = await getPublishedArticles();

  return (
    <>
      <BlogGrid />
      <div className="max-w-3xl mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6">Simpro Blog</h1>
        {posts.map((post) => (
          <div key={post.id} className="mb-8">
            <h2 className="text-xl font-semibold">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-sm text-gray-500">{post.publishedAt}</p>
            <p className="text-xs text-gray-400">
              {post.category} | {post.tags.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
