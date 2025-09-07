"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MainPage() {
  const router = useRouter();

  const notices = [
    {
      id: 1,
      title: "주요 공지사항입니다.",
      date: "2025.09.03",
      content: "중요한 공지사항 내용입니다.",
    },
    {
      id: 2,
      title: "시스템 업데이트 안내",
      date: "2025.09.01",
      content: "시스템 업데이트가 예정되어 있습니다.",
    },
  ];

  const handleMoreNotices = () => {
    router.push("/notice");
  };

  const handleNoticeClick = (noticeId: number) => {
    router.push(`/notice?id=${noticeId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      <Header currentPage="main" />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Hero Section with Main Image */}
        <div className="mb-12">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div className="relative h-96 lg:h-[500px]">
              <Image
                src="/KakaoTalk_20250906_200724704.png"
                alt="NESICS Main Visual"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-blue-900/50 to-transparent">
                <div className="flex items-center h-full px-8 lg:px-12">
                  <div className="text-white max-w-2xl">
                    <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
                      NESICS
                    </h1>
                    <h2 className="text-xl lg:text-2xl font-light mb-6 text-cyan-100">
                      통합관제시스템
                    </h2>
                    <p className="text-lg text-gray-200 leading-relaxed">
                      첨단 기술로 구현된 지능형 통합관제시스템으로
                      <br />
                      안전하고 효율적인 관제 서비스를 제공합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notice Section */}
        <div className="mb-12">
          {/* Notice Board */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">📢</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">공지사항</h3>
              </div>
              <button
                onClick={handleMoreNotices}
                className="text-base text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                더보기 →
              </button>
            </div>

            <div className="space-y-6">
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4
                      className="text-lg text-gray-800 font-semibold hover:text-blue-600 cursor-pointer transition-colors"
                      onClick={() => handleNoticeClick(notice.id)}
                    >
                      {notice.title}
                    </h4>
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                      {notice.date}
                    </span>
                  </div>
                  <p className="text-gray-600">{notice.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
