'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface HeaderProps {
  currentPage?: string;
}

export default function Header({ currentPage = 'main' }: HeaderProps) {
  const [selectedMenu, setSelectedMenu] = useState(currentPage);
  const router = useRouter();

  const handleLogout = () => {
    console.log('Logout clicked');
    router.push('/login');
  };

  const handleHome = () => {
    router.push('/main');
  };

  const handleMyPage = () => {
    router.push('/mypage');
  };

  const handleDevice = () => {
    console.log('Device clicked');
    // Device 페이지로 이동하거나 드롭다운 메뉴 표시
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left - Logo and System Name with Device Menu */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-5">
              <Image
                src="/logo.png"
                alt="NES Solution Logo"
                width={160}
                height={80}
                className="h-16 w-auto"
              />
              <div className="text-xl font-bold text-gray-800">
                통합관제시스템
              </div>
            </div>
            
            {/* Separator */}
            <div className="w-px h-6 bg-gray-300"></div>
            
            {/* Device Menu Text */}
            <span 
              onClick={handleDevice}
              className="text-xl font-bold text-gray-800 cursor-pointer hover:text-blue-600 transition-colors"
            >
              Device
            </span>
          </div>

          {/* Right - Navigation Menu */}
          <div className="flex items-center space-x-8">
            <nav className="flex space-x-8">
              <button
                onClick={handleHome}
                className={`text-base font-medium transition-colors py-2 ${
                  selectedMenu === 'main'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                홈
              </button>
              <button
                onClick={handleLogout}
                className="text-base font-medium text-gray-600 hover:text-blue-600 transition-colors py-2"
              >
                로그아웃
              </button>
              <button
                onClick={handleMyPage}
                className={`text-base font-medium transition-colors py-2 ${
                  selectedMenu === 'mypage'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                마이페이지
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
