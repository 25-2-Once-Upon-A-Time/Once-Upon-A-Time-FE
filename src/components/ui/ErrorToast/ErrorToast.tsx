import React from 'react';
import type { ErrorToastProps } from './ErrorToast.types';
import CautionIcon from '@/assets/icons/caution.svg?react';
import { twMerge } from 'tailwind-merge';

const ErrorToast: React.FC<ErrorToastProps> = ({ isVisible, message, onClose, className }) => {
  if (!isVisible) return null;

  return (
    <div
      className={twMerge(
        'h-[54px] rounded-[16px] bg-[#FFE2E4] p-[16px] flex items-center gap-[16px] w-full',
        className,
      )}
    >
      {/* 경고 아이콘 */}
      <div className='w-[24px] h-[24px] flex-shrink-0'>
        <CautionIcon />
      </div>

      {/* 오류 메시지 */}
      <div className='flex-1'>
        <p className='inter-12-sb text-fg-primary'>{message}</p>
      </div>

      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        className='w-[12px] h-[12px] flex items-center justify-center flex-shrink-0'
        aria-label='닫기'
      >
        <svg width='12' height='12' viewBox='0 0 12 12' fill='none'>
          <path
            d='M0.75 0.75L11.25 11.25M11.25 0.75L0.75 11.25'
            stroke='#717272'
            strokeWidth='1.5'
            strokeLinecap='round'
          />
        </svg>
      </button>
    </div>
  );
};

export default ErrorToast;
