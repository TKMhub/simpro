// app/page.tsx
import { Header } from "@/app/components/Header";
import { HeroSection } from "@/app/components/HeroSection";
import { ServicesSection } from "@/app/components/ServicesSection";
import { ProjectsSlider } from "@/app/components/ProjectsSlider";
import { ContactForm } from "@/app/components/ContactForm";
import { Footer } from "@/app/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* 固定ヘッダー */}
      <Header />

      {/* ヒーローセクション */}
      <HeroSection />

      {/* サービス紹介 */}
      <ServicesSection />

      {/* 実績紹介 */}
      <ProjectsSlider />

      {/* お問い合わせフォーム */}
      <ContactForm />

      {/* フッター */}
      <Footer />
    </main>
  );
}
