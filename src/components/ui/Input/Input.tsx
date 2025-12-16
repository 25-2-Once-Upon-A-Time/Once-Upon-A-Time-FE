import React from 'react';
import type { InputProps } from './Input.types';
import { twMerge } from 'tailwind-merge';

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={twMerge(
        'w-full h-[48px] rounded-[17.6px] border-[1.17px] border-border-purple bg-bg-purple-800 px-[19px] text-[15px] leading-[25.81px] tracking-[0.05em] text-fg-primary font-pretendard font-normal placeholder:text-fg-primary focus:outline-none focus:border-border-purple',
        className,
      )}
      {...props}
    />
  );
};

export default Input;
