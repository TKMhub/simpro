import { Contents } from '@/types/contents';
import { getPublishedContents, getContentById } from '@/lib/supabase';
import { Tool } from '@/types/tool';

// Check if file path points to an image
function isImageFile(path: string | null | undefined): boolean {
  if (!path) return false;
  return /\.(png|jpe?g|gif|svg|webp)$/i.test(path);
}

// Convert Contents record to Tool type
function mapContentsToTool(item: Contents): Tool {
  const imageUrl = isImageFile(item.filePath)
    ? (item.filePath as string)
    : '/Simplo_gray_main_sub.jpg';

  return {
    title: item.title,
    category: item.category,
    description: item.description ?? '',
    date: item.createdAt,
    imageUrl,
    author: item.authorId,
    tags: item.tags,
    slug: item.id.toString(),
    buttonType: item.deliveryType === 'FILE' ? 'download' : 'link',
    buttonUrl:
      item.deliveryType === 'FILE'
        ? item.filePath ?? ''
        : item.url ?? '',
  };
}

export async function getPublishedTools(): Promise<Tool[]> {
  const contents = await getPublishedContents();
  return contents.filter((c) => c.type === 'TOOL').map(mapContentsToTool);
}

export async function getToolBySlug(slug: string): Promise<Tool | undefined> {
  const id = Number(slug);
  const content = await getContentById(id);
  return content && content.type === 'TOOL' ? mapContentsToTool(content) : undefined;
}

export async function getToolsByCategory(category: string): Promise<Tool[]> {
  const contents = await getPublishedContents();
  return contents
    .filter((c) => c.type === 'TOOL' && c.category === category)
    .map(mapContentsToTool);
}
