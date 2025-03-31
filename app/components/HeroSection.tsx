"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <motion.section
      className="font-bold h-[60vh] md:h-[80vh] bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <h1 className="text-3xl md:text-7xl font-bold text-center bg-gray-600 p-4 rounded">
        シンプルに、最速で。
        <br />
        Simproへようこそ。
      </h1>
    </motion.section>
  );
}
