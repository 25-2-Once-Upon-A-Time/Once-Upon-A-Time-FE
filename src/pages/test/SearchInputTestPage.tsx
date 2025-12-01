import React, { useState } from 'react';
import SearchInput from '@/components/ui/SearchInput/SearchInput';

const SearchInputTestPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-center">Search Input 컴포넌트 테스트</h1>
        
        <SearchInput
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

      </div>
    </div>
  );
};

export default SearchInputTestPage;
