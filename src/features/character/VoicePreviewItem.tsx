import React from 'react';
import PlayButton from '@/components/ui/PlayButton/PlayButton';

interface VoicePreviewItemProps {
  title: string;
  duration: string;
  isPlaying?: boolean;
  onPlayChange?: (playing: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
}

const VoicePreviewItem: React.FC<VoicePreviewItemProps> = ({
  title,
  duration,
  isPlaying = false,
  onPlayChange,
  className,
  style,
}) => {
  return (
    <div className={`h-[40px] flex items-center gap-[20.44px] ${className || ''}`} style={style}>
      <PlayButton isPlaying={isPlaying} onClick={onPlayChange} />

      <div className='flex flex-col flex-shrink-0'>
        {/* 음성 타이틀 */}
        <p className='nsr-16-eb text-fg-cream h-[17px] whitespace-nowrap'>{title}</p>

        {/* 음성 시간 */}
        <p className='pre-11-m text-fg-cream h-[12px] mt-[5.9px] whitespace-nowrap'>{duration}</p>
      </div>
    </div>
  );
};

export default VoicePreviewItem;
