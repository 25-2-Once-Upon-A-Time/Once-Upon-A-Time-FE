import React from 'react';
import { twMerge } from 'tailwind-merge';
import Image from '@/components/ui/Image/Image';
import dummyImage from '@/assets/images/dummy-image.svg';
import type { AudioBookCardProps } from './AudioBookCard.types';
import { formatTime } from '@/utils/time';

const AudioBookCard: React.FC<AudioBookCardProps> = ({
  title,
  tags,
  character,
  duration,
  imageSrc,
  onPlayClick,
  className,
}) => {
  return (
    <div
      onClick={onPlayClick}
      className={twMerge(
        'w-full h-[97px] rounded-[10px] bg-bg-purple-100',
        'flex items-center cursor-pointer',
        'px-[7px] py-[7px]',
        className,
      )}
    >
      {/* 이미지 */}
      <div className='flex flex-col justify-center items-center w-[83px] h-[81px] rounded-[16px] overflow-hidden shrink-0'>
        <Image src={imageSrc || dummyImage} alt={title} className='w-full h-full object-cover' />
      </div>

      {/* 콘텐츠 영역 */}
      <div className='ml-[9px] flex flex-col h-full flex-1'>
        {/* 타이틀 */}
        <p className='ng-12-n text-fg-primary w-[132px] h-[39px] line-clamp-2'>{title}</p>

        {/* 태그 */}
        <p className='ng-8-n text-fg-primary w-[69px] h-[39px] line-clamp-2'>{tags.join(' ')}</p>

        {/* 하단: 캐릭터 + 시간 */}
        <div className='flex items-center gap-2 mt-auto'>
          {/* 캐릭터 뱃지 */}
          <div className='w-[52px] h-5 rounded-[10px] bg-bg-yellow flex items-center justify-center'>
            <span className='ng-10-n text-fg-primary'>{character}</span>
          </div>

          {/* 시간 뱃지 */}
          <div className='w-[63px] h-5 rounded-[10px] bg-bg-peach flex items-center justify-center'>
            <span className='ng-10-n text-fg-primary'>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioBookCard;
