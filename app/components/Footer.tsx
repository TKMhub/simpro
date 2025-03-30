import { Facebook, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div>
          <p className="text-sm">
            &copy; 2025 Simpro Inc. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-4">
          <a href="#" aria-label="Facebook">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" aria-label="Twitter">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" aria-label="Instagram">
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
