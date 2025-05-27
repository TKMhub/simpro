import { BlogPost } from "@/types/blog";
import { Client } from "@notionhq/client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function getPublishedArticles() {
  // : Promise<BlogPost[]>
  const databaseId = process.env.NOTION_DATABASE_ID!;

  checkNotionConnection();

  // const response: QueryDatabaseResponse = await notion.databases.query({
  //   database_id: databaseId,
  //   filter: {
  //     property: "IsPublished",
  //     checkbox: { equals: true },
  //   },
  //   sorts: [
  //     {
  //       property: "PublishedAt",
  //       direction: "descending",
  //     },
  //   ],
  // });

  return "";
  // return response.results.map((page: any) => ({
  //   id: page.id,
  //   title: page.properties.Title?.title?.[0]?.plain_text ?? "No title",
  //   slug: page.properties.Slug?.rich_text?.[0]?.plain_text ?? "",
  //   category: page.properties.Category?.select?.name ?? "Uncategorized",
  //   tags: page.properties.Tags?.multi_select?.map((t: any) => t.name) ?? [],
  //   publishedAt: page.properties.PublishedAt?.date?.start ?? "",
  // }));
}
export async function checkNotionConnection() {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID!;
    const response = await notion.databases.retrieve({
      database_id: databaseId,
    });

    console.log("✅ Notion database access successful");
    return {
      success: true,
      database: {
        id: response.id,
        title: response.title?.[0]?.plain_text ?? "(no title)",
      },
    };
  } catch (error: any) {
    console.error("❌ Notion API connection failed:", error.message || error);
    return {
      success: false,
      error: error.message || error,
    };
  }
}
