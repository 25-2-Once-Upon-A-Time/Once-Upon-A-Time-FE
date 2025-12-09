import React from 'react';
import Button from '@/components/ui/Button/Button';
import type { VerificationCompleteModalProps } from './VerificationCompleteModal.types';

const VerificationCompleteModal: React.FC<VerificationCompleteModalProps> = ({
  isOpen,
  onConfirm,
  imageSrc = '/src/assets/images/fatherhood.svg',
  message = '인증을 완료하였습니다.',
  confirmText = '완료',
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='mx-4 w-full max-w-[360px] bg-white p-8'>
        {/* 타이틀 */}
        <h2 className='text-center text-fg-primary nsr-20-eb mb-6'>본인인증 완료</h2>

        {/* 이미지 */}
        <div className='flex justify-center mb-6'>
          <img src={imageSrc} alt='본인인증 완료' className='w-40 h-40' />
        </div>

        {/* 메시지 */}
        <p className='text-center text-fg-gray nbp-16-b mb-8 whitespace-pre-line'>{message}</p>
        {/* 버튼 */}
        <Button variant='primary' fullWidth onClick={onConfirm}>
          {confirmText}
        </Button>
      </div>
    </div>
  );
};

export default VerificationCompleteModal;
