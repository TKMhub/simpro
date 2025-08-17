"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ProductRecord } from "@/types/product";

const schema = z
  .object({
    title: z.string().min(1, "必須項目です"),
    document: z.string().min(1, "必須項目です"),
    type: z.enum(["TOOL", "TEMPLATE"]),
    category: z.string().min(1, "必須項目です"),
    tags: z.string().optional(),
    description: z.string().optional(),
    deliveryType: z.enum(["FILE", "URL"]),
    url: z.string().optional(),
    file: z.any().optional(),
    isPublished: z.boolean().optional(),
    authorId: z.string().min(1, "必須項目です"),
  })
  .refine(
    (data) => {
      if (data.deliveryType === "URL") {
        return !!data.url;
      }
      if (data.deliveryType === "FILE") {
        return !!data.file;
      }
      return true;
    },
    {
      message: "URL またはファイルを指定してください",
      path: ["url"],
    }
  );

type FormValues = z.infer<typeof schema>;

type Props = {
  defaultValues?: Partial<FormValues>;
  id?: number;
};

export function ProductForm({ defaultValues, id }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      document: defaultValues?.document ?? "",
      type: (defaultValues?.type as "TOOL" | "TEMPLATE") ?? "TOOL",
      category: defaultValues?.category ?? "",
      tags: defaultValues?.tags ?? "",
      description: defaultValues?.description ?? "",
      deliveryType: (defaultValues?.deliveryType as "FILE" | "URL") ?? "FILE",
      url: defaultValues?.url ?? "",
      file: undefined,
      isPublished: defaultValues?.isPublished ?? false,
      authorId: defaultValues?.authorId ?? "",
    },
  });

  useEffect(() => {
    if (!defaultValues?.document) {
      form.setValue("document", `${crypto.randomUUID()}`);
    }
  }, [defaultValues?.document, form]);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    const safeTitle = data.title.trim() || "無題プロダクト";
    const safeUrl = data.url?.trim() || null;

    const fields: Partial<ProductRecord> = {
      title: safeTitle,
      document: data.document,
      type: data.type,
      category: data.category,
      tags: `{${(data.tags ?? "")
        .split(/\s*,\s*/)
        .map((tag) => `"${tag}"`)
        .join(",")}}`,
      description: data.description || null,
      deliveryType: data.deliveryType,
      url: safeUrl,
      isPublished: data.isPublished ?? false,
      authorId: data.authorId,
      starRating: 0,
      downloadCount: 0,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(fields));
    if (data.file instanceof File) {
      formData.append("file", data.file);
    }

    const res = await fetch(id ? `/api/products/${id}` : "/api/products", {
      method: id ? "PUT" : "POST",
      body: formData,
    });

    setLoading(false);
    if (res.ok) {
      router.push("/products");
    } else {
      alert("送信に失敗しました");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-md mx-auto"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>タイトル</FormLabel>
              <FormControl>
                <Input {...field} className="max-w-md" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="document"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ドキュメントID</FormLabel>
              <FormControl>
                <Input {...field} className="max-w-md" readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col sm:flex-row gap-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="w-full sm:w-1/2">
                <FormLabel>種類</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full bg-white hover:bg-gray-50">
                      <SelectValue placeholder="選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TOOL">tool</SelectItem>
                      <SelectItem value="TEMPLATE">template</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deliveryType"
            render={({ field }) => (
              <FormItem className="w-full sm:w-1/2">
                <FormLabel>配布方法</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full bg-white hover:bg-gray-50">
                      <SelectValue placeholder="選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FILE">FILE</SelectItem>
                      <SelectItem value="URL">URL</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>カテゴリー</FormLabel>
              <FormControl>
                <Input {...field} className="max-w-md" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>タグ（カンマ区切り）</FormLabel>
              <FormControl>
                <Input {...field} className="max-w-md" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>説明</FormLabel>
              <FormControl>
                <Textarea rows={5} {...field} className="max-w-md" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.watch("deliveryType") === "URL" ? (
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input {...field} className="max-w-md" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ファイル</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                    className="max-w-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="isPublished"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>公開する</FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="authorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>作者ID</FormLabel>
              <FormControl>
                <Input {...field} className="max-w-md" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-4">
          <Button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            {loading ? "送信中..." : "保存"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
