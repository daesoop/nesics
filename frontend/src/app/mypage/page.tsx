'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MyPage() {
  // 사용자 정보 상태
  const [userInfo, setUserInfo] = useState({
    companyCode: 'NESICS_001', // 공사업체코드(ID) - 고정값
    manager: '김철수', // 담당자
    phone: '010-2455-7039', // 전화번호
    email: 'kim@nessolution.co.kr', // 이메일
    companyName: '(주)엔이에스솔루션', // 업체명
    businessSite: '인천광역시 서구 가좌동 17 나동 213호' // 사업장
  });


  // 비밀번호 변경 상태
  const [passwordChange, setPasswordChange] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleUserInfoChange = (field: string, value: string) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordChange(prev => ({
      ...prev,
      [field]: value
    }));
  };


  const handleSave = () => {
    console.log('User info saved:', userInfo);
    alert('사용자 정보가 저장되었습니다.');
  };

  const handlePasswordSubmit = () => {
    if (passwordChange.newPassword !== passwordChange.confirmPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    console.log('Password change:', passwordChange);
    alert('비밀번호가 변경되었습니다.');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header currentPage="mypage" />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">마이페이지</h1>
          <p className="text-gray-600">사용자 정보 및 설정을 관리할 수 있습니다.</p>
        </div>

        {/* User Information Table */}
        <div className="bg-white border border-gray-300 mb-8 overflow-hidden">
          <div className="bg-gray-200 border-b border-gray-300 p-4">
            <h2 className="text-lg font-semibold text-gray-800">사용자 정보</h2>
          </div>
          
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <tbody>
                  {/* 첫 번째 행 - 공사업체코드, 담당자 */}
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 bg-gray-50 font-semibold text-gray-700 w-32">공사업체코드(ID)</td>
                    <td className="py-4 px-4">
                      <input
                        type="text"
                        value={userInfo.companyCode}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                        readOnly
                      />
                    </td>
                    <td className="py-4 px-4 bg-gray-50 font-semibold text-gray-700 w-32">담당자</td>
                    <td className="py-4 px-4">
                      <input
                        type="text"
                        value={userInfo.manager}
                        onChange={(e) => handleUserInfoChange('manager', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="담당자 이름"
                      />
                    </td>
                  </tr>

                  {/* 두 번째 행 - 전화번호, 이메일 */}
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 bg-gray-50 font-semibold text-gray-700">전화번호</td>
                    <td className="py-4 px-4">
                      <input
                        type="text"
                        value={userInfo.phone}
                        onChange={(e) => handleUserInfoChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="010-0000-0000"
                      />
                    </td>
                    <td className="py-4 px-4 bg-gray-50 font-semibold text-gray-700">이메일</td>
                    <td className="py-4 px-4">
                      <input
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => handleUserInfoChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="example@nessolution.co.kr"
                      />
                    </td>
                  </tr>

                  {/* 세 번째 행 - 업체명, 사업장 */}
                  <tr>
                    <td className="py-4 px-4 bg-gray-50 font-semibold text-gray-700">업체명</td>
                    <td className="py-4 px-4">
                      <input
                        type="text"
                        value={userInfo.companyName}
                        onChange={(e) => handleUserInfoChange('companyName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="회사명"
                      />
                    </td>
                    <td className="py-4 px-4 bg-gray-50 font-semibold text-gray-700">사업장</td>
                    <td className="py-4 px-4">
                      <input
                        type="text"
                        value={userInfo.businessSite}
                        onChange={(e) => handleUserInfoChange('businessSite', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="사업장 주소"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>


            {/* Action Buttons */}
            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 border border-blue-600"
              >
                저장
              </button>
            </div>
          </div>
        </div>

        {/* Password Change Section */}
        <div className="bg-white border border-gray-300 overflow-hidden">
          <div className="bg-gray-200 border-b border-gray-300 p-4">
            <h2 className="text-lg font-semibold text-gray-800">비밀번호 변경</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 기존 비밀번호 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">기존 비밀번호</label>
                <input
                  type="password"
                  value={passwordChange.currentPassword}
                  onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="현재 비밀번호"
                />
              </div>

              {/* 변경할 비밀번호 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">비밀번호 변경</label>
                <input
                  type="password"
                  value={passwordChange.newPassword}
                  onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="새 비밀번호"
                />
              </div>

              {/* 비밀번호 확인 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">비밀번호 확인</label>
                <div className="flex space-x-2">
                  <input
                    type="password"
                    value={passwordChange.confirmPassword}
                    onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="비밀번호 확인"
                  />
                  <button
                    onClick={handlePasswordSubmit}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-4 py-2 border border-gray-600"
                  >
                    변경
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