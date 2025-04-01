import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Code,
  LayoutDashboard,
  Zap,
  MonitorCog,
  IterationCcw,
  University,
} from "lucide-react";

const services = [
  {
    icon: <Code size={32} />,
    title: "Webサイト構築",
    description: "React, Next.js を用いたWebサイトを開発します。",
  },
  {
    icon: <MonitorCog size={32} />,
    title: "Webシステム開発",
    description: "React, Next.js を用いたWebアプリを開発します。",
  },
  {
    icon: <LayoutDashboard size={32} />,
    title: "業務自動化支援",
    description: "Excelマクロで業務フローの自動化を実現します。",
  },
  {
    icon: <IterationCcw size={32} />,
    title: "システム運用保守支援",
    description: "ITシステムの運用や保守を対応します。",
  },
  {
    icon: <University size={32} />,
    title: "スキルレクチャー",
    description: "サイトやアプリの作成方法をレクチャーします。",
  },
  {
    icon: <Zap size={32} />,
    title: "ITコンサルティング",
    description: "DX戦略の立案から実行支援まで対応します。",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-16 bg-gray-100  min-h-screen">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">サービス紹介</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="transition-transform transform hover:scale-105 cursor-pointer"
            >
              <CardContent className="p-7 flex flex-col items-center gap-4">
                {service.icon}
                <CardTitle>{service.title}</CardTitle>
                <p className="text-sm text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
