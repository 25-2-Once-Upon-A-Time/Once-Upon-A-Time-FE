import React from 'react';
import Image from '@/components/ui/Image/Image';
import { twMerge } from 'tailwind-merge';

interface Props {
  title: string;
  imageSrc?: string;
  alt?: string;
  bgColor?: string;
  circleSize?: string; // tailwind classes for circle
  imgSize?: string;
  titleMaxWidth?: string; // tailwind max-w classes for title
  placeholder?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const CircleSelect: React.FC<Props> = ({
  title,
  imageSrc,
  alt,
  bgColor = 'var(--color-fg-peach)',
  circleSize = 'w-[72px] h-[72px] md:w-[90px] md:h-[90px]',
  imgSize = 'w-[43px] h-[43px] md:w-[32px] md:h-[32px]',
  titleMaxWidth = 'max-w-[72px] md:max-w-[90px]',
  placeholder = <Image src={''} alt={'placeholder'} className={imgSize} />,
  onClick,
  className,
}) => {
  return (
    <div className={twMerge('flex flex-col items-center', className)} onClick={onClick}>
      <div
        className={twMerge(`${circleSize} rounded-full flex items-center justify-center`)}
        style={{ backgroundColor: bgColor }}
      >
        {imageSrc ? (
          // handle multiple import shapes:
          // - string url
          // - React SVG component (function / component)
          // - module object with .default or .src or .url
          typeof imageSrc === 'string' ? (
            <Image src={imageSrc} alt={alt || title} className={imgSize} />
          ) : typeof imageSrc === 'function' ? (
            // React component (SVG imported as ReactComponent)
            // @ts-ignore: imageSrc is a React component
            React.createElement(imageSrc, {
              className: imgSize,
              role: 'img',
              'aria-label': alt || title,
            })
          ) : imageSrc && typeof (imageSrc as any).default === 'string' ? (
            <Image src={(imageSrc as any).default} alt={alt || title} className={imgSize} />
          ) : imageSrc && typeof (imageSrc as any).src === 'string' ? (
            <Image src={(imageSrc as any).src} alt={alt || title} className={imgSize} />
          ) : imageSrc && typeof (imageSrc as any).url === 'string' ? (
            <Image src={(imageSrc as any).url} alt={alt || title} className={imgSize} />
          ) : (
            // fallback: try to stringify
            <Image src={String(imageSrc)} alt={alt || title} className={imgSize} />
          )
        ) : (
          placeholder
        )}
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
