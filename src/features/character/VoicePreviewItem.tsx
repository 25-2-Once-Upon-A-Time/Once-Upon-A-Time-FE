import React, { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import PlayButton from '@/components/ui/PlayButton/PlayButton';

interface VoicePreviewItemProps {
  title: string;
  duration: string;
  audioUrl: string;
  isPlaying: boolean;
  onPlayChange: (playing: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
}

const VoicePreviewItem: React.FC<VoicePreviewItemProps> = ({
  title,
  duration,
  audioUrl,
  isPlaying,
  onPlayChange,
  className,
  style,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ✅ 부모 상태(isPlaying) → 실제 audio 제어
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [isPlaying]);

  // ▶️ 버튼 클릭
  const handleClick = () => {
    onPlayChange(!isPlaying);
  };

  // ▶️ 재생 끝나면 부모 상태 정리
  const handleEnded = () => {
    onPlayChange(false);
  };
  return (
    <div className={twMerge('h-[40px] flex items-center gap-[20.44px]', className)} style={style}>
      <PlayButton isPlaying={isPlaying} onClick={handleClick} />

      <audio src={audioUrl} controls style={{ display: 'none' }} />

      <div className='flex flex-col flex-shrink-0'>
        <p className='nsr-16-eb text-fg-cream h-[17px] whitespace-nowrap'>{title}</p>
        <p className='pre-11-m text-fg-cream h-[12px] mt-[5.9px] whitespace-nowrap'>{duration}</p>
      </div>
      {/* 실제 재생 담당 */}
      <audio ref={audioRef} src={audioUrl} onEnded={handleEnded} preload='none' />
    </div>
  );
};

export default VoicePreviewItem;
