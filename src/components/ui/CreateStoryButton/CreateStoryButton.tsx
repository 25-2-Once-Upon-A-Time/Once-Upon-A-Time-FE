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
    if (onClick) {
      onClick();
    } else {
      navigate('/story/create');
    }
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      className={twMerge(
        'h-[38px] rounded-[19px]',
        'bg-[#898AC4] text-white font-semibold',
        'flex items-center justify-center',
        'shadow-md hover:brightness-95 active:brightness-90',
        'transition-all duration-300',
        collapsed ? 'w-[38px]' : 'w-[119px] gap-1',
        className,
      )}
    >
      <span className='text-[18px]'>+</span>
      <span
        className={twMerge(
          'text-[14px] whitespace-nowrap overflow-hidden',
          'transition-opacity',
          collapsed
            ? 'opacity-0 w-0 duration-100' // 축소 시 빠르게 사라짐
            : 'opacity-100 delay-200 duration-200', // 확장 시 도형 완성 후 나타남
        )}
      >
        동화생성
      </span>
    </button>
  );
};

export default CreateStoryButton;
