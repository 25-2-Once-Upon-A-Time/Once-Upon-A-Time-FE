import React from 'react';
import { twMerge } from 'tailwind-merge';
import sparklesIcon from '@/assets/icons/sparkles.svg';
import type { CreateAudioBookButtonProps } from './CreateAudioBookButton.types';

const CreateAudioBookButton: React.FC<CreateAudioBookButtonProps> = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        'flex w-[199px] h-[53px] px-[18px] py-[13px] items-center justify-center gap-[10px]',
        'rounded-[92.5px] bg-bg-light-purple-700',
        'cursor-pointer relative',
        className,
      )}
    >
      <span className='nbp-20-b-center text-fg-cream'>오디오북 생성</span>
      <img src={sparklesIcon} alt='sparkles' className='w-5 h-5' />
    </button>
  );
};

export default CreateAudioBookButton;
