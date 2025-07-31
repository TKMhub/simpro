import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbsProps {
  category?: string;
  title?: string;
  type?: "tool" | "template";
}

type Crumb = {
  name: string;
  href?: string;
};

export function ProductBreadcrumbs({ category, title, type }: BreadcrumbsProps) {
  const items: Crumb[] = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/product" },
  ];

  if (category) {
    const base = type ? `/product/${type}` : "/product/category";
    items.push({
      name: category,
      href: `${base}/${encodeURIComponent(category)}`,
    });
  }

  if (title) {
    items.push({ name: title });
  }

  return (
    <Breadcrumb className="mb-6 px-4 sm:px-0 text-sm text-muted-foreground">
      <BreadcrumbList className="flex flex-wrap items-center gap-x-1 gap-y-1 sm:gap-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <div key={index} className="flex items-center">
              <BreadcrumbItem>
                {item.href && !isLast ? (
                  <BreadcrumbLink asChild>
                    <Link href={item.href} className="hover:text-primary hover:underline transition-colors capitalize">
                      {item.name}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="font-medium capitalize">{item.name}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </BreadcrumbSeparator>
              )}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
