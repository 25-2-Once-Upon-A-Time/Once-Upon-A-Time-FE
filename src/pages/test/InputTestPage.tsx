import React, { useState } from 'react';
import Input from '@/components/ui/Input/Input';

const InputTestPage: React.FC = () => {
  const [value, setValue] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-center">Input 컴포넌트 테스트</h1>
        
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        
      </div>
    </div>
  );
};

export default InputTestPage;
