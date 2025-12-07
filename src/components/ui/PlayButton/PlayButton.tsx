import React from 'react';
import { twMerge } from 'tailwind-merge';
import playIcon from '@/assets/icons/play.svg';
import pauseIcon from '@/assets/icons/pause.svg';

interface PlayButtonProps {
  isPlaying?: boolean;
  onClick?: (isPlaying: boolean) => void;
  className?: string;
  iconSize?: string;
  showBorder?: boolean;
}

const PlayButton: React.FC<PlayButtonProps> = ({
  isPlaying = false,
  onClick,
  className,
  iconSize = 'w-[11px] h-[12px]',
  showBorder = true,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(!isPlaying);
    }
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      className={twMerge(
        'w-[40px] h-[40px]',
        isPlaying ? 'bg-bg-purple-800' : '',
        'flex items-center justify-center',
        'rounded-full relative',
        className,
      )}
    >
      {!isPlaying && showBorder && (
        <svg
          className='absolute inset-0 w-full h-full'
          viewBox='0 0 40 40'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle cx='20' cy='20' r='19.5' className='stroke-fg-cream' />
        </svg>
      )}
      <img
        src={isPlaying ? pauseIcon : playIcon}
        alt={isPlaying ? '일시정지' : '재생'}
        className={iconSize}
      />
    </button>
  );
};

export default PlayButton;
