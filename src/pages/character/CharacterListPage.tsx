import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '@/components/ui/TopNav/TopNav';
import SearchInput from '@/components/ui/SearchInput/SearchInput';
import ImageCard from '@/components/ui/ImageCard/ImageCard';
import { BottomNav } from '@/components/ui/BottomNav';
import ErrorToast from '@/components/ui/ErrorToast/ErrorToast';
import { characters } from '@/constants/characters';
import notFoundIllustration from '@/assets/images/404Illustration.svg';

const CharacterListPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showError, setShowError] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);

  const filteredCharacters = characters.filter((character) =>
    character.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const executeSearch = () => {
    // 검색어가 비어있으면 404 표시
    if (searchTerm.trim() === '') {
      setSearchQuery('');
      setShowNotFound(true);
      setShowError(false);
      return;
    }

    // 특수문자 여부 확인
    const hasSpecial = /[^\p{L}\p{N}\s]/u.test(searchTerm);

    setSearchQuery(searchTerm);

    const filtered = characters.filter((character) =>
      character.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (hasSpecial) {
      // 특수문자가 포함된 경우 에러 토스트만 표시
      setShowError(true);
      setShowNotFound(false);
    } else if (filtered.length === 0) {
      // 특수문자가 없고 결과가 없는 경우에는 '검색 결과 없음' UI 표시
      setShowError(false);
      setShowNotFound(true);
    } else {
      // 결과가 있을 때
      setShowError(false);
      setShowNotFound(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeSearch();
    }
  };

  const handleErrorClose = () => {
    setShowError(false);
    setShowNotFound(false);
    setSearchTerm('');
    setSearchQuery('');
  };

  const handleCharacterClick = (id: number) => {
    navigate(`/character/${id}`);
  };

  return (
    <div className='w-full min-h-screen flex flex-col bg-bg-purple-50'>
      <TopNav title='캐릭터' className='bg-bg-purple-50' />

      {/* Search (fixed under TopNav) */}
      <div className='fixed top-[72px] left-0 right-0 z-40 px-4'>
        <div className='max-w-[480px] mx-auto'>
          <SearchInput
            className='w-full'
            value={searchTerm}
            onChange={handleSearch}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>

      {/* 캐릭터 리스트 */}
      <div className='flex-1 w-full px-4 pb-20 overflow-y-auto relative pt-[140px]'>
        {showError && (
          <div className='w-full mb-2'>
            <ErrorToast
              isVisible={showError}
              message='검색 결과가 없습니다.'
              onClose={handleErrorClose}
              className='w-full'
            />
          </div>
        )}

        {showNotFound ? (
          <div className='absolute left-1/2 -translate-x-1/2 top-[129px] flex flex-col items-center'>
            <img src={notFoundIllustration} alt='검색 결과 없음' className='w-[197px] h-[131px]' />
            <p className='pre-14-r text-fg-primary mt-4'>아무것도 찾지 못했습니다..</p>
          </div>
        ) : (
          <div className='grid grid-cols-2 gap-4'>
            {filteredCharacters.map((character) => (
              <div
                key={character.id}
                onClick={() => handleCharacterClick(character.id)}
                className='cursor-pointer'
              >
                <ImageCard
                  title={character.title}
                  imageSrc={character.imageSrc}
                  className='w-full'
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default CharacterListPage;
