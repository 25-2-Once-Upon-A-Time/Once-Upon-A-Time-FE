import React from 'react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import backIcon from '@/assets/icons/back.svg';

interface BackButtonProps {
  onClick?: () => void;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, className }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      className={twMerge(
        'w-[50px] h-[50px]',
        'bg-bg-cream',
        'flex items-center justify-center',
        'rounded-full',
        className,
      )}
    >
      <img src={backIcon} alt='뒤로가기' className='w-[16.99px] h-[16.36px]' />
    </button>
  );
};

export default BackButton;
