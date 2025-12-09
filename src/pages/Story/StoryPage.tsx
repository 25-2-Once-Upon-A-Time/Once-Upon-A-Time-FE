import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/ui/BottomNav';
import { TopNav } from '@/components/ui/TopNav';
import SearchInput from '@/components/ui/SearchInput/SearchInput';
import ImageCard from '@/components/ui/ImageCard/ImageCard';
import CreateStoryButton from '@/components/ui/CreateStoryButton';
import ErrorToast from '@/components/ui/ErrorToast/ErrorToast';
import NothingImage from '@/assets/images/nothing.svg';
import notFoundIllustration from '@/assets/images/404Illustration.svg';
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

  // 동화 목록이 비어있는지 확인
  const isEmptyList = storyList.length === 0;

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

  // 빈 상태 렌더링 함수
  const renderEmptyState = () => {
    // 1. 동화 목록 자체가 비어있을 때
    if (isEmptyList) {
      return (
        <div className='flex flex-col items-center mt-[100px]'>
          <img src={NothingImage} alt='생성된 동화 없음' className='w-[197px] h-[131px]' />
          <p className='pre-14-r text-fg-primary mt-4 text-center'>
            생성된 동화가 없어요!
            <br />
            나만의 동화를 만들러가볼까요?
          </p>
        </div>
      );
    }

    // 2. 검색 결과가 없을 때
    if (showNotFound) {
      return (
        <div className='flex flex-col items-center mt-[40px]'>
          <img src={notFoundIllustration} alt='검색 결과 없음' className='w-[197px] h-[131px]' />
          <p className='pre-14-r text-fg-primary mt-4'>검색 결과가 없습니다.</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className='w-full h-screen flex flex-col overflow-hidden'>
      <TopNav title='동화' showBack={false} />

      {/* Search */}
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

      {/* 동화 리스트 (스크롤 영역) */}
      <div
        ref={mainRef}
        onScroll={handleScroll}
        className='flex-1 w-full px-[4%] pb-28 overflow-y-scroll relative overscroll-y-auto pt-[140px]'
      >
        {showError ? (
          <div className='w-full px-0 mb-2'>
            <ErrorToast
              isVisible={showError}
              message='검색오류입니다.'
              onClose={handleErrorClose}
              className='w-full'
            />
          </div>
        ) : isEmptyList || showNotFound ? (
          renderEmptyState()
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
      <div className='fixed bottom-[100px] right-[20px] z-50'>
        <CreateStoryButton collapsed={isScrolled} />
      </div>

      <BottomNav />
    </div>
  );
};

export default StoryPage;
