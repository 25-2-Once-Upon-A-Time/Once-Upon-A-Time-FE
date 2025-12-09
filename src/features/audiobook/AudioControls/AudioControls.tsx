import React from 'react';
import PlayButton from '@/components/ui/PlayButton/PlayButton';
import SkipButton from './SkipButton';
import replayIcon from '@/assets/icons/replay-15.svg';
import forwardIcon from '@/assets/icons/forward-15.svg';

interface AudioControlsProps {
  isPlaying?: boolean;
  onPlayPause?: () => void;
  onSkipBackward?: () => void;
  onSkipForward?: () => void;
  className?: string;
}

const AudioControls: React.FC<AudioControlsProps> = ({
  isPlaying = false,
  onPlayPause,
  onSkipBackward,
  onSkipForward,
  className,
}) => {
  return (
    <div className={`flex items-center justify-center gap-[51px] ${className || ''}`}>
      {/* 뒤로 15초 버튼 */}
      <SkipButton iconSrc={replayIcon} alt='15초 뒤로' onClick={onSkipBackward} />

      {/* 재생/일시정지 버튼 */}
      <PlayButton
        isPlaying={isPlaying}
        onClick={onPlayPause}
        className='w-[60px] h-[60px] bg-bg-purple-800'
        iconSize='w-[16.5px] h-[18px]'
        pauseIconSize='w-[21px] h-[21px]'
        showBorder={false}
      />

      {/* 앞으로 15초 버튼 */}
      <SkipButton iconSrc={forwardIcon} alt='15초 앞으로' onClick={onSkipForward} />
    </div>
  );
};

export default AudioControls;
