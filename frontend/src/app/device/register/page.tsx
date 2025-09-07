"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface DeviceFormData {
  // 1단계 - 장비 기본 정보
  deviceId: string;
  deviceName: string;
  model: string;
  location: string;
  installDate: string;
  companyCode: string;
}

export default function DeviceRegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<DeviceFormData>({
    deviceId: "",
    deviceName: "",
    model: "",
    location: "",
    installDate: "",
    companyCode: "",
  });

  // 에러 상태 관리
  const [errors, setErrors] = useState<Partial<DeviceFormData>>({});

  const handleInputChange = (field: keyof DeviceFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // 입력 시 해당 필드의 에러 메시지 제거
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // 유효성 검사 함수
  const validateStep1 = (): boolean => {
    const newErrors: Partial<DeviceFormData> = {};

    if (!formData.deviceId.trim()) {
      newErrors.deviceId = "장비 ID를 입력해주세요.";
    }

    if (!formData.deviceName.trim()) {
      newErrors.deviceName = "장비명을 입력해주세요.";
    }

    if (!formData.model.trim()) {
      newErrors.model = "모델명을 입력해주세요.";
    }

    if (!formData.location.trim()) {
      newErrors.location = "설치위치를 선택해주세요.";
    }

    if (!formData.installDate.trim()) {
      newErrors.installDate = "설치일을 선택해주세요.";
    }

    if (!formData.companyCode.trim()) {
      newErrors.companyCode = "업체코드를 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      // 1단계에서 유효성 검사 실행
      if (validateStep1()) {
        setCurrentStep(2);
      }
    } else if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Device registration data:", formData);
    alert("디바이스가 성공적으로 등록되었습니다.");
    router.push("/device");
  };

  const handleCancel = () => {
    router.push("/device");
  };

  const renderStepTabs = () => (
    <div className="mb-8">
      <div className="flex items-center justify-center space-x-4">
        {/* Step 1 */}
        <div className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
              currentStep >= 1 ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            1
          </div>
          <div className="ml-3">
            <div
              className={`text-sm font-medium ${
                currentStep >= 1 ? "text-blue-600" : "text-gray-500"
              }`}
            >
              장비 정보
            </div>
          </div>
        </div>

        {/* Arrow */}
        <svg
          className="w-6 h-6 text-gray-400"
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

        {/* Step 2 */}
        <div className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
              currentStep >= 2 ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            2
          </div>
          <div className="ml-3">
            <div
              className={`text-sm font-medium ${
                currentStep >= 2 ? "text-blue-600" : "text-gray-500"
              }`}
            >
              확인
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="bg-white border border-gray-300 overflow-hidden">
      <div className="bg-gray-200 border-b border-gray-300 p-4">
        <h2 className="text-lg font-semibold text-gray-800">장비 정보 입력</h2>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 장비(ID) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              장비(ID) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.deviceId}
              onChange={(e) => handleInputChange("deviceId", e.target.value)}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.deviceId
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="장비 ID를 입력하세요"
              required
            />
            {errors.deviceId && (
              <p className="mt-1 text-sm text-red-600">{errors.deviceId}</p>
            )}
          </div>

          {/* 모델명 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              모델명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) => handleInputChange("model", e.target.value)}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.model
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="모델명을 입력하세요"
              required
            />
            {errors.model && (
              <p className="mt-1 text-sm text-red-600">{errors.model}</p>
            )}
          </div>

          {/* 장비명 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              장비명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.deviceName}
              onChange={(e) => handleInputChange("deviceName", e.target.value)}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.deviceName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="장비명을 입력하세요"
              required
            />
            {errors.deviceName && (
              <p className="mt-1 text-sm text-red-600">{errors.deviceName}</p>
            )}
          </div>

          {/* 설치일 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              설치일 <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.installDate}
              onChange={(e) => handleInputChange("installDate", e.target.value)}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.installDate
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              required
            />
            {errors.installDate && (
              <p className="mt-1 text-sm text-red-600">{errors.installDate}</p>
            )}
          </div>

          {/* 업체코드 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              업체코드 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.companyCode}
              onChange={(e) => handleInputChange("companyCode", e.target.value)}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.companyCode
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="업체코드를 입력하세요"
              required
            />
            {errors.companyCode && (
              <p className="mt-1 text-sm text-red-600">{errors.companyCode}</p>
            )}
          </div>

          {/* 설치위치 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              설치위치 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className={`w-full px-3 py-2 border rounded bg-white focus:outline-none focus:ring-2 appearance-none ${
                  errors.location
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                required
              >
                <option value="">설치위치를 선택하세요</option>
                <option value="공장 어촌장">공장 어촌장</option>
                <option value="부산 수협">부산 수협</option>
                <option value="대한제지">대한제지</option>
                <option value="인천 본사">인천 본사</option>
                <option value="서울 지사">서울 지사</option>
                <option value="기타">기타</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location}</p>
            )}
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-6 py-2 rounded flex items-center space-x-2 transition-colors"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span>취소</span>
          </button>

          <button
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded flex items-center space-x-2 transition-colors"
          >
            <span>다음</span>
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
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="bg-white border border-gray-300 overflow-hidden">
      <div className="bg-gray-200 border-b border-gray-300 p-4">
        <h2 className="text-lg font-semibold text-gray-800">등록 정보 확인</h2>
      </div>

      <div className="p-6">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            입력하신 정보를 확인해주세요
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="font-medium text-gray-700">장비(ID):</span>
              <span className="text-gray-900">{formData.deviceId || "-"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="font-medium text-gray-700">모델명:</span>
              <span className="text-gray-900">{formData.model || "-"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="font-medium text-gray-700">장비명:</span>
              <span className="text-gray-900">
                {formData.deviceName || "-"}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="font-medium text-gray-700">설치일:</span>
              <span className="text-gray-900">
                {formData.installDate || "-"}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="font-medium text-gray-700">업체코드:</span>
              <span className="text-gray-900">
                {formData.companyCode || "-"}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="font-medium text-gray-700">설치위치:</span>
              <span className="text-gray-900">{formData.location || "-"}</span>
            </div>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrev}
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-6 py-2 rounded flex items-center space-x-2 transition-colors"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>이전</span>
          </button>

          <div className="flex space-x-3">
            <button
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded flex items-center space-x-2 transition-colors"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span>취소</span>
            </button>

            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded flex items-center space-x-2 transition-colors"
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>등록</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header currentPage="device" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            디바이스 등록
          </h1>
          <p className="text-gray-600">
            새로운 디바이스를 시스템에 등록합니다.
          </p>
        </div>

        {renderStepTabs()}

        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
      </main>

      <Footer />
    </div>
  );
}
