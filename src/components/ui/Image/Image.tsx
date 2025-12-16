import React from 'react';
import type { ImageProps } from './Image.types';
import ImagePlaceholder from '@/assets/icons/image-placeholder.svg?react';
import { twMerge } from 'tailwind-merge';

const Image: React.FC<ImageProps> = ({ src, alt = 'Image', className }) => {
  return (
    <div
      className={twMerge('w-full h-auto bg-[#E5E5E5] flex items-center justify-center', className)}
    >
      {src ? (
        <img src={src} alt={alt} className='w-full h-full object-cover' />
      ) : (
        <ImagePlaceholder className='w-[32px] h-[32px]' />
      )}
    </div>
  );
};

export default Image;
