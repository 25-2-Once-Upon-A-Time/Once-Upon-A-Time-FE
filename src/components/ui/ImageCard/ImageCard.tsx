import React from 'react';
import type { ImageCardProps } from './ImageCard.types';
import Image from '@/components/ui/Image/Image';
import { twMerge } from 'tailwind-merge';

const ImageCard: React.FC<ImageCardProps> = ({ title, imageSrc, className }) => {
  return (
    <div className={twMerge('w-[149px] h-[168px] rounded-[16px] overflow-hidden', className)}>
      {/* 이미지 영역 - Image 컴포넌트 재사용 */}
      <Image src={imageSrc} alt={title} className="w-[149px] h-[120px]" />

      {/* 타이틀 영역 */}
      <div className="w-[149px] h-[48px] bg-[#C0C9EE] p-[16px] flex items-center">
        <h3 className="w-[117px] h-[16px] text-[12px] leading-[16px] tracking-[0.01em] font-inter font-normal text-[#081025] truncate">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default ImageCard;
