import React from 'react';
import type { InputProps } from './Input.types';
import { twMerge } from 'tailwind-merge';

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={twMerge(
        'w-[316px] h-[48px] rounded-[17.6px] border-[1.17px] border-[#898AC4] bg-[#A2AADB] px-[19px] text-[15px] leading-[25.81px] tracking-[0.05em] text-[#081025] font-pretendard font-normal placeholder:text-[#081025] focus:outline-none focus:border-[#898AC4]',
        className
      )}
      {...props}
    />
  );
};

export default Input;
