"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription } from "@/components/ui/card";

// フォームデータ型定義
type FormData = {
  name: string;
  email: string;
  message: string;
  agree: boolean;
};

export function ContactForm() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success("お問い合わせありがとうございます！");
      reset();
      setLoading(false);
    }, 1000);
  };

  return (
    <section
      id="contact"
      className="bg-gradient-to-b from-white via-gray-50 to-gray-100 py-20"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12">
          お問い合わせ
        </h2>
        <div className="max-w-xl mx-auto">
          <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 rounded-xl">
            <CardContent className="p-6">
              <CardDescription className="text-sm text-muted-foreground mb-6">
                ご質問・ご相談などお気軽にご連絡ください。
              </CardDescription>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5 text-left"
              >
                <Input
                  placeholder="お名前"
                  {...register("name", { required: true })}
                />
                <Input
                  type="email"
                  placeholder="メールアドレス"
                  {...register("email", { required: true })}
                />
                <Textarea
                  placeholder="お問い合わせ内容"
                  rows={10}
                  {...register("message", { required: true })}
                />
                <div className="flex justify-center items-center gap-2">
                  <Checkbox
                    id="agree"
                    {...register("agree", { required: true })}
                  />
                  <label htmlFor="agree" className="text-sm leading-relaxed">
                    個人情報の取扱いに同意します
                  </label>
                </div>
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    disabled={loading}
                    variant="default"
                    className="w-1/3 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {loading ? "送信中..." : "送信する"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
