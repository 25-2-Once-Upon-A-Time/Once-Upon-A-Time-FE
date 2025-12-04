import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import playIcon from '@/assets/icons/play.svg';

interface PlayButtonProps {
  isPlaying?: boolean;
  onClick?: (isPlaying: boolean) => void;
  className?: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ isPlaying = false, onClick, className }) => {
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
        'rounded-full',
        className,
      )}
    >
      <img src={playIcon} alt='재생' />
    </button>
  );
};

export default PlayButton;
