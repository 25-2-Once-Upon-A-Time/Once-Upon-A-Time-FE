import React from 'react';
import Image from '@/components/ui/Image/Image';
import { twMerge } from 'tailwind-merge';

interface Props {
  title: string;
  imageSrc?: string | React.ComponentType<any> | { default?: string; src?: string; url?: string };
  alt?: string;
  bgColor?: string;
  circleSize?: string;
  imgSize?: string;
  titleMaxWidth?: string;
  placeholder?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

// 이미지 소스 해석 함수
const resolveImageSrc = (src: Props['imageSrc']): string | null => {
  if (!src) return null;
  if (typeof src === 'string') return src;
  if (typeof src === 'object') {
    return (src as any).default || (src as any).src || (src as any).url || null;
  }
  return null;
};

const CircleSelect: React.FC<Props> = ({
  title,
  imageSrc,
  alt,
  bgColor = 'var(--color-fg-peach)',
  circleSize = 'w-[72px] h-[72px] md:w-[90px] md:h-[90px]',
  imgSize = 'w-[43px] h-[43px] md:w-[32px] md:h-[32px]',
  titleMaxWidth = 'max-w-[72px] md:max-w-[90px]',
  placeholder = <Image className={imgSize} aria-label='No image' />,
  onClick,
  className,
}) => {
  let imageContent: React.ReactNode;
  if (!imageSrc) {
    imageContent = placeholder;
  } else if (typeof imageSrc === 'function') {
    imageContent = React.createElement(imageSrc, {
      className: imgSize,
      role: 'img',
      'aria-label': alt || title,
    });
  } else {
    const src = resolveImageSrc(imageSrc);
    imageContent = <Image src={src || undefined} alt={alt || title} className={imgSize} />;
  }

  return (
    <div className={twMerge('flex flex-col items-center', className)} onClick={onClick}>
      <div
        className={twMerge(`${circleSize} rounded-full flex items-center justify-center`)}
        style={{ backgroundColor: bgColor }}
      >
        {imageContent}
      </div>

      <span
        className={twMerge('ng-15-n mt-3 text-center whitespace-normal break-words', titleMaxWidth)}
      >
        {title}
      </span>
    </div>
  );
};

export default CircleSelect;
