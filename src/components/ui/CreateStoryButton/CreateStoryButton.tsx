import React from 'react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import type { CreateStoryButtonProps } from './CreateStoryButton.types';

const CreateStoryButton: React.FC<CreateStoryButtonProps> = ({
  onClick,
  className,
  collapsed = false,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick ? onClick() : navigate('/story/create');
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      className={twMerge(
        'flex items-center justify-center h-[38px] rounded-full',
        'bg-bg-purple-300 text-white shadow-md',
        'transition-all duration-300 ease-in-out',
        'hover:brightness-95 active:brightness-90',
        collapsed ? 'w-[38px]' : 'w-[119px] gap-1',
        className,
      )}
    >
      <svg
        width='18'
        height='18'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='shrink-0'
      >
        <path
          d='M12 5V19M5 12H19'
          stroke='currentColor'
          strokeWidth='2.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>

      <span
        className={twMerge(
          'pre-14-m whitespace-nowrap overflow-hidden transition-all',
          collapsed ? 'w-0 opacity-0 duration-200' : 'w-auto opacity-100 duration-300 delay-100',
        )}
      >
        동화생성
      </span>
    </button>
  );
};

export default CreateStoryButton;
