import React from 'react';
import { twMerge } from 'tailwind-merge';
import type { ModalProps } from './Modal.types';

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  description,
  onClose,
  onConfirm,
  cancelText = '대기',
  confirmText = '홈으로',
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* 어두운 배경 */}
      <div className='fixed inset-0 bg-black/50 z-50' onClick={onClose} />

      {/* 모달 박스 */}
      <div
        className={twMerge(
          'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'w-[300px] p-[24px] rounded-[16px]',
          'bg-[#898AC4]',
          'z-50',
        )}
      >
        {/* 메인 텍스트 */}
        <h2 className='text-[16px] font-bold text-white text-center mb-[8px] font-nanum-square-round'>
          {title}
        </h2>

        {/* 보조 텍스트 */}
        {description && (
          <p className='text-[14px] text-gray-300 text-center mb-[24px] font-nanum-gothic'>
            {description}
          </p>
        )}

        {/* 버튼 영역 */}
        <div className='flex gap-[12px]'>
          <button
            type='button'
            onClick={onClose}
            className='flex-1 py-[12px] rounded-[8px] border border-white bg-transparent text-white font-semibold'
          >
            {cancelText}
          </button>
          <button
            type='button'
            onClick={onConfirm}
            className='flex-1 py-[12px] rounded-[8px] bg-white text-gray-700 font-semibold'
          >
            {confirmText}
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
