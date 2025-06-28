"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Zap,
  LayoutDashboard,
  Wrench,
  Lightbulb,
  ThumbsUp,
  Cpu,
  Cloud,
} from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-[calc(100vh-64px)] pt-[64px] flex items-center justify-center px-4 bg-gradient-to-b from-white via-gray-50 to-gray-100"
    >
      {/* 左側モーションアイコン（デスクトップのみ表示） */}
      <motion.div
        className="hidden md:block absolute left-[10%] top-1/2 transform -translate-y-1/2 text-blue-300"
        animate={{ y: [0, -10, 0, 10, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Cpu size={100} />
      </motion.div>

      {/* 右側モーションアイコン（デスクトップのみ表示） */}
      <motion.div
        className="hidden md:block absolute right-[10%] top-1/2 transform -translate-y-1/2 text-blue-300"
        animate={{ y: [0, 10, 0, -10, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Cloud size={100} />
      </motion.div>

      <motion.div
        className="w-full max-w-screen-sm text-center space-y-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
      >
        {/* バッジ */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        ></motion.div>

        {/* 見出し */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-balance leading-tight text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          シンプルに、<span className="text-blue-600">最速で。</span>
          <br />
          Simproへようこそ。
        </motion.h1>

        {/* サブキャッチ */}
        <motion.p
          className="text-sm sm:text-base text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          ITツール制作 × 業務改善支援で、
          <br />
          あなたのビジネスにスピードと効率をお届けします。
        </motion.p>

        {/* 特徴アイコン */}
        <motion.div
          className="flex justify-center flex-wrap gap-4 mt-4 text-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Feature icon={Zap} text="高速開発" />
          <Feature icon={LayoutDashboard} text="UI重視" />
          <Feature icon={Wrench} text="カスタマイズ対応" />
        </motion.div>

        {/* 説明文カード */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <Card className="bg-white/80 shadow-xl rounded-2xl border border-gray-200 mt-4">
            <CardContent className="p-6 sm:p-8 flex flex-col items-center gap-4 text-center">
              <Lightbulb className="w-8 h-8 text-yellow-500 animate-bounce" />
              <p className="text-gray-800 text-lg sm:text-xl font-medium">
                <span className="text-blue-600 font-bold">誰しもが</span>{" "}
                使いやすく、
                <br className="hidden sm:block" />
                <span className="text-blue-600 font-bold">分かりやすい</span>
                アプリ・ツールを提供します。
              </p>
              <div className="text-sm text-gray-500">
                <ThumbsUp className="inline w-4 h-4 mr-1" />
                シンプルで、導入しやすいことを重視しています
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}

const Feature = ({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) => (
  <div className="flex items-center space-x-2 text-sm">
    <Icon className="w-5 h-5 text-blue-600" />
    <span>{text}</span>
  </div>
);
