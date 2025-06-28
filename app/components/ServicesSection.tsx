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
    description: "業務に即したWebアプリを構築します。",
  },
  {
    icon: <LayoutDashboard size={32} />,
    title: "業務自動化支援",
    description: "Excelマクロなどで業務を効率化します。",
  },
  {
    icon: <IterationCcw size={32} />,
    title: "システム運用保守支援",
    description: "ITシステムの運用・保守もお任せください。",
  },
  {
    icon: <University size={32} />,
    title: "スキルレクチャー",
    description: "初心者向けにアプリ開発をわかりやすく解説。",
  },
  {
    icon: <Zap size={32} />,
    title: "ITコンサルティング",
    description: "DX戦略の立案から実行支援まで対応します。",
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-gradient-to-b from-white via-gray-50 to-gray-100 py-20"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12">
          サービス紹介
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 rounded-xl hover:scale-[1.02]"
            >
              <CardContent className="p-6 flex flex-col items-center gap-4">
                <div className="text-blue-600">{service.icon}</div>
                <CardTitle className="text-lg font-semibold text-gray-800">
                  {service.title}
                </CardTitle>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
