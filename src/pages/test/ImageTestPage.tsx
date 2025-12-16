import React from 'react';
import Image from '@/components/ui/Image/Image';

const ImageTestPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-center mb-8">Image 컴포넌트 테스트</h1>
        
        <div className="space-y-4">
          {/* fallback 이미지 */}
          <Image />
          
          {/* 실제 이미지 예시 (추후 추가 가능) */}
          {/* <Image 
            src="https://example.com/illustration.jpg" 
            alt="동화 삽화"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default ImageTestPage;
