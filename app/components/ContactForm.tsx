"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { toast } from "sonner";

type FormData = {
  name: string;
  email: string;
  message: string;
  agree: boolean;
};

export function ContactForm() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: FormData) => {
    setLoading(true);
    setTimeout(() => {
      toast.success("お問い合わせありがとうございます！");
      reset();
      setLoading(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-xl">
        <h2 className="text-3xl font-bold text-center mb-8">お問い合わせ</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            rows={5}
            {...register("message", { required: true })}
          />

          <div className="flex items-center space-x-2">
            <Checkbox id="agree" {...register("agree", { required: true })} />
            <label htmlFor="agree" className="text-sm">
              個人情報の取扱いに同意します
            </label>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "送信中..." : "送信する"}
          </Button>
        </form>
      </div>
    </section>
  );
}
