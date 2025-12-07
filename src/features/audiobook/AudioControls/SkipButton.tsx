import React from 'react';
import { twMerge } from 'tailwind-merge';

interface SkipButtonProps {
  iconSrc: string;
  alt: string;
  onClick?: () => void;
  className?: string;
}

const SkipButton: React.FC<SkipButtonProps> = ({ iconSrc, alt, onClick, className }) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={twMerge('w-[40px] h-[40px] flex items-center justify-center', className)}
    >
      <img src={iconSrc} alt={alt} className='w-full h-full' />
    </button>
  );
};

export default SkipButton;
