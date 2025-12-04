import React from 'react';
import type { SearchInputProps } from './SearchInput.types';
import SearchIcon from '@/assets/icons/search.svg?react';
import { twMerge } from 'tailwind-merge';

const SearchInput: React.FC<SearchInputProps> = ({ className, ...props }) => {
  return (
    <div
      className={twMerge(
        'h-[44px] rounded-[24px] bg-bg-purple-100 px-[14px] sm:px-[16px] py-[12px] flex items-center gap-[12px] sm:gap-[16px]',
        className,
      )}
    >
      {/* 검색 아이콘 */}
      <div className='w-[16px] h-[16px] flex-shrink-0'>
        <SearchIcon />
      </div>

      {/* 검색 입력 필드 */}
      <input
        className='flex-1 bg-transparent inter-14-r text-fg-primary placeholder:text-fg-purple-600 focus:outline-none'
        placeholder='검색어를 입력해주세요'
        {...props}
      />
    </div>
  );
};

export default SearchInput;
