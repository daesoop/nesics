"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface SensorData {
  name: string;
  value: number | string;
  status: string;
}

interface RealtimeData {
  timestamp: string;
  화학수소: number;
  암모니아: number;
  진공: number;
  펌프: boolean;
}

export default function DeviceDetailPage() {
  const searchParams = useSearchParams();
  const deviceId = searchParams.get("id") || "NB-001";

  // 디바이스 기본 정보
  const [deviceInfo] = useState({
    id: deviceId,
    name: "나노버블 50A",
    model: "NES-50A",
    location: "공장 어촌장",
    status: "정상",
  });

  // 제어 스위치 상태
  const [controls, setControls] = useState({
    nanoBubble: true,
    ozoneGenerator: false,
  });

  // 센서 데이터
  const [sensorData] = useState<SensorData[]>([
    { name: "암력 A", value: 0, status: "X" },
    { name: "암력 B", value: 0, status: "X" },
    { name: "진공", value: 0, status: "X" },
    { name: "DO", value: 8.6, status: "X" },
    { name: "오존 농도", value: 0, status: "X" },
    { name: "유량", value: 0, status: "X" },
    { name: "온도", value: 20.4, status: "X" },
  ]);

  // 실시간 데이터
  const [realtimeData, setRealtimeData] = useState<RealtimeData[]>([]);

  // 실시간 데이터 생성 (시뮬레이션)
  useEffect(() => {
    const generateRealtimeData = () => {
      const now = new Date();
      const data: RealtimeData[] = [];

      for (let i = 0; i < 10; i++) {
        const timestamp = new Date(now.getTime() - i * 60000); // 1분 간격
        data.push({
          timestamp: timestamp.toLocaleString("ko-KR"),
          화학수소: Math.round((0.4 + Math.random() * 0.1) * 10) / 10,
          암모니아: Math.round((0.8 + Math.random() * 0.1) * 10) / 10,
          진공: Math.round((-6553.6 + Math.random() * 10) * 10) / 10,
          펌프: Math.random() > 0.5,
        });
      }

      setRealtimeData(data);
    };

    generateRealtimeData();
    const interval = setInterval(generateRealtimeData, 30000); // 30초마다 업데이트

    return () => clearInterval(interval);
  }, []);

  const handleToggle = (control: keyof typeof controls) => {
    setControls((prev) => ({
      ...prev,
      [control]: !prev[control],
    }));
  };

  const handleRefreshData = () => {
    console.log("현재 데이터 새로고침");
    // 실제로는 API 호출
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header currentPage="device" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* 디바이스 정보 헤더 */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {deviceInfo.name} ({deviceInfo.id})
              </h1>
              <p className="text-gray-600">
                {deviceInfo.location} | {deviceInfo.model} | 상태:{" "}
                {deviceInfo.status}
              </p>
            </div>
            <button
              onClick={handleGoBack}
              className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded flex items-center space-x-2 transition-colors"
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
              <span>뒤로가기</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 좌측 - 제어 패널 */}
          <div className="space-y-6">
            {/* 1. 제어 스위치 */}
            <div className="bg-white border border-gray-300 overflow-hidden">
              <div className="bg-gray-200 border-b border-gray-300 p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                    <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">
                      1
                    </span>
                    제어 패널
                  </h2>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* NANO BUBBLE 스위치 */}
                  <div className="text-center">
                    <div className="bg-blue-500 text-white px-4 py-2 rounded mb-4 font-semibold">
                      NANO BUBBLE
                    </div>
                    <div
                      className={`relative inline-flex items-center w-20 h-10 rounded-full cursor-pointer transition-colors ${
                        controls.nanoBubble ? "bg-black" : "bg-gray-400"
                      }`}
                      onClick={() => handleToggle("nanoBubble")}
                    >
                      <div
                        className={`absolute w-8 h-8 bg-white rounded-full transition-transform ${
                          controls.nanoBubble
                            ? "translate-x-10"
                            : "translate-x-1"
                        }`}
                      />
                      <span
                        className={`absolute text-sm font-bold ${
                          controls.nanoBubble
                            ? "left-2 text-white"
                            : "right-2 text-black"
                        }`}
                      >
                        {controls.nanoBubble ? "ON" : "OFF"}
                      </span>
                    </div>
                  </div>

                  {/* Ozone Generator 스위치 */}
                  <div className="text-center">
                    <div className="bg-blue-500 text-white px-4 py-2 rounded mb-4 font-semibold">
                      Ozone Generator
                    </div>
                    <div
                      className={`relative inline-flex items-center w-20 h-10 rounded-full cursor-pointer transition-colors ${
                        controls.ozoneGenerator ? "bg-black" : "bg-gray-400"
                      }`}
                      onClick={() => handleToggle("ozoneGenerator")}
                    >
                      <div
                        className={`absolute w-8 h-8 bg-white rounded-full transition-transform ${
                          controls.ozoneGenerator
                            ? "translate-x-10"
                            : "translate-x-1"
                        }`}
                      />
                      <span
                        className={`absolute text-sm font-bold ${
                          controls.ozoneGenerator
                            ? "left-2 text-white"
                            : "right-2 text-black"
                        }`}
                      >
                        {controls.ozoneGenerator ? "ON" : "OFF"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. 현재 센서 정보 */}
            <div className="bg-white border border-gray-300 overflow-hidden">
              <div className="bg-gray-200 border-b border-gray-300 p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                    <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">
                      2
                    </span>
                    현재 센서 정보
                  </h2>
                  <button
                    onClick={handleRefreshData}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 py-1 rounded text-sm transition-colors"
                  >
                    현재 데이터 새로고침
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-600 text-white">
                        <th className="px-4 py-3 text-center font-semibold">
                          센서
                        </th>
                        <th className="px-4 py-3 text-center font-semibold">
                          값
                        </th>
                        <th className="px-4 py-3 text-center font-semibold">
                          이상유무
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sensorData.map((sensor, index) => (
                        <tr
                          key={sensor.name}
                          className={
                            index % 2 === 0 ? "bg-gray-100" : "bg-white"
                          }
                        >
                          <td className="px-4 py-3 text-center font-medium">
                            {sensor.name}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {sensor.value}
                          </td>
                          <td className="px-4 py-3 text-center font-bold text-red-600">
                            {sensor.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* 우측 - 실시간 데이터 */}
          <div className="bg-white border border-gray-300 overflow-hidden">
            <div className="bg-gray-200 border-b border-gray-300 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">
                  실시간 데이터
                </h2>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    기록 - {new Date().toLocaleString("ko-KR")}
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-1 hover:bg-gray-300 rounded">
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
                    </button>
                    <button className="p-1 hover:bg-gray-300 rounded">
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
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </button>
                    <button className="p-1 hover:bg-gray-300 rounded">
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
                          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="overflow-x-auto max-h-96">
                <table className="w-full border-collapse border border-gray-300">
                  <thead className="sticky top-0">
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">
                        화학수소
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">
                        암모니아
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">
                        진공(kg/f)
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">
                        펌프
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">
                        시간
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {realtimeData.map((data, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="border border-gray-300 px-3 py-2 text-sm">
                          {data.화학수소}
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-sm">
                          {data.암모니아}
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-sm">
                          {data.진공}
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-sm">
                          <span
                            className={
                              data.펌프 ? "text-green-600" : "text-red-600"
                            }
                          >
                            {data.펌프 ? "true" : "false"}
                          </span>
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-gray-600">
                          {data.timestamp}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 페이지네이션 */}
              <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                <span>1 - 10 of 200</span>
                <div className="flex space-x-2">
                  <button className="p-1 hover:bg-gray-200 rounded disabled:opacity-50">
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
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded">
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded">
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
                        d="M13 5l7 7-7 7M5 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
