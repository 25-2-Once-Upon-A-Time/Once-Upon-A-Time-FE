// pages/story/StoryPage.tsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { TopNav } from '@/components/TopNav';
import SearchInput from '@/components/ui/SearchInput/SearchInput';
import ImageCard from '@/components/ui/ImageCard/ImageCard';
import CreateStoryButton from '@/components/ui/CreateStoryButton';
import ErrorToast from '@/components/ui/ErrorToast/ErrorToast';
import NothingImage from '@/assets/images/nothing.svg';
import { storyList } from '@/TestDB/StoryData_Test';

// 특수문자 포함 체크 정규식
const HAS_SPECIAL_CHAR = /[*%$#@!^&()+=\[\]{}<>?/\\|~`]/;

const StoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showError, setShowError] = useState(false); // 특수문자 오류
  const [showNotFound, setShowNotFound] = useState(false); // 검색 결과 없음
  const [isScrolled, setIsScrolled] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const filteredStories = storyList.filter((story) =>
    story.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleScroll = () => {
    if (mainRef.current) {
      setIsScrolled(mainRef.current.scrollTop > 0);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const executeSearch = () => {
    // 특수문자 포함 시 오류
    if (HAS_SPECIAL_CHAR.test(searchTerm)) {
      setShowError(true);
      setShowNotFound(false);
      setSearchQuery('');
      return;
    }

    // 검색어가 비어있으면 전체 목록 표시
    if (searchTerm.trim() === '') {
      setSearchQuery('');
      setShowError(false);
      setShowNotFound(false);
      return;
    }

    setSearchQuery(searchTerm);
    const filtered = storyList.filter((story) =>
      story.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // 검색 결과 없음
    if (filtered.length === 0) {
      setShowNotFound(true);
      setShowError(false);
    } else {
      setShowNotFound(false);
      setShowError(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeSearch();
    }
  };

  const handleErrorClose = () => {
    setShowError(false);
    setSearchTerm('');
    setSearchQuery('');
  };

  const handleStoryClick = (id: number) => {
    navigate(`/story/${id}`);
  };

  return (
    <div className='w-full h-screen flex flex-col bg-white overflow-hidden'>
      <TopNav title='동화' showBack={false} className='static bg-white' />

      <div className='w-full px-4 py-4 flex-shrink-0'>
        <SearchInput
          className='w-full'
          value={searchTerm}
          onChange={handleSearch}
          onKeyPress={handleKeyPress}
        />
      </div>

      {/* 특수문자 오류 토스트 */}
      {showError && (
        <div className='w-full px-4 mb-2 flex-shrink-0'>
          <ErrorToast
            isVisible={showError}
            message='검색오류입니다.'
            onClose={handleErrorClose}
            className='static translate-x-0 w-full'
          />
        </div>
      )}

      {/* 동화 리스트 (스크롤 영역) */}
      <div
        ref={mainRef}
        onScroll={handleScroll}
        className='flex-1 w-full px-[4%] pb-28 overflow-y-scroll relative overscroll-y-auto'
      >
        {showError ? null : showNotFound ? (
          <div className='absolute left-1/2 -translate-x-1/2 top-[129px] flex flex-col items-center'>
            <img src={NothingImage} alt='검색 결과 없음' className='w-[197px] h-[131px]' />
            <p className='pre-14-r text-fg-primary mt-4'>검색 결과가 없습니다.</p>
          </div>
        ) : (
          <div className='grid grid-cols-2 gap-[4%] gap-y-4 pb-4'>
            {filteredStories.map((story) => (
              <div
                key={story.id}
                onClick={() => handleStoryClick(story.id)}
                className='cursor-pointer'
              >
                <ImageCard title={story.title} imageSrc={story.imageSrc} className='w-full' />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 동화생성 버튼 */}
      <div className='fixed bottom-[90px] right-[20px] z-50'>
        <CreateStoryButton collapsed={isScrolled} />
      </div>

      <BottomNav />
    </div>
  );
};

export default StoryPage;
