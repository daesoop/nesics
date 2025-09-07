"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/main");
  };
  return (
    <footer className="bg-white/95 backdrop-blur-sm border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Image
              src="/logo.png"
              alt="NES Solution Logo"
              width={160}
              height={80}
              className="h-16 w-auto opacity-70 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={handleLogoClick}
            />
            <div
              className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
              onClick={handleLogoClick}
            >
              <div className="text-lg font-semibold">NES Solution</div>
              <div className="text-base">통합관제시스템</div>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            COPYRIGHT 2025 NESSOLUTION COMPANY. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
}
