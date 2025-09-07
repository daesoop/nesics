"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface NoticeData {
  id: number;
  title: string;
  date: string;
  content: string;
  author: string;
  views: number;
  isImportant: boolean;
}

export default function NoticePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [notices] = useState<NoticeData[]>([
    {
      id: 1,
      title: "주요 공지사항입니다.",
      date: "2025.09.03",
      content:
        "중요한 공지사항 내용입니다. 모든 사용자는 반드시 확인해 주시기 바랍니다.",
      author: "관리자",
      views: 125,
      isImportant: true,
    },
    {
      id: 2,
      title: "시스템 업데이트 안내",
      date: "2025.09.01",
      content:
        "시스템 업데이트가 예정되어 있습니다. 업데이트 시간: 2025년 9월 5일 오전 2시 ~ 4시",
      author: "관리자",
      views: 89,
      isImportant: true,
    },
    {
      id: 3,
      title: "정기 점검 안내",
      date: "2025.08.28",
      content: "매월 마지막 주 일요일 정기 점검이 진행됩니다.",
      author: "관리자",
      views: 67,
      isImportant: false,
    },
    {
      id: 4,
      title: "새로운 기능 추가 안내",
      date: "2025.08.25",
      content: "디바이스 관리 페이지에 실시간 모니터링 기능이 추가되었습니다.",
      author: "개발팀",
      views: 156,
      isImportant: false,
    },
    {
      id: 5,
      title: "사용자 매뉴얼 업데이트",
      date: "2025.08.20",
      content:
        "사용자 매뉴얼이 최신 버전으로 업데이트되었습니다. 다운로드 센터에서 확인하세요.",
      author: "관리자",
      views: 43,
      isImportant: false,
    },
    {
      id: 6,
      title: "보안 정책 변경 안내",
      date: "2025.08.15",
      content:
        "보안 강화를 위해 비밀번호 정책이 변경됩니다. 8자리 이상, 특수문자 포함 필수.",
      author: "관리자",
      views: 234,
      isImportant: true,
    },
  ]);

  const [selectedNotice, setSelectedNotice] = useState<NoticeData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 10;

  // 검색 필터 상태
  const [searchFilters, setSearchFilters] = useState({
    keyword: "",
    author: "",
    startDate: "",
    endDate: "",
    importantOnly: false,
  });

  // 검색 필터링 로직
  const filteredNotices = notices.filter((notice) => {
    const matchesKeyword =
      searchFilters.keyword === "" ||
      notice.title
        .toLowerCase()
        .includes(searchFilters.keyword.toLowerCase()) ||
      notice.content
        .toLowerCase()
        .includes(searchFilters.keyword.toLowerCase());

    const matchesAuthor =
      searchFilters.author === "" ||
      notice.author.toLowerCase().includes(searchFilters.author.toLowerCase());

    const matchesDateRange = (() => {
      if (!searchFilters.startDate && !searchFilters.endDate) return true;

      const noticeDate = new Date(notice.date.replace(/\./g, "-"));
      const startDate = searchFilters.startDate
        ? new Date(searchFilters.startDate)
        : null;
      const endDate = searchFilters.endDate
        ? new Date(searchFilters.endDate)
        : null;

      if (startDate && endDate) {
        return noticeDate >= startDate && noticeDate <= endDate;
      } else if (startDate) {
        return noticeDate >= startDate;
      } else if (endDate) {
        return noticeDate <= endDate;
      }
      return true;
    })();

    const matchesImportant = !searchFilters.importantOnly || notice.isImportant;

    return (
      matchesKeyword && matchesAuthor && matchesDateRange && matchesImportant
    );
  });

  // 페이지네이션 계산 (필터링된 결과 기준)
  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = filteredNotices.slice(
    indexOfFirstNotice,
    indexOfLastNotice
  );
  const totalPages = Math.ceil(filteredNotices.length / noticesPerPage);

  const handleNoticeClick = (notice: NoticeData) => {
    setSelectedNotice(notice);
    // URL에 id 파라미터 추가
    const url = new URL(window.location.href);
    url.searchParams.set("id", notice.id.toString());
    window.history.pushState({}, "", url);
    // 조회수 증가 (실제로는 API 호출)
    console.log(`Notice ${notice.id} viewed`);
  };

  const handleBackToList = () => {
    // 항상 공지사항 목록 페이지로 이동
    setSelectedNotice(null);
    router.push("/notice");
  };

  // URL 파라미터에서 공지사항 ID를 확인하여 자동으로 상세 페이지 표시
  useEffect(() => {
    const noticeId = searchParams.get("id");
    if (noticeId) {
      const notice = notices.find((n) => n.id === parseInt(noticeId));
      if (notice) {
        setSelectedNotice(notice);
      }
    } else {
      // URL에 id 파라미터가 없으면 목록 페이지로
      setSelectedNotice(null);
    }
  }, [searchParams, notices]);

  // 브라우저의 뒤로가기/앞으로가기 버튼 처리
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const url = new URL(window.location.href);
      const noticeId = url.searchParams.get("id");

      if (noticeId) {
        const notice = notices.find((n) => n.id === parseInt(noticeId));
        if (notice) {
          setSelectedNotice(notice);
        }
      } else {
        setSelectedNotice(null);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [notices]);

  const handleFilterChange = (field: string, value: string | boolean) => {
    setSearchFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  const handleSearch = () => {
    console.log("Search with filters:", searchFilters);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  const handleReset = () => {
    setSearchFilters({
      keyword: "",
      author: "",
      startDate: "",
      endDate: "",
      importantOnly: false,
    });
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    return dateString;
  };

  const renderNoticeList = () => (
    <div className="bg-white border border-gray-300 overflow-hidden">
      <div className="bg-gray-200 border-b border-gray-300 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">공지사항</h2>
          <div className="text-sm text-gray-600">
            총 {filteredNotices.length}건의 공지사항 (전체 {notices.length}건)
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* 검색 필터 영역 */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
            {/* 키워드 검색 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                키워드 검색
              </label>
              <input
                type="text"
                placeholder="제목, 내용 검색"
                value={searchFilters.keyword}
                onChange={(e) => handleFilterChange("keyword", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 작성자 검색 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                작성자
              </label>
              <select
                value={searchFilters.author}
                onChange={(e) => handleFilterChange("author", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">전체</option>
                <option value="관리자">관리자</option>
                <option value="개발팀">개발팀</option>
              </select>
            </div>

            {/* 시작 날짜 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                시작 날짜
              </label>
              <input
                type="date"
                value={searchFilters.startDate}
                onChange={(e) =>
                  handleFilterChange("startDate", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 종료 날짜 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                종료 날짜
              </label>
              <input
                type="date"
                value={searchFilters.endDate}
                onChange={(e) => handleFilterChange("endDate", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 중요 공지만 보기 */}
            <div className="flex items-end">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={searchFilters.importantOnly}
                  onChange={(e) =>
                    handleFilterChange("importantOnly", e.target.checked)
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  중요 공지만
                </span>
              </label>
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleReset}
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded flex items-center space-x-2 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>초기화</span>
            </button>
            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded flex items-center space-x-2 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span>검색</span>
            </button>
          </div>
        </div>
        {/* 공지사항 테이블 */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-700 w-16">
                  번호
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  제목
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-700 w-24">
                  작성자
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-700 w-32">
                  작성일
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-700 w-20">
                  조회수
                </th>
              </tr>
            </thead>
            <tbody>
              {currentNotices.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="border border-gray-300 px-4 py-8 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <div>
                        <p className="text-lg font-medium text-gray-600">
                          검색 결과가 없습니다
                        </p>
                        <p className="text-sm text-gray-500">
                          다른 검색 조건을 시도해보세요
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                currentNotices.map((notice, index) => (
                  <tr
                    key={notice.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-blue-50 cursor-pointer transition-colors`}
                    onClick={() => handleNoticeClick(notice)}
                  >
                    <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-700">
                      {notice.isImportant ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600">
                          중요
                        </span>
                      ) : (
                        indexOfFirstNotice + index + 1
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-sm">
                      <div className="flex items-center">
                        {notice.isImportant && (
                          <span className="text-red-500 mr-2">📢</span>
                        )}
                        <span
                          className={`${
                            notice.isImportant
                              ? "font-semibold text-gray-900"
                              : "text-gray-700"
                          } hover:text-blue-600 transition-colors`}
                        >
                          {notice.title}
                        </span>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-700">
                      {notice.author}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-700">
                      {formatDate(notice.date)}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-700">
                      {notice.views}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                이전
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 border ${
                      currentPage === page
                        ? "border-blue-500 bg-blue-600 text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                다음
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderNoticeDetail = () => (
    <div className="bg-white border border-gray-300 overflow-hidden">
      <div className="bg-gray-200 border-b border-gray-300 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">공지사항 상세</h2>
          <button
            onClick={handleBackToList}
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-4 py-2 border border-gray-600 flex items-center space-x-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>목록으로</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* 공지사항 헤더 */}
        <div className="border-b border-gray-200 pb-6 mb-6">
          <div className="flex items-center mb-4">
            {selectedNotice?.isImportant && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-600 mr-3">
                📢 중요공지
              </span>
            )}
            <h1 className="text-2xl font-bold text-gray-900">
              {selectedNotice?.title}
            </h1>
          </div>

          <div className="flex items-center text-sm text-gray-600 space-x-6">
            <div className="flex items-center space-x-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>작성자: {selectedNotice?.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>작성일: {selectedNotice?.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span>조회수: {selectedNotice?.views}</span>
            </div>
          </div>
        </div>

        {/* 공지사항 내용 */}
        <div className="prose max-w-none">
          <div className="bg-gray-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {selectedNotice?.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header currentPage="notice" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">공지사항</h1>
          <p className="text-gray-600">
            시스템 관련 공지사항을 확인할 수 있습니다.
          </p>
        </div>

        {selectedNotice ? renderNoticeDetail() : renderNoticeList()}
      </main>

      <Footer />
    </div>
  );
}
