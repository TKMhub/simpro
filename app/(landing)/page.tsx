import { HeroSection } from "@/app/components/HeroSection";
import { ServicesSection } from "@/app/components/ServicesSection";
import { ProjectsSlider } from "@/app/components/ProjectsSlider";
import { ContactForm } from "@/app/components/ContactForm";
import { BlogIntroSection } from "../components/BlogIntroSection";
import { ProductIntroSection } from "../components/ProductIntroSection";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* ヒーローセクション */}
      <HeroSection />
      {/* サービス紹介 */}
      <ServicesSection />
      {/* 実績紹介 */}
      <ProjectsSlider />
      {/* ブログ紹介 */}
      <BlogIntroSection />
      {/* プロダクト配布紹介 */}
      <ProductIntroSection />
      {/* お問い合わせフォーム */}
      <ContactForm />
    </main>
  );
}
