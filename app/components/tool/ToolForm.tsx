"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Contents } from "@/types/contents";

interface ToolFormProps {
  initial?: Contents;
}

type ToolFormInputs = {
  title: string;
  document: string;
  type: "TOOL" | "TEMPLATE";
  deliveryType: "FILE" | "URL";
  url: string;
  category: string;
  description: string;
  tags: string; // comma separated
};

export function ToolForm({ initial }: ToolFormProps) {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm<ToolFormInputs>({
    defaultValues: initial
      ? {
          title: initial.title,
          document: initial.document,
          type: initial.type,
          deliveryType: initial.deliveryType,
          url: initial.url ?? "",
          category: initial.category,
          description: initial.description ?? "",
          tags: initial.tags.join(","),
        }
      : {
          title: "",
          document: "",
          type: "TOOL",
          deliveryType: "FILE",
          url: "",
          category: "",
          description: "",
          tags: "",
        },
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: ToolFormInputs) {
    setLoading(true);
    try {
      const payload = {
        title: data.title,
        document: data.document,
        type: data.type,
        deliveryType: data.deliveryType,
        url: data.deliveryType === "URL" ? data.url : null,
        description: data.description,
        category: data.category,
        tags: data.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        isPublished: true,
      };
      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      if (file) {
        formData.append("file", file);
      }
      const method = initial ? "PUT" : "POST";
      const endpoint = initial ? `/api/contents/${initial.id}` : "/api/contents";
      const res = await fetch(endpoint, { method, body: formData });
      if (!res.ok) {
        throw new Error("Request failed");
      }
      toast.success(initial ? "更新しました" : "作成しました");
      router.push("/tool");
    } catch (err) {
      toast.error("エラーが発生しました");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!initial) return;
    if (!confirm("削除しますか？")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/contents/${initial.id}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error("Delete failed");
      }
      toast.success("削除しました");
      router.push("/tool");
    } catch (err) {
      toast.error("エラーが発生しました");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
      <Input placeholder="タイトル" {...register("title", { required: true })} />
      <Input placeholder="ドキュメントID" {...register("document", { required: true })} />
      <div className="flex gap-4">
        <Select
          defaultValue={initial?.type ?? "TOOL"}
          onValueChange={(v) => setValue("type", v as any)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="タイプ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TOOL">TOOL</SelectItem>
            <SelectItem value="TEMPLATE">TEMPLATE</SelectItem>
          </SelectContent>
        </Select>
        <Select
          defaultValue={initial?.deliveryType ?? "FILE"}
          onValueChange={(v) => setValue("deliveryType", v as any)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="配布方法" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="FILE">FILE</SelectItem>
            <SelectItem value="URL">URL</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Input placeholder="ダウンロードURL" {...register("url")} />
      <Input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      <Input placeholder="カテゴリ" {...register("category", { required: true })} />
      <Textarea placeholder="説明" {...register("description")}></Textarea>
      <Input placeholder="タグ（カンマ区切り）" {...register("tags")}></Input>
      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? "送信中..." : initial ? "更新" : "作成"}
        </Button>
        {initial && (
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            削除
          </Button>
        )}
      </div>
    </form>
  );
}

