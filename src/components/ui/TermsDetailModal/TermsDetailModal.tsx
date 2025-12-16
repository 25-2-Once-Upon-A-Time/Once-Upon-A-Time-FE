import React from 'react';
import backIcon from '@/assets/icons/backarrow.svg';
import type { TermsDetailModalProps } from './TermsDetailModal.types';

const TermsDetailModal: React.FC<TermsDetailModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  termsData,
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex flex-col h-full bg-bg-purple-50'>
      {/* 헤더 */}
      <div className='fixed top-0 left-0 right-0 flex items-center justify-center h-[56px] bg-bg-purple-50 z-50'>
        <button type='button' onClick={onClose} className='absolute left-[16px] p-[8px]'>
          <img src={backIcon} alt='뒤로가기' className='w-[22px] h-[22px]' />
        </button>
        <span className='nsr-24-eb'>{title}</span>
      </div>

      {/* 세부 타이틀 (있을 때만 표시) */}
      {subtitle && (
        <div className='w-full pt-[65px]'>
          <p className='text-fg-primary pre-18-sb-uppercase text-center'>{subtitle}</p>
        </div>
      )}

      {/* 약관 내용 스크롤 영역 */}
      <div className={`w-full px-7 overflow-y-auto flex-1 pb-8 ${subtitle ? 'pt-8' : 'pt-[65px]'}`}>
        <div className='space-y-4 text-fg-primary pre-14-m'>
          {termsData.map((item, index) => (
            <React.Fragment key={index}>
              <p className='font-semibold'>{item.title}</p>
              {Array.isArray(item.content) ? (
                item.content.map((line, lineIndex) => <p key={lineIndex}>{line}</p>)
              ) : (
                <p>{item.content}</p>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsDetailModal;
