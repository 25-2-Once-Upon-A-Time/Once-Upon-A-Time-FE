import React, { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import AIIcon from '@/assets/icons/ai-technology.png';

interface LoadingModalProps {
  isOpen: boolean;
  title?: string;
  subtitle?: string;
  bottomText?: string;
  className?: string;
}

const LoadingModal: React.FC<LoadingModalProps> = ({
  isOpen,
  title = '동화를 생성중입니다',
  subtitle = '잠시만 기다려주세요',
  bottomText = '특별한 이야기를 만들고 있어요',
  className,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 2;
      });
    }, 40); // 40ms * 50 = 2000ms (2초)

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* 어두운 배경 */}
      <div className='absolute inset-0 bg-black/50' />

      {/* 모달 */}
      <div
        className={twMerge(
          'relative w-[320px] bg-white rounded-[24px] p-8 flex flex-col items-center',
          'border-2 border-[#898AC4]',
          className,
        )}
      >
        {/* AI 아이콘 */}
        <div className='w-[60px] h-[60px] mb-6'>
          <img src={AIIcon} alt='AI' className='w-full h-full animate-pulse' />
        </div>

        {/* 동화를 생성중입니다 */}
        <p className='nsr-20-eb text-[#A2AADB] mb-2'>{title}</p>

        {/* 잠시만 기다려주세요 */}
        <p className='pre-14-r text-black mb-6'>{subtitle}</p>

        {/* 프로그래스바 */}
        <div className='w-full h-[8px] bg-[#DBDBDB] rounded-full overflow-hidden mb-6'>
          <div
            className='h-full bg-[#898AC4] rounded-full transition-all duration-[40ms] ease-out'
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 하단 텍스트 */}
        <div className='flex items-center gap-2'>
          <span className='text-[14px]'>📖</span>
          <p className='pre-14-r text-fg-gray'>{bottomText}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
