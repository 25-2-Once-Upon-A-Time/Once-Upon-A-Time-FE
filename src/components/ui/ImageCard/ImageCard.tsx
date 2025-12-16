import React from 'react';
import type { ImageCardProps } from './ImageCard.types';
import Image from '@/components/ui/Image/Image';
import { twMerge } from 'tailwind-merge';

const ImageCard: React.FC<ImageCardProps> = ({ title, imageSrc, className }) => {
  return (
    <div className={twMerge('w-full rounded-[16px] overflow-hidden', className)}>
      {/* 이미지 영역 - Image 컴포넌트 재사용 */}
      <Image src={imageSrc} alt={title} className='w-full h-[120px]' />

      {/* 타이틀 영역 */}
      <div className='w-full h-[48px] bg-bg-purple-100 p-[16px] flex items-center'>
        <h3 className='w-full inter-12-r text-fg-primary truncate'>{title}</h3>
      </div>
    </div>
  );
};

export default ImageCard;
