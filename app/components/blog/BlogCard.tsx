import Image from "next/image";

type BlogCardProps = {
  title: string;
  date: string;
  author: string;
  imageUrl?: string;
};

export function BlogCard({
  title,
  date,
  author,
  imageUrl = "/", // 仮画像
}: // imageUrl = "/placeholder.png", // 仮画像
BlogCardProps) {
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
      </div>
    </div>
  );
}
