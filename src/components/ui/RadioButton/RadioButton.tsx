import React from 'react';
import type { RadioButtonProps } from './RadioButton.types';
import { twMerge } from 'tailwind-merge';

const RadioButton: React.FC<RadioButtonProps> = ({ label, className, id, ...props }) => {
  const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className='inline-flex items-center gap-[8px]'>
      <input
        type='radio'
        id={radioId}
        className={twMerge(
          'w-[20px] h-[20px] rounded-full border-[2px] border-[#DCE3E8] cursor-pointer appearance-none',
          'checked:border-[#898AC4]',
          'checked:shadow-[inset_0_0_0_5px_white,inset_0_0_0_20px_#898AC4]',
          'focus:outline-none focus:ring-2 focus:ring-[#898AC4] focus:ring-offset-2',
          'transition-all',
          className,
        )}
        {...props}
      />
      {label && (
        <label
          htmlFor={radioId}
          className='text-[16px] font-pretendard text-[#333D4B] cursor-pointer select-none'
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default RadioButton;
