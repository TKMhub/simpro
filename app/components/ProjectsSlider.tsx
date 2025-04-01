"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import SimproJpeg from "@/public/Simplo_gray_main_sub.jpg";
// import { useEffect, useRef } from "react";

const projects = [
  {
    title: "プリケーションテンプレート",
    description: "Next.js+Supabaseで構築",
    image: SimproJpeg,
  },
  {
    title: "Webサイトテンプレート",
    description: "Next.js+Supabaseで構築",
    image: SimproJpeg,
  },
  {
    title: "業務自動化ツール",
    description: "VBAで構築",
    image: SimproJpeg,
  },
];

export function ProjectsSlider() {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: { perView: 1, spacing: 16 },
    renderMode: "performance",
    created(s) {
      setInterval(() => {
        s.next();
      }, 4000);
    },
  });

  return (
    <section id="projects" className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">実績紹介</h2>
        <div ref={sliderRef} className="keen-slider">
          {projects.map((project, i) => (
            <div
              key={i}
              className="keen-slider__slide bg-gray-100 rounded p-6 shadow"
            >
              <Image
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover rounded my-8 md:max-w-2xl md:mx-auto md:h-[400px]"
              />
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
