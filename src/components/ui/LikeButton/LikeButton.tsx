import React from 'react';
import { twMerge } from 'tailwind-merge';

interface LikeButtonProps {
  isLiked?: boolean;
  onClick?: (isLiked: boolean) => void;
  className?: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ isLiked = false, onClick, className }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(!isLiked);
    }
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      className={twMerge(
        'w-[50px] h-[50px]',
        'bg-bg-purple-300',
        'flex items-center justify-center',
        'rounded-full',
        className,
      )}
    >
      <svg
        width='19'
        height='17'
        viewBox='0 0 19 17'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='w-[16.6px] h-[14.68px]'
      >
        <path
          d='M16.3187 2.35732C14.6117 0.547559 11.8487 0.547559 10.1417 2.35732L10.0067 2.50042C9.61766 2.91288 8.98249 2.91288 8.58551 2.50042C7.10079 0.917929 4.71889 0.513889 2.96423 1.75968C0.598209 3.4516 0.367958 6.87753 2.28142 8.90615L3.12302 9.7984L8.22028 15.2024C8.81576 15.8338 9.77646 15.8338 10.3719 15.2024L15.4692 9.7984L16.3108 8.90615C18.0258 7.09638 18.0258 4.16709 16.3187 2.35732Z'
          fill={isLiked ? '#eef0fa' : '#898AC4'}
          stroke='#EEF0FA'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </button>
  );
};

export default LikeButton;
