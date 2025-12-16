import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '@/components/ui/TopNav/TopNav';
import ImageCard from '@/components/ui/ImageCard/ImageCard';
import Button from '@/components/ui/Button/Button';
import headphonesIcon from '@/assets/icons/headphones.svg';
import LoadingModal from '@/components/ui/LoadingModal';
import CircleSelect from '@/features/audiobook/CircleSelect/CircleSelect';
import { useStories } from '@/hooks/queries/useStories';
import { useCharacters } from '@/hooks/queries/useCharacters';
import { useCreateAudioBook } from '@/hooks/queries/useAudioBook';

const AudioBookCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedStoryId, setSelectedStoryId] = useState<number | null>(null);
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(null);

  // Queries
  const { data: storyList = [], isLoading: isStoriesLoading } = useStories();
  const { data: characterList = [], isLoading: isCharactersLoading } = useCharacters();
  const createAudioBookMutation = useCreateAudioBook();

  const handleGoToList = () => {
    if (!selectedStoryId || !selectedCharacterId) {
      setStep(!selectedStoryId ? 1 : 2);
      return;
    }

    const selectedStory = storyList.find((s) => s.id === selectedStoryId);

    createAudioBookMutation.mutate(
      {
        storyId: selectedStoryId,
        characterId: selectedCharacterId,
        // 백엔드에서 유효한 Enum 값이나 라벨을 기대하므로 유효한 값으로 설정 ('기본' -> '모험', '편안한' -> '따뜻한')
        theme: selectedStory?.theme || '모험',
        vibe: selectedStory?.vibe || '따뜻한',
      },
      {
        onSuccess: (data) => {
          // 생성 완료 후 해당 오디오북 상세/재생 페이지로 이동
          const targetId = data.audiobookId || (data as any).id;
          navigate(`/audiobook/${targetId}/playback`, { replace: true });
        },
        onError: (error: any) => {
          console.error('오디오북 생성 실패:', error);
          const message = error.response?.data?.message || '오디오북 생성에 실패했습니다.';
          alert(message);
        },
      },
    );
  };

  // 단계 설정
  const STEP_CONFIG = {
    1: { progress: 0, text: '동화를 선택해주세요.' },
    2: { progress: 50, text: '캐릭터를 선택해주세요.' },
    3: { progress: 100, text: ' ' },
  };

  const currentStep = STEP_CONFIG[step];

  const selectedStory = selectedStoryId
    ? storyList.find((s) => s.id === selectedStoryId)
    : undefined;
  const selectedChar = selectedCharacterId
    ? characterList.find((c) => c.id === selectedCharacterId)
    : undefined;

  if (isStoriesLoading || isCharactersLoading) {
    return <div className='text-center mt-20'>불러오는 중...</div>;
  }

  return (
    <div className='max-w-[430px] min-w-[360px] min-h-screen flex flex-col mx-auto bg-bg-purple-50'>
      {/* TopNav 상단 고정 */}
      <TopNav title='오디오북 생성' showBack className='bg-bg-purple-50' />

      {/* 프로그래스바 */}
      <div className='px-4 mt-[72px]'>
        <div className='w-full h-[8px] bg-bg-disabled rounded-full overflow-hidden'>
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

      {/* 1단계: 동화 선택 */}
      {step === 1 && (
        <div className='grid grid-cols-2 gap-[18px] self-stretch px-[16px] overflow-y-auto pb-10'>
          {storyList.map((story) => (
            <button
              key={story.id}
              type='button'
              onClick={() => {
                setSelectedStoryId(story.id);
                setStep(2);
              }}
            >
              <ImageCard title={story.title} imageSrc={story.thumbnailUrl} />
            </button>
          ))}
        </div>
      )}

      {/* 2단계: 캐릭터 선택 */}
      {step === 2 && (
        <div className='grid grid-cols-2 gap-[18px] self-stretch px-[16px] overflow-y-auto pb-10'>
          {characterList.map((character) => (
            <button
              key={character.id}
              type='button'
              onClick={() => {
                setSelectedCharacterId(character.id);
                setStep(3);
              }}
            >
              <ImageCard title={character.characterName} imageSrc={character.thumbnailUrl} />
            </button>
          ))}
        </div>
      )}

      {/* 3단계: 오디오북 생성 */}
      {step === 3 && (
        <div className='relative flex flex-col items-center self-stretch flex-1 justify-start pt-6'>
          <img src={headphonesIcon} alt='headphones' className='w-[150px] h-[150px] mb-4 mx-auto' />

          <h2 className='ng-25-n text-fg-primary'>오디오북을 생성할까요?</h2>

          <p className='ng-18-n text-fg-primary text-center whitespace-pre-line mt-2'>
            선택하신 캐릭터의 목소리로
            {'\n'}동화를 들려드려요
          </p>

          {/* 동화/캐릭터 circle */}
          <div className='mx-auto mt-[60px] flex items-start justify-center gap-[50px] md:gap-[70px] mb-[80px]'>
            <CircleSelect
              title={selectedStory ? selectedStory.title : '동화'}
              imageSrc={selectedStory?.thumbnailUrl}
              alt={selectedStory?.title}
              bgColor='var(--color-fg-peach)'
              circleSize='w-[72px] h-[72px] md:w-[90px] md:h-[90px]'
              imgSize='w-[43px] h-[43px] md:w-[32px] md:h-[32px]'
              titleMaxWidth='max-w-[72px] md:max-w-[90px]'
            />

            <CircleSelect
              title={selectedChar ? selectedChar.characterName : '캐릭터'}
              imageSrc={selectedChar?.thumbnailUrl}
              alt={selectedChar?.characterName}
              bgColor='var(--color-fg-yellow)'
              circleSize='w-[72px] h-[72px] md:w-[90px] md:h-[90px]'
              imgSize='w-[43px] h-[43px] md:w-[32px] md:h-[32px]'
              titleMaxWidth='max-w-[72px] md:max-w-[90px]'
            />
          </div>

          {/* 하단 고정 버튼들 */}
          <div className='mt-auto mb-[60px] flex flex-col items-center gap-3'>
            <div className='w-[320px]'>
              <Button
                onClick={handleGoToList}
                variant='primary'
                fullWidth
                disabled={createAudioBookMutation.isPending}
              >
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
        isOpen={createAudioBookMutation.isPending}
        title='오디오북을 생성중입니다'
        subtitle='잠시만 기다려주세요'
        bottomText='나만의 오디오북을 만들고 있어요'
      />
    </div>
  );
};

export default AudioBookCreatePage;
