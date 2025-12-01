import React from 'react';
import Tag from '@/components/ui/Tag/Tag';

const TagTestPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-center mb-8">Tag 컴포넌트 테스트</h1>
        
        <div className="flex flex-wrap gap-4">
          <Tag>주간 TOP3 동화</Tag>
          <Tag>주간 TOP3 목소리</Tag>
          <Tag>찜한 목소리</Tag>
        </div>
      </div>
    </div>
  );
};

export default TagTestPage;
