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
  // 기본 스타일
  const baseStyles =
    'px-[16px] h-[52px] rounded-[8px] text-[#FFFFFF] text-[20px] font-montserrat font-semibold transition-all';

  // 자주 쓰는 variant 스타일을 저장
  const variantStyles: Record<string, string> = {
    primary: 'bg-[#3C3C5E] text-[#FFFFFF] text-[20px] hover:bg-[#5F6380] rounded-[8px]',
    secondary: 'bg-[#DCE3E8] text-[#333D4B] hover:bg-[#CDD4D9]',
    back: 'bg-transparent text-[#545873] hover:bg-[#F5F5F5]',
  };

  // 터치 막아두는 스타일
  const disabledStyles = disabled ? 'bg-[#E9EEF2] text-[#CDC6DD] cursor-not-allowed' : '';

  // variant가 있으면 미리 정의된 스타일, 없으면 빈 문자열 -> 유연하게 작동되게 해보았습니다.
  const selectedVariant = variant ? variantStyles[variant] : '';

  return (
    <button
      disabled={disabled}
      className={twMerge(
        baseStyles,
        selectedVariant,
        disabledStyles,
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
