import React from 'react';
import { Toast } from '@/components/ui/Toast';
import { useToast } from '@/hooks/useToast';
import Button from '@/components/ui/Button/Button';

const ToastTestPage: React.FC = () => {
  const { isVisible, message, showToast, hideToast } = useToast();

  const handleSkip = () => {
    showToast('10초 앞으로 건너뛰었습니다.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-center">Toast 컴포넌트 예시</h1>
        
        <Button variant="primary" onClick={handleSkip}>
          10초 건너뛰기
        </Button>

        <Toast
          message={message}
          isVisible={isVisible}
          onClose={hideToast}
          duration={3000}
        />
      </div>
    </div>
  );
};

export default ToastTestPage;
