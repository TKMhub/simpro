import { BlogPost } from "@/types/blog";
import { Client } from "@notionhq/client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function getPublishedArticles(): Promise<BlogPost[]> {
  const databaseId = process.env.NOTION_DATABASE_ID!;

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "isPublished",
      checkbox: { equals: true },
    },
    sorts: [
      {
        property: "publishedAt",
        direction: "descending",
      },
    ],
  });

  return response.results.map((page: any) => {
    const title = page.properties.title?.title?.[0]?.plain_text ?? "No title";

    return {
      id: page.id,
      title,
      slug: page.properties.slug?.rich_text?.[0]?.plain_text ?? "",
      category: page.properties.category?.select?.name ?? "Uncategorized",
      tags: page.properties.tags?.multi_select?.map((t: any) => t.name) ?? [],
      publishedAt: page.properties.publishedAt?.date?.start ?? "",
    };
  });
}
