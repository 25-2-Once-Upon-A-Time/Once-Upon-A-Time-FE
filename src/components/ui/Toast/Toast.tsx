import React, { useEffect } from 'react';
import type { ToastProps } from './Toast.types';

const Toast: React.FC<ToastProps> = ({
  message,
  isVisible,
  onClose,
  duration = 3000,
  className,
}) => {
  useEffect(() => {
    if (isVisible && onClose && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-[20px] left-1/2 -translate-x-1/2 z-50 w-[178px] h-[42px] rounded-[30px] bg-white px-[18px] py-[14px] flex items-center justify-center gap-[10px] animate-fade-in-down ${className || ''}`}
    >
      <span className="text-[12px] leading-[14px] font-nanum font-extrabold tracking-[-0.01em] whitespace-nowrap text-[#424363]">
        {message}
      </span>
    </div>
  );
};

export default Toast;
