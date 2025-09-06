'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { userId, password });
    
    // 간단한 로그인 검증 (실제로는 서버 API 호출)
    if (userId && password) {
      router.push('/main');
    } else {
      alert('아이디와 비밀번호를 입력해주세요.');
    }
  };

  const handleHelpDesk = () => {
    console.log('HelpDesk clicked');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden max-w-5xl w-full">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Company Info */}
          <div className="lg:w-1/2 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8 lg:p-12 flex flex-col justify-center text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
              <div className="absolute bottom-20 right-10 w-24 h-24 border border-white/20 rounded-full"></div>
              <div className="absolute top-1/2 right-20 w-16 h-16 border border-white/20 rounded-full"></div>
            </div>
            
            {/* Logo */}
            <div className="mb-12 text-center relative z-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 inline-block">
                <Image
                  src="/logo.png"
                  alt="NES Solution Logo"
                  width={180}
                  height={90}
                  className="mx-auto filter brightness-0 invert"
                />
              </div>
              <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto rounded-full"></div>
            </div>

            {/* System Info */}
            <div className="mb-12 text-center relative z-10">
              <div className="space-y-3">
                <h2 className="text-2xl font-light text-cyan-100 tracking-wide">에이아이스루션</h2>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
                  통합관제시스템
                </h3>
                <p className="text-xl font-semibold text-cyan-400 tracking-wider">NESICS</p>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="lg:w-1/2 bg-white p-8 lg:p-12 relative">
            {/* Header */}
            <div className="mb-10">
              <div className="text-right mb-2">
                <span className="text-sm font-medium text-gray-400 tracking-wider uppercase">Welcome to</span>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent text-right">
                Member LOGIN
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 ml-auto mt-3 rounded-full"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User ID Input */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">아이디</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="사용자 아이디를 입력하세요"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700 transition-all duration-200 placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  <input
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700 transition-all duration-200 placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl mt-8"
              >
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                  </svg>
                  로그인
                </span>
              </button>

              {/* Help Desk Button */}
              <button
                type="button"
                onClick={handleHelpDesk}
                className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-medium py-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg mt-4"
              >
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  HelpDesk 문의: 032-710-7079
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
