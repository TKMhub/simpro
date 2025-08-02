"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CategoryButton({
  label,
  type,
}: {
  label: string;
  type: "tool" | "template";
}) {
  return (
    <Button
      asChild
      variant="secondary"
      size="sm"
      className="bg-white text-zinc-800 hover:bg-zinc-100 shadow"
    >
      <Link href={`/products/${type}/${encodeURIComponent(label)}`}>{label}</Link>
    </Button>
  );
}
