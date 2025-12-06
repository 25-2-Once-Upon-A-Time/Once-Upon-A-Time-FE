import React from 'react';
import type { ButtonProps } from './Button.types';
import { twMerge } from 'tailwind-merge';

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  fullWidth = false,
  disabled,
  className,
  ...props
}) => {
  // 기본 스타일 (모든 버튼 공통)
  const baseStyles = 'px-[16px] h-[52px] rounded-[8px] pre-18-77-b transition-all';

  // 자주 쓰는 variant 스타일을 저장
  const variantStyles: Record<string, string> = {
    primary: 'bg-bg-purple-500 text-white hover:bg-[#5F6380]',
    back: 'bg-transparent text-fg-purple-600 hover:bg-bg-purple-50 hover:text-bg-purple-500',
  };

  // variant가 있으면 미리 정의된 스타일, 없으면 빈 문자열 -> 유연하게 작동되게 해보았습니다.
  const selectedVariant = variant ? variantStyles[variant] : '';

  return (
    <button
      disabled={disabled}
      className={twMerge(baseStyles, selectedVariant, fullWidth && 'w-full', className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
