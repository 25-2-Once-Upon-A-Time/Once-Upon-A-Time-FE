import React from 'react';
import type { TextButtonProps } from './TextButton.types';
import { twMerge } from 'tailwind-merge';

const TextButton: React.FC<TextButtonProps> = ({
  children,
  variant = 'body',
  color = 'black',
  className,
  ...props
}) => {
  // 기본 스타일
  const baseStyles =
    'font-pretendard transition-all focus:outline-none bg-transparent border-none cursor-pointer p-0 inline-flex items-center';

  // variant별 크기 스타일
  const variantStyles: Record<string, string> = {
    title: 'text-[24px] font-bold',
    subtitle: 'text-[18px] font-semibold',
    body: 'text-[16px] font-normal',
    caption: 'text-[12px] font-normal',
    link: 'text-[16px] font-normal underline',
  };

  // color별 색상 스타일
  const colorStyles: Record<string, string> = {
    black: 'text-[#1A1F28] hover:text-[#0A0F18] active:text-[#000000]',
    gray: 'text-[#545873] hover:text-[#3C3C5E] active:text-[#2F2F4A]',
  };

  return (
    <button
      type='button'
      className={twMerge(baseStyles, variantStyles[variant], colorStyles[color], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default TextButton;
