// pages/story/StoryCreatePage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageCard from '@/components/ui/ImageCard/ImageCard';
import Button from '@/components/ui/Button/Button';
import LoadingModal from '@/components/ui/LoadingModal';
import backIcon from '@/assets/Nav/icons/back.png';

// 테마 옵션
const THEME_OPTIONS = [
  { id: 'courage', label: '용기', imageSrc: undefined },
  { id: 'friendship', label: '우정', imageSrc: undefined },
  { id: 'family', label: '가족애', imageSrc: undefined },
  { id: 'adventure', label: '모험', imageSrc: undefined },
  { id: 'cooperation', label: '협동', imageSrc: undefined },
  { id: 'diversity', label: '다양성', imageSrc: undefined },
];

// 분위기 옵션
const MOOD_OPTIONS = [
  { id: 'warm', label: '따뜻한', imageSrc: undefined },
  { id: 'exciting', label: '신나는', imageSrc: undefined },
  { id: 'mysterious', label: '신비로운', imageSrc: undefined },
  { id: 'funny', label: '유쾌한', imageSrc: undefined },
  { id: 'calm', label: '잔잔한', imageSrc: undefined },
  { id: 'dreamy', label: '몽환적인', imageSrc: undefined },
];

// 단계 설정
const STEP_CONFIG = {
  1: { progress: 25, text: '동화의 테마를 선택하세요' },
  2: { progress: 50, text: '동화의 분위기를 선택하세요' },
  3: { progress: 75, text: '어떤 이야기를 만들어 볼까요?' },
  4: { progress: 100, text: '동화 제목을 지어주세요' },
};

const StoryCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [storyPrompt, setStoryPrompt] = useState('');
  const [storyTitle, setStoryTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const currentStep = STEP_CONFIG[step];

  // 뒤로가기
  const handleBack = () => {
    if (step === 1) {
      navigate('/story');
    } else {
      setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
    }
  };

  // 테마 선택
  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    setStep(2);
  };

  // 분위기 선택
  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    setStep(3);
  };

  // 다음 단계 (제목 입력)
  const handleNextToTitle = () => {
    setStep(4);
  };

  // 동화 생성 테스트 로딩
  const handleCreateStory = () => {
    setIsLoading(true);

    // 테스트용 10초 후 완료
    setTimeout(() => {
      setIsLoading(false);
      navigate('/story');
    }, 10000);
  };

  return (
    <div className='w-full min-h-screen flex flex-col bg-white'>
      {/* 상단 고정 영역 */}
      <div className='fixed top-0 left-0 right-0 z-40 bg-white'>
        <div className='max-w-[480px] mx-auto'>
          {/* 헤더 */}
          <div className='h-[56px] flex items-center justify-center relative'>
            <button type='button' onClick={handleBack} className='absolute left-[16px] p-[8px]'>
              <img src={backIcon} alt='뒤로가기' className='w-[22px] h-[22px]' />
            </button>
            <span className='nsr-20-eb'>동화 생성</span>
          </div>

          {/* 프로그래스바 */}
          <div className='px-4 py-4'>
            <div className='w-full h-[8px] bg-[#DBDBDB] rounded-full overflow-hidden'>
              <div
                className='h-full bg-[#898AC4] rounded-full transition-all duration-300'
                style={{ width: `${currentStep.progress}%` }}
              />
            </div>
          </div>

          {/* 단계 설명 */}
          <div className='px-4 pb-4'>
            <p className='nbp-16-b text-center'>
              {step}단계: {currentStep.text}
            </p>
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className='flex-1 w-full pt-[160px] px-4 pb-20 overflow-y-auto'>
        {/* 1단계: 테마 선택 */}
        {step === 1 && (
          <div className='grid grid-cols-2 gap-4'>
            {THEME_OPTIONS.map((theme) => (
              <div
                key={theme.id}
                onClick={() => handleThemeSelect(theme.id)}
                className='cursor-pointer'
              >
                <ImageCard title={theme.label} imageSrc={theme.imageSrc} className='w-full' />
              </div>
            ))}
          </div>
        )}

        {/* 2단계: 분위기 선택 */}
        {step === 2 && (
          <div className='grid grid-cols-2 gap-4'>
            {MOOD_OPTIONS.map((mood) => (
              <div
                key={mood.id}
                onClick={() => handleMoodSelect(mood.id)}
                className='cursor-pointer'
              >
                <ImageCard title={mood.label} imageSrc={mood.imageSrc} className='w-full' />
              </div>
            ))}
          </div>
        )}

        {/* 3단계: 스토리 입력 */}
        {step === 3 && (
          <div className='space-y-6'>
            <textarea
              value={storyPrompt}
              onChange={(e) => setStoryPrompt(e.target.value)}
              placeholder='ex) 친구와 음식을 나누어먹는 이야기'
              className='w-full h-[150px] p-4 border-2 border-[#898AC4] rounded-[16px] ng-16-r placeholder:text-gray-400 focus:outline-none resize-none'
            />
            {storyPrompt.length > 0 && (
              <Button
                onClick={handleNextToTitle}
                fullWidth
                className='bg-[#898AC4] text-white rounded-[12px] hover:brightness-95 active:brightness-90'
              >
                다음
              </Button>
            )}
          </div>
        )}

        {/* 4단계: 제목 입력 */}
        {step === 4 && (
          <div className='space-y-6'>
            <textarea
              value={storyTitle}
              onChange={(e) => setStoryTitle(e.target.value)}
              placeholder='ex) 나누어먹으면 맛있어요'
              rows={2}
              className='w-full p-4 border-2 border-[#898AC4] rounded-[16px] ng-16-r placeholder:text-gray-400 focus:outline-none resize-none'
            />
            {storyTitle.length > 0 && (
              <Button
                onClick={handleCreateStory}
                fullWidth
                className='bg-[#898AC4] text-white rounded-[12px] hover:brightness-95 active:brightness-90'
              >
                동화 생성
              </Button>
            )}
          </div>
        )}
      </div>

      {/* 로딩 모달 */}
      <LoadingModal
        isOpen={isLoading}
        title='동화를 생성중입니다'
        subtitle='잠시만 기다려주세요'
        bottomText='특별한 이야기를 만들고 있어요'
      />
    </div>
  );
};

export default StoryCreatePage;
