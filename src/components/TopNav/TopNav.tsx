import React from 'react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import backIcon from '@/assets/Nav/icons/back.png';
import type { TopNavProps } from './TopNav.types';

const TopNav: React.FC<TopNavProps> = ({ title, showBack = false, className }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div
      className={twMerge(
        'fixed top-0 left-0 right-0',
        'flex items-center justify-center',
        'h-[56px]',
        'z-50',
        className,
      )}
    >
      {showBack && (
        <button type='button' onClick={handleBack} className='absolute left-[16px] p-[8px]'>
          <img src={backIcon} alt='뒤로가기' className='w-[22px] h-[22px]' />
        </button>
      )}

      <span className='text-[20px] font-bold font-nanum-square-round'>{title}</span>
    </div>
  );
};

export default TopNav;
