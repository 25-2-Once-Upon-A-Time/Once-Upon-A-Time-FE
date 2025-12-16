import React from 'react';
import { ErrorToast } from '@/components/ui/ErrorToast';
import { useToast } from '@/hooks/useToast';
import Button from '@/components/ui/Button/Button';

const ErrorToastTestPage: React.FC = () => {
  const { isVisible, message, showToast, hideToast } = useToast();

  const handleShowError = () => {
    showToast('검색 오류입니다.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-center">오류 토스트 테스트</h1>
        
        <Button variant="primary" onClick={handleShowError}>
          오류 발생
        </Button>

        <ErrorToast
          isVisible={isVisible}
          message={message}
          onClose={hideToast}
        />
      </div>
    </div>
  );
};

export default ErrorToastTestPage;
