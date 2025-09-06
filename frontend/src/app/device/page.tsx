'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface DeviceData {
  id: string;
  deviceName: string;
  model: string;
  location: string;
  installDate: string;
  status: 'normal' | 'warning' | 'error';
  lastUpdate: string;
  dataCount: number;
}

export default function DevicePage() {
  // 디바이스 데이터
  const [devices] = useState<DeviceData[]>([
    {
      id: 'NB-001',
      deviceName: '나노버블 50A',
      model: 'NES-50A',
      location: '공장 어촌장',
      installDate: '2025.07.05',
      status: 'normal',
      lastUpdate: '2025.09.03 10:03',
      dataCount: 4
    },
    {
      id: 'NB-002',
      deviceName: '고도산화 100A',
      model: 'NES-100',
      location: '부산 수협',
      installDate: '2025.07.11',
      status: 'warning',
      lastUpdate: '2025.09.03 09:50',
      dataCount: 0
    },
    {
      id: 'OXY-003',
      deviceName: '산소발생기',
      model: 'OXY-M8100',
      location: '대한제지',
      installDate: '2025.08.01',
      status: 'normal',
      lastUpdate: '2025.09.03 10:05',
      dataCount: 0
    }
  ]);

  // 필터 상태
  const [filters, setFilters] = useState({
    deviceType: '',
    location: '',
    startDate: '',
    endDate: ''
  });

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleExcelExport = () => {
    console.log('Excel export clicked');
    
    // CSV 형태로 데이터 생성 (엑셀에서 읽을 수 있음)
    const headers = ['장비 ID', '장비명', '모델명', '설치 위치', '설치일', '상태', '마지막 데이터 수집', '데이터 건수'];
    const csvData = devices.map(device => [
      device.id,
      device.deviceName,
      device.model,
      device.location,
      device.installDate,
      getStatusText(device.status),
      device.lastUpdate,
      device.dataCount
    ]);
    
    // CSV 문자열 생성
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');
    
    // BOM 추가 (한글 깨짐 방지)
    const BOM = '\uFEFF';
    const csvWithBOM = BOM + csvContent;
    
    // Blob 생성
    const blob = new Blob([csvWithBOM], { type: 'text/csv;charset=utf-8;' });
    
    // 다운로드 링크 생성
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    
    // 현재 날짜로 파일명 생성
    const today = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `디바이스_목록_${today}.csv`);
    
    // 링크 클릭하여 다운로드 실행
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // URL 객체 해제
    URL.revokeObjectURL(url);
  };

  const handleSearch = () => {
    console.log('Search with filters:', filters);
    alert('검색 기능이 실행됩니다.');
  };

  const handleReset = () => {
    setFilters({
      deviceType: '',
      location: '',
      startDate: '',
      endDate: ''
    });
  };

  const handleRegister = () => {
    console.log('Register clicked');
    alert('디바이스 등록 페이지로 이동합니다.');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'normal':
        return '정상';
      case 'warning':
        return '이상';
      case 'error':
        return '오류';
      default:
        return '알 수 없음';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header currentPage="device" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Device</h1>
          <p className="text-gray-600">디바이스 목록을 조회하고 관리할 수 있습니다.</p>
        </div>

        {/* Device 목록 카드 */}
        <div className="bg-white border border-gray-300 mb-6">
          <div className="bg-gray-200 border-b border-gray-300 p-4">
            <h2 className="text-lg font-semibold text-gray-800">Device 목록</h2>
          </div>

          <div className="p-6">
            {/* 필터 영역 */}
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                {/* 업체구분 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">업체구분</label>
                  <select
                    value={filters.deviceType}
                    onChange={(e) => handleFilterChange('deviceType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">전체</option>
                    <option value="나노버블">나노버블</option>
                    <option value="고도산화">고도산화</option>
                    <option value="산소발생기">산소발생기</option>
                  </select>
                </div>

                {/* 설치지역 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">설치지역</label>
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">전체</option>
                    <option value="공장">공장</option>
                    <option value="부산">부산</option>
                    <option value="대한제지">대한제지</option>
                  </select>
                </div>

                {/* 설치일자 시작 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">설치일자</label>
                  <input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) => handleFilterChange('startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* 설치일자 종료 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">~</label>
                  <input
                    type="date"
                    value={filters.endDate}
                    onChange={(e) => handleFilterChange('endDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* 버튼 영역 */}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleReset}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-4 py-2 border border-gray-500 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  <span>초기화</span>
                </button>
                <button
                  onClick={handleRegister}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-4 py-2 border border-indigo-500 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  <span>등록</span>
                </button>
                <button
                  onClick={handleSearch}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 border border-blue-600 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  <span>조회</span>
                </button>
                <button
                  onClick={handleExcelExport}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 border border-green-600 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <span>EXCEL</span>
                </button>
              </div>
            </div>

            {/* 디바이스 테이블 */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      장비 ID
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      장비명
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      모델명
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      설치 위치
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      설치일
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      상태
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      마지막 데이터<br />수집
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      실시 데이터 보기
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map((device, index) => (
                    <tr key={device.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                        {device.id}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                        {device.deviceName}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                        {device.model}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                        {device.location}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                        {device.installDate}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(device.status)}`}>
                          {device.status === 'normal' && '●'}
                          {device.status === 'warning' && '▲'}
                          {device.status === 'error' && '●'}
                          <span className="ml-1">{getStatusText(device.status)}</span>
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                        <div>{device.lastUpdate}</div>
                        <div className="text-xs text-gray-500">({device.dataCount}건)</div>
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm">
                        <button className="text-blue-600 hover:text-blue-800 underline">
                          [보기]
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
