import { BlogPost } from "@/types/blog";
import { Client } from "@notionhq/client";
import { BlockObjectResponse, ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

//Blog記事ページのヘッダー取得用　
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
      author: page.properties.author?.rich_text?.[0]?.plain_text ?? "anonymous",
      publishedAt: page.properties.publishedAt?.date?.start ?? "",
    };
  });
}

export async function getPageContentByTitle(
  title: string
): Promise<BlockObjectResponse[] | string> {
  const parentPageId = process.env.NOTION_PARENT_PAGE_ID!;
  const children = await notion.blocks.children.list({
    block_id: parentPageId,
  });

  const match = children.results.find(
    (b) =>
      "type" in b &&
      b.type === "child_page" &&
      (b as any).child_page.title === title
  );

  if (!match) {
    return "404";
  }
  const content = await notion.blocks.children.list({
    block_id: match.id,
  });

  return content.results as BlockObjectResponse[];
}

export async function getProductsDocumentByTitle(
  title: string
): Promise<BlockObjectResponse[] | "404"> {
  const parentPageId = process.env.NOTION_PARENT_PRODUCTS_PAGE_ID;
  if (!parentPageId) throw new Error('NOTION_PARENT_PRODUCTS_PAGE_ID is not set');

  // 親ページ直下の child_page を全件取得（最大100件/ページなのでページネーション）
  let cursor: string | undefined = undefined;
  let matchedChildPageId: string | null = null;

  do {
    const children: ListBlockChildrenResponse = await notion.blocks.children.list({
      block_id: parentPageId,
      start_cursor: cursor,
      page_size: 100,
    });

    for (const b of children.results) {
      if ('type' in b && b.type === 'child_page') {
        // @notionhq/client の型が any 寄りなので安全に参照
        const pageTitle = (b as any).child_page?.title as string | undefined;
        if (pageTitle === title) {
          matchedChildPageId = b.id;
          break;
        }
      }
    }

    if (matchedChildPageId) break;
    cursor = children.has_more ? children.next_cursor ?? undefined : undefined;
  } while (cursor);

  if (!matchedChildPageId) return "404";

  // 一致ページの本文ブロックをページネーションで全件取得
  const blocks: BlockObjectResponse[] = [];
  let contentCursor: string | undefined = undefined;

  do {
    const content = await notion.blocks.children.list({
      block_id: matchedChildPageId,
      start_cursor: contentCursor,
      page_size: 100,
    });

    blocks.push(
      ...content.results.filter(
        (r): r is BlockObjectResponse => 'type' in r
      )
    );

    contentCursor = content.has_more ? content.next_cursor ?? undefined : undefined;
  } while (contentCursor);

  return blocks;
}