import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

const ModalTestPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className='p-[24px]'>
      <h1 className='text-[24px] font-bold mb-[24px]'>Modal 테스트</h1>

      <Button variant='primary' fullWidth onClick={() => setIsOpen(true)}>
        모달 열기
      </Button>

      <Modal
        isOpen={isOpen}
        title='서비스 오류로 일시정지 되었습니다.'
        description='불편을 드려 죄송합니다.'
        onClose={() => setIsOpen(false)}
        //onConfirm이 오른쪽 버튼
        onConfirm={() => navigate('/')}
        cancelText='대기'
        confirmText='홈으로'
      />
    </div>
  );
};

export default ModalTestPage;
