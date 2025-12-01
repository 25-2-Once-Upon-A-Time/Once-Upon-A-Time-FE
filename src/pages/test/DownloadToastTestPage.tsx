import React, { useState, useEffect } from 'react';
import { DownloadToast } from '@/components/ui/DownloadToast';
import Button from '@/components/ui/Button/Button';

const DownloadToastTestPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  // 다운로드 시작 함수
  const handleDownload = () => {
    setIsVisible(true);
    setProgress(0);
  };

  // progress가 변경될 때마다 자동으로 증가
  useEffect(() => {
    if (isVisible && progress < 100) {
      const timer = setTimeout(() => {
        setProgress((prev) => Math.min(prev + 10, 100));
      }, 500);

      return () => clearTimeout(timer);
    } else if (progress >= 100) {
      // 100% 완료 시 3초 후 토스트 숨김
      const timer = setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, progress]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-center">다운로드 토스트 테스트</h1>
        
        <Button variant="primary" onClick={handleDownload}>
          다운로드 시작
        </Button>

        <DownloadToast
          isVisible={isVisible}
          progress={progress}
          onClose={() => setIsVisible(false)}
        />
      </div>
    </div>
  );
};

export default DownloadToastTestPage;
