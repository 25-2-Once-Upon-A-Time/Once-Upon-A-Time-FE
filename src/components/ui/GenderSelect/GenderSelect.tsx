import React, { useState, useRef, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import chevronDown from '@/assets/icons/chevron_down.svg';

interface GenderSelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  isEditMode?: boolean;
  disabled?: boolean;
}

const GenderSelect: React.FC<GenderSelectProps> = ({
  value,
  onChange,
  className,
  isEditMode = false,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const selectRef = useRef<HTMLDivElement>(null);

  const options = ['여성', '남성'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else if (focusedIndex >= 0) {
          handleSelect(options[focusedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : prev));
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        }
        break;
      case 'Tab':
        if (isOpen) {
          setIsOpen(false);
          setFocusedIndex(-1);
        }
        break;
    }
  };

  return (
    <div ref={selectRef} className='relative w-full'>
      <button
        type='button'
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        aria-labelledby='gender-select-label'
        className={twMerge(
          'w-full h-[48px] rounded-[17.6px] border-[1.17px] border-border-purple px-[19px] text-[15px] leading-[25.81px] tracking-[0.05em] font-pretendard font-normal focus:outline-none focus:border-border-purple flex items-center justify-between',
          isEditMode ? 'bg-bg-purple-300' : 'bg-bg-purple-600',
          !value && 'text-fg-gray',
          value && 'text-fg-primary',
          disabled && 'cursor-not-allowed opacity-100',
          className,
        )}
      >
        <span>{value || '성별을 선택하세요'}</span>
        <img
          src={chevronDown}
          alt='dropdown'
          className={twMerge('w-[14px] h-[7px] transition-transform', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <div
          role='listbox'
          aria-labelledby='gender-select-label'
          className={twMerge(
            'absolute top-[52px] left-0 w-full border-[1.17px] border-border-purple rounded-[17.6px] overflow-hidden z-10 shadow-lg',
            isEditMode ? 'bg-bg-purple-300' : 'bg-bg-purple-600',
          )}
        >
          {options.map((option, index) => (
            <button
              key={option}
              type='button'
              role='option'
              aria-selected={value === option}
              onClick={() => handleSelect(option)}
              onMouseEnter={() => setFocusedIndex(index)}
              className={twMerge(
                'w-full px-[19px] py-3 text-left text-[15px] font-pretendard hover:bg-bg-purple-300 transition-colors',
                value === option ? 'text-fg-primary bg-bg-purple-300' : 'text-fg-primary',
                focusedIndex === index && 'bg-bg-purple-300',
              )}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenderSelect;
