import React from 'react';
import ImageCard from '@/components/ui/ImageCard/ImageCard';
import Image from '@/components/ui/Image/Image';
import testImage from '@/assets/images/test-image.svg';

const ImageCardTestPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-center mb-8">Image Card 컴포넌트 테스트</h1>
        
        {/* 같은 이미지를 Image와 ImageCard에서 사용 */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Image 컴포넌트 (원본)</h2>
          <Image src={testImage} alt="테스트 이미지" />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">ImageCard 컴포넌트 (재사용)</h2>
          <div className="flex flex-wrap gap-4">
            {/* 같은 이미지 사용 */}
            <ImageCard title="Amazing Shoes" imageSrc={testImage} />
            
            {/* placeholder */}
            <ImageCard title="No Image" />
            
            <ImageCard title="긴 제목도 잘려서 표시됩니다 Very Long Title" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCardTestPage;
