import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { tagColors } from "@/lib/utils/tag_color";

type BlogCardProps = {
  title: string;
  date: string;
  author: string;
  imageUrl?: string;
  tags?: string[];
};

export function BlogCard({
  title,
  date,
  author,
  imageUrl = "/",
  tags = [],
}: BlogCardProps) {
  return (
    <div className="bg-white shadow-md rounded-sm overflow-hidden">
      <div className="relative h-50 w-full bg-gray-300">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
      </div>
      <div className="px-4 py-3">
        <h3 className="text-base font-semibold truncate">{title}</h3>
        <div className="text-sm text-gray-500 flex justify-between mt-2">
          <span>{date}</span>
          <span>{author}</span>
        </div>

        {/* タグ表示部分 */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, idx) => (
              <Badge
                key={idx}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  tagColors[tag] || tagColors.default
                }`}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
