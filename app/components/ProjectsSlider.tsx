"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import SimproJpeg from "@/public/Simplo_gray_main_sub.jpg";

const projects = [
  {
    title: "アプリケーションテンプレート",
    description: "Next.js + Supabase で構築された業務用テンプレートです。",
    tags: ["Next.js", "Supabase", "TypeScript"],
    image: SimproJpeg,
  },
  {
    title: "Webサイトテンプレート",
    description: "静的＆動的なページに対応し、SEOとUIを強化した構成です。",
    tags: ["TailwindCSS", "SEO", "レスポンシブ"],
    image: SimproJpeg,
  },
  {
    title: "業務自動化ツール",
    description: "VBAでExcel作業を自動化し、工数を大幅削減するツール。",
    tags: ["Excel", "VBA", "業務効率化"],
    image: SimproJpeg,
  },
];

export function ProjectsSlider() {
  return (
    <section
      id="projects"
      className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-200 py-20"
    >
      <h2 className="text-4xl font-extrabold text-center mb-12">実績紹介</h2>

      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        initialSlide={0}
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={20}
        loop={false}
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-2xl  p-6 w-full transition duration-300 hover:scale-[1.02]">
              <Image
                src={project.image}
                alt={project.title}
                className="w-full h-48 md:h-64 object-cover rounded-xl mb-6"
              />
              <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-700 text-sm mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap justify-start gap-2 mb-6">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="text-left">
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition">
                  詳細を見る →
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
