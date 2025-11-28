import React from 'react';
import type { DownloadToastProps } from './DownloadToast.types';

const DownloadToast: React.FC<DownloadToastProps> = ({
  isVisible,
  progress = 0,
  onClose,
  className,
}) => {
  if (!isVisible) return null;

  // progress에 따라 원형 진행률 계산 (0-360도)
  const circumference = 2 * Math.PI * 16; // 반지름 16px 기준
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={`fixed w-[317px] h-[160px] rounded-[15px] bg-[#EEF0FA] ${className || ''}`}
    >
      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        className="absolute top-[16px] right-[16px] w-[12px] h-[12px] flex items-center justify-center"
        aria-label="닫기"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M0.75 0.75L11.25 11.25M11.25 0.75L0.75 11.25"
            stroke="#717272"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* 다운로드 진행 원형 인디케이터 */}
      <div className="absolute top-[44px] left-[141px] w-[37px] h-[37px]">
        <svg className="-rotate-90 w-full h-full" viewBox="0 0 37 37">
          {/* 배경 원 */}
          <circle
            cx="18.5"
            cy="18.5"
            r="16"
            fill="none"
            stroke="#DBDBDB"
            strokeWidth="5"
          />
          {/* 진행률 표시 원 */}
          <circle
            cx="18.5"
            cy="18.5"
            r="16"
            fill="none"
            stroke="#898AC4"
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>
      </div>

      {/* 텍스트 */}
      <p className="absolute top-[99px] left-[87px] w-[143px] h-[23px] text-[16px] leading-[145%] font-nanum font-extrabold text-[#424363] text-right">
        다운로드 중입니다...
      </p>
    </div>
  );
};

export default DownloadToast;
