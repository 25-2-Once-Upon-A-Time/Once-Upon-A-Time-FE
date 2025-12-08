import React, { useState, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import type { AudioProgressBarProps } from './AudioProgressBar.types';

// 초를 HH:MM:SS 형식으로 변환
const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const AudioProgressBar: React.FC<AudioProgressBarProps> = ({
  currentTime,
  totalTime,
  className,
  onSeek,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // 진행률 계산 (0-100%)
  const progress = totalTime > 0 ? (currentTime / totalTime) * 100 : 0;

  // 위치에서 시간 계산
  const calculateTimeFromPosition = (clientX: number) => {
    if (!progressBarRef.current || totalTime === 0) return 0;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    return (percentage / 100) * totalTime;
  };

  // 진행 바 클릭 핸들러
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onSeek || totalTime === 0) return;
    const newTime = calculateTimeFromPosition(e.clientX);
    onSeek(newTime);
  };

  // 드래그 시작
  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
  };

  // 드래그 중
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !onSeek) return;
    const newTime = calculateTimeFromPosition(e.clientX);
    onSeek(newTime);
  };

  // 드래그 종료
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 드래그 이벤트 리스너 등록
  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onSeek, totalTime]);

  return (
    <div className={twMerge('w-full', className)}>
      {/* 진행 바 */}
      <div
        ref={progressBarRef}
        className='relative w-full max-w-[318px] h-2 rounded-[50px] bg-bg-purple-500 mx-auto cursor-pointer'
        onClick={handleProgressBarClick}
      >
        {/* 진행된 부분 */}
        <div
          className='absolute top-0 left-0 h-full rounded-[50px] bg-fg-purple-300 transition-all duration-300'
          style={{ width: `${progress}%` }}
        />
        {/* 진행 끝 원형 인디케이터 - 진행바 위에 겹침 */}
        {progress > 0 && (
          <div
            className='absolute top-1/2 -translate-y-1/2 w-[15px] h-[15px] rounded-full bg-fg-light cursor-grab active:cursor-grabbing'
            style={{ left: `calc(${progress}% - 7.5px)` }}
            onMouseDown={handleMouseDown}
          />
        )}
      </div>

      {/* 시간 표시 */}
      <div className='flex justify-between mt-[7px] w-full max-w-[318px] mx-auto'>
        <span className='text-fg-cream text-sm'>{formatTime(currentTime)}</span>
        <span className='text-fg-cream text-sm'>{formatTime(totalTime)}</span>
      </div>
    </div>
  );
};

export default AudioProgressBar;
