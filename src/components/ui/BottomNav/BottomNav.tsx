import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { NAV_ITEMS } from '@/constants/navItems';
import type { BottomNavProps } from './BottomNav.types';

const BottomNav: React.FC<BottomNavProps> = ({ className }) => {
  const location = useLocation();

  return (
    <div className={twMerge('fixed bottom-0 left-0 right-0', 'w-full', 'z-50', className)}>
      <nav
        className='flex h-[80px] px-[8px] justify-between items-center bg-[#2B2D42]'
        role='navigation'
        aria-label='하단 네비게이션'
      >
        {NAV_ITEMS.map(({ label, to, icon: Icon }) => {
          const isActive = location.pathname === to;

          return (
            <Link
              key={to}
              to={to}
              className='flex flex-col w-full items-center justify-center gap-[4px]'
            >
              <div
                className={twMerge(
                  'flex items-center justify-center p-[8px] rounded-[8px]',
                  isActive && 'bg-[#B4B5D4]',
                )}
              >
                <Icon
                  className={twMerge('w-[28px] h-[28px]', isActive ? 'text-black' : 'text-white')}
                />
              </div>
              <span
                className={twMerge(
                  'text-[10px] font-medium',
                  isActive ? 'text-[#B4B5D4]' : 'text-white',
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNav;
