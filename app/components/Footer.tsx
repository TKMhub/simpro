import { Github, Twitter, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div>
          <p className="text-sm">&copy; 2025 Simpro. All rights reserved.</p>
        </div>
        <div className="flex space-x-4">
          <Link
            href="https://x.com/taku201010?s=21"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </Link>
          <Link
            href="https://github.com/TKMhub"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github"
          >
            <Github className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
