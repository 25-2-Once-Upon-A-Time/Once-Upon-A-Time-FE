import React from 'react';
import type { CheckboxProps } from './Checkbox.types';
import { twMerge } from 'tailwind-merge';

const Checkbox: React.FC<CheckboxProps> = ({ label, className, id, ...props }) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className='inline-flex items-center gap-[8px]'>
      <input
        type='checkbox'
        id={checkboxId}
        className={twMerge(
          'w-[20px] h-[20px] rounded-[4px] border-[2px] border-[#DCE3E8] cursor-pointer appearance-none',
          'checked:bg-[#898AC4] checked:border-[#898AC4]',
          'bg-center bg-no-repeat',
          'checked:bg-[length:16px_16px]',
          "checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjMzMzMgNC4wMDAwMkw2LjAwMDAwIDExLjMzMzRMMi42NjY2NyA4LjAwMDAyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K')]",
          'focus:outline-none focus:ring-2 focus:ring-[#898AC4] focus:ring-offset-2',
          'transition-all',
          className,
        )}
        {...props}
      />
      {label && (
        <label
          htmlFor={checkboxId}
          className='text-[16px] font-pretendard text-[#333D4B] cursor-pointer select-none'
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
