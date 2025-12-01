import React from 'react';
import type { SearchInputProps } from './SearchInput.types';
import SearchIcon from '@/assets/icons/search.svg?react';
import { twMerge } from 'tailwind-merge';

const SearchInput: React.FC<SearchInputProps> = ({ className, ...props }) => {
  return (
    <div className={twMerge(
      'w-[316px] h-[44px] rounded-[24px] bg-[#C0C9EE] px-[16px] py-[12px] flex items-center gap-[16px]',
      className
    )}>
      {/* 검색 아이콘 */}
      <div className="w-[16px] h-[16px] flex-shrink-0">
        <SearchIcon />
      </div>

      {/* 검색 입력 필드 */}
      <input
        className="flex-1 w-[252px] h-[20px] bg-transparent text-[14px] leading-[20px] font-inter font-normal text-[#081025] placeholder:text-[#A7ABC3] focus:outline-none"
        placeholder="검색어를 입력해주세요"
        {...props}
      />
    </div>
  );
};

export default SearchInput;
