import React from 'react';
import type { TagProps } from './Tag.types';
import { twMerge } from 'tailwind-merge';

const Tag: React.FC<TagProps> = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        'inline-flex items-center justify-center h-[28px] rounded-[10px] bg-[#C0C9EE] px-[14px] py-[1px]',
        className
      )}
    >
      <span className="text-[15px] leading-[26px] tracking-[0.46px] font-nanum font-extrabold text-[#3C3C5E] uppercase whitespace-nowrap">
        {children}
      </span>
    </div>
  );
};

export default Tag;
