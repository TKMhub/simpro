"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <>
      <motion.section
        className="font-bold h-[60vh] md:h-[80vh] bg-cover bg-center flex flex-col items-center justify-center text-center px-4"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <h1 className="text-3xl md:text-7xl font-bold bg-gray-600 p-4 rounded mb-4 text-white">
          シンプルに、最速で。
          <br />
          Simproへようこそ。
        </h1>
        <div className="text-base md:text-xl px-4 py-2 rounded flex">
          <span className="bold text-xl text-blue-700">・</span>
          <p className="bold text-xl">
            誰しも分かりやすく、使いやすいアプリやツールを提供します。
          </p>
        </div>
      </motion.section>
    </>
  );
}
