import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '@/components/ui/TopNav/TopNav';
import Image from '@/components/ui/Image/Image';
import ImageCard from '@/components/ui/ImageCard/ImageCard';
import Button from '@/components/ui/Button/Button';
import headphonesIcon from '@/assets/icons/headphones.svg';
import { characters } from '@/constants/characters';
import { storyList } from '@/TestDB/StoryData_Test';
import LoadingModal from '@/components/ui/LoadingModal';

const AudioBookCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);
  const [selectedStoryId, setSelectedStoryId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoToList = () => {
    // Validate selection
    if (!selectedStoryId || !selectedCharacter) {
      // if missing, go back to the appropriate step
      setStep(!selectedStoryId ? 1 : 2);
      return;
    }

    setIsLoading(true);

    // Simulate server creation of audiobook and get new id
    const newId = Math.floor(Date.now() / 1000);

    // Simulate async creation (1.5s) then navigate
    setTimeout(() => {
      setIsLoading(false);
      // find selected story/character to pass to play page as fallback data
      const story = storyList.find((s) => s.id === selectedStoryId);
      const char = characters.find((c) => c.id === selectedCharacter);

      // collect tags from story and character if available
      // prefer explicit story.tags if present, otherwise derive from theme/mood
      let storyTags: string[] = [];
      if (story) {
        if ((story as any).tags && Array.isArray((story as any).tags)) {
          storyTags = (story as any).tags;
        } else {
          // derive tags from theme/mood if available
          const derived: string[] = [];
          if ((story as any).theme) derived.push(`#${(story as any).theme}`);
          if ((story as any).mood) derived.push(`#${(story as any).mood}`);
          storyTags = derived;
        }
      }
      // Only use story-derived tags (theme/mood or explicit story.tags). Do NOT include character tags.
      const mergedTags = Array.from(new Set([...storyTags]));

      const createdAudio = {
        id: newId,
        title: story?.title || '내가 만든 오디오북',
        imageSrc: story?.imageSrc || '',
        character: char?.title || '캐릭터',
        tags: mergedTags,
        time: '00:00:00',
      };

      // Persist created audiobook in localStorage so list page can show it
      try {
        const stored = JSON.parse(localStorage.getItem('localAudiobooks') || '[]');
        // prepend to keep most-recent-first order
        const newStored = Array.isArray(stored) ? [createdAudio, ...stored] : [createdAudio];
        localStorage.setItem('localAudiobooks', JSON.stringify(newStored));
      } catch (e) {
        // ignore storage errors
      }

      navigate(`/audiobook/${newId}`, { state: { audiobook: createdAudio } });
    }, 1500);
  };
  // 단계 설정
  const STEP_CONFIG = {
    1: { progress: 0, text: '동화를 선택해주세요.' },
    2: { progress: 50, text: '캐릭터를 선택해주세요.' },
    3: { progress: 100, text: ' ' },
  };

  const currentStep = STEP_CONFIG[step];

  return (
    <div className='max-w-[430px] min-w-[360px] min-h-screen flex flex-col mx-auto'>
      {/* TopNav 상단 고정 */}
      <TopNav title='오디오북 생성' showBack className='bg-bg-purple-50' />

      {/* 프로그래스바: TopNav 아래 72px에 고정 */}
      <div className='px-4 mt-[72px]'>
        <div className='w-full h-[8px] bg-[#DBDBDB] rounded-full overflow-hidden'>
          <div
            className='h-full bg-[#898AC4] rounded-full transition-all duration-300'
            style={{ width: `${currentStep.progress}%` }}
          />
        </div>
      </div>

      {/* 단계 설명 */}
      <div className='px-4 pb-4 mt-[24px]'>
        <p className='ng-16-n text-gray-800 self-stretch'>
          {step === 3 ? currentStep.text : `${step}단계: ${currentStep.text}`}
        </p>
      </div>

      {/* 1단계: 동화 선택 (2x3 배열, 양옆 48px 공백) - StoryPage에서 생성한 동화만 표시 */}
      {step === 1 && (
        <div className='grid grid-cols-2 grid-rows-3 gap-[18px] self-stretch px-[16px]'>
          {storyList.slice(0, 6).map((story) => (
            <button
              key={story.id}
              type='button'
              onClick={() => {
                setSelectedStoryId(story.id);
                setStep(2);
              }}
            >
              <ImageCard title={story.title} imageSrc={story.imageSrc} />
            </button>
          ))}
        </div>
      )}

      {/* 2단계: 캐릭터 선택 (constants/characters 데이터 사용) */}
      {step === 2 && (
        <div className='grid grid-cols-2 grid-rows-3 gap-[18px] self-stretch px-[16px]'>
          {characters.map((character) => (
            <button
              key={character.id}
              type='button'
              onClick={() => {
                setSelectedCharacter(character.id);
                setStep(3);
              }}
            >
              <ImageCard title={character.title} imageSrc={character.imageSrc} />
            </button>
          ))}
        </div>
      )}

      {/* 3단계: 오디오북 생성 */}
      {step === 3 && (
        <div className='relative flex flex-col items-center self-stretch flex-1 justify-start pt-6'>
          {/* 동화/캐릭터 circle은 설명문 아래에 렌더됩니다 (아래로 이동됨) */}

          <img src={headphonesIcon} alt='headphones' className='w-[150px] h-[150px] mb-4 mx-auto' />

          <h2 className='ng-25-n text-fg-primary'>오디오북을 생성할까요?</h2>

          <p className='ng-18-n text-fg-primary text-center whitespace-pre-line mt-2'>
            선택하신 캐릭터의 목소리로
            {'\n'}동화를 들려드려요
          </p>

          {/* 동화/캐릭터 circle: 버튼 상단으로부터 약 100px 위에 위치 (반응형) */}
          <div className='mx-auto mt-[60px] flex items-center justify-center gap-[50px] md:gap-[70px] mb-[80px]'>
            {/* Story circle */}
            <div className='flex flex-col items-center'>
              <div
                className='w-[72px] h-[72px] md:w-[90px] md:h-[90px] rounded-full flex items-center justify-center'
                style={{ backgroundColor: 'var(--color-fg-peach)' }}
              >
                {selectedStoryId ? (
                  (() => {
                    const story = storyList.find((s) => s.id === selectedStoryId);
                    return (
                      <Image
                        src={story?.imageSrc || ''}
                        alt={story?.title || 'story'}
                        className='w-[28px] h-[28px] md:w-[32px] md:h-[32px]'
                      />
                    );
                  })()
                ) : (
                  <div className='w-[32px] h-[32px]' />
                )}
              </div>
              <span className='ng-15-n mt-3'>
                {selectedStoryId
                  ? storyList.find((s) => s.id === selectedStoryId)?.title || ''
                  : '동화'}
              </span>
            </div>

            {/* Character circle */}
            <div className='flex flex-col items-center'>
              <div
                className='w-[72px] h-[72px] md:w-[90px] md:h-[90px] rounded-full flex items-center justify-center'
                style={{ backgroundColor: 'var(--color-fg-yellow)' }}
              >
                {selectedCharacter ? (
                  (() => {
                    const char = characters.find((c) => c.id === selectedCharacter);
                    return (
                      <Image
                        src={char?.imageSrc || ''}
                        alt={char?.title || 'character'}
                        className='w-[28px] h-[28px] md:w-[32px] md:h-[32px]'
                      />
                    );
                  })()
                ) : (
                  <div className='w-[32px] h-[32px]' />
                )}
              </div>
              <span className='ng-15-n mt-3'>
                {selectedCharacter
                  ? characters.find((c) => c.id === selectedCharacter)?.title || ''
                  : '캐릭터'}
              </span>
            </div>
          </div>

          {/* 하단 고정 버튼들: bottom에서 약 60px 위에 배치 */}
          <div className='mt-auto mb-[60px] flex flex-col items-center gap-3'>
            <div className='w-[320px]'>
              <Button onClick={handleGoToList} variant='primary' fullWidth disabled={isLoading}>
                <span className='pre-16-43-r'>오디오북 생성하기</span>
              </Button>
            </div>

            <div className='w-[320px]'>
              <Button
                onClick={() => setStep(1)}
                variant='back'
                fullWidth
                className='bg-bg-purple-600 text-white'
              >
                <span className='pre-16-43-r'>다시 선택하기</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 로딩 모달 */}
      <LoadingModal
        isOpen={isLoading}
        title='오디오북을 생성중입니다'
        subtitle='잠시만 기다려주세요'
        bottomText='나만의 오디오북을 만들고 있어요'
      />
    </div>
  );
};

export default AudioBookCreatePage;
