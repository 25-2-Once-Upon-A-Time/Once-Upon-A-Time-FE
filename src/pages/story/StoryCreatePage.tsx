import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageCard from '@/components/ui/ImageCard/ImageCard';
import Button from '@/components/ui/Button/Button';
import Image from '@/components/ui/Image/Image';
import LoadingModal from '@/components/ui/LoadingModal';
import backIcon from '@/assets/icons/back.svg';
import { useCreateStory } from '@/hooks/queries/useStories';
import { generateThumbnail } from '@/api/story/story';

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
  5: { progress: 100, text: '동화 생성 완료!' },
};

const StoryCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [storyPrompt, setStoryPrompt] = useState('');
  const [storyTitle, setStoryTitle] = useState('');

  const [generatedStoryId, setGeneratedStoryId] = useState<number | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | undefined>(undefined);
  const [isGeneratingThumbnail, setIsGeneratingThumbnail] = useState(false);

  // React Query Mutation
  const createStoryMutation = useCreateStory();

  const isLoading = createStoryMutation.isPending || isGeneratingThumbnail;

  const currentStep = STEP_CONFIG[step];

  // 뒤로가기
  const handleBack = () => {
    if (step === 1 || step === 5) {
      navigate('/story');
    } else {
      setStep((p) => (p - 1) as any);
    }
  };

  const handleCreate = async () => {
    if (!selectedTheme || !selectedMood) return;

    const requestData = {
      theme: getThemeLabel(selectedTheme),
      vibe: getMoodLabel(selectedMood),
      prompt: storyPrompt,
      title: storyTitle,
    };

    // console.log('🔍 동화 생성 요청 데이터:', requestData);

    createStoryMutation.mutate(requestData, {
      onSuccess: async (data) => {
        // console.log('✅ 동화 생성 성공:', data);
        // console.log('✅ data 타입:', typeof data);
        // console.log('✅ data.storyId:', data?.storyId);

        // 방어 코드: data나 storyId가 없는 경우 처리
        if (!data || !data.storyId) {
          // console.error('⚠️ storyId가 없습니다. 전체 data:', data);
          alert('동화가 생성되었지만 ID를 받지 못했습니다. 목록 페이지로 이동합니다.');
          navigate('/story');
          return;
        }

        setGeneratedStoryId(data.storyId);

        // 썸네일 생성 시작
        setIsGeneratingThumbnail(true);
        // console.log('🖼️ 썸네일 생성 시작... storyId:', data.storyId);

        try {
          const thumbnailResult = await generateThumbnail(data.storyId);
          // console.log('✅ 썸네일 생성 성공:', thumbnailResult);

          // 썸네일 URL 설정
          if (thumbnailResult?.data?.thumbnailUrl) {
            setGeneratedImage(thumbnailResult.data.thumbnailUrl);
          } else if (thumbnailResult?.thumbnailUrl) {
            setGeneratedImage(thumbnailResult.thumbnailUrl);
          }
        } catch (thumbnailError) {
          // console.error('❌ 썸네일 생성 실패:', thumbnailError);
          // 썸네일 실패해도 Step 5로 이동
        } finally {
          setIsGeneratingThumbnail(false);
          // Step 5로 이동
          setStep(5);
        }
      },
      onError: (error: any) => {
        // console.error('❌ 동화 생성 실패:', error);
        // console.error('Response:', error.response?.data);
        // console.error('Status:', error.response?.status);
        alert('동화를 생성하는 중 문제가 발생했습니다.');
      },
    });
  };

  // 테마/분위기 라벨 가져오기
  const getThemeLabel = (id: string) => {
    const theme = THEME_OPTIONS.find((t) => t.id === id);
    return theme?.label || '';
  };

  const getMoodLabel = (id: string) => {
    const mood = MOOD_OPTIONS.find((m) => m.id === id);
    return mood?.label || '';
  };

  return (
    <div className='w-full min-h-screen flex flex-col'>
      {/* 상단 고정 영역 */}
      <div className='fixed top-0 left-0 right-0 z-40'>
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
            <div className='w-full h-[8px] bg-fg-disabled rounded-full overflow-hidden'>
              <div
                className='h-full bg-bg-purple-300 rounded-full transition-all duration-300'
                style={{ width: `${currentStep.progress}%` }}
              />
            </div>
          </div>

          {/* 단계 설명 */}
          <div className='px-4 pb-4'>
            <p className='nbp-16-b text-left'>{`${step}단계: ${currentStep.text}`}</p>
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className='flex-1 w-full pt-[140px] px-4 pb-20 overflow-y-auto'>
        {/* 1단계: 테마 선택 */}
        {step === 1 && (
          <div className='grid grid-cols-2 gap-4'>
            {THEME_OPTIONS.map((t) => (
              <div
                key={t.id}
                onClick={() => {
                  setSelectedTheme(t.id);
                  setStep(2);
                }}
              >
                <ImageCard title={t.label} className='w-full' />
              </div>
            ))}
          </div>
        )}

        {/* 2단계: 분위기 선택 */}
        {step === 2 && (
          <div className='grid grid-cols-2 gap-4'>
            {MOOD_OPTIONS.map((m) => (
              <div
                key={m.id}
                onClick={() => {
                  setSelectedMood(m.id);
                  setStep(3);
                }}
              >
                <ImageCard title={m.label} className='w-full' />
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
              className='w-full h-[300px] p-4 border-2 border-border-purple rounded-[16px] ng-16-r placeholder:text-fg-gray focus:outline-none resize-none'
            />
            {storyPrompt && (
              <Button variant='primary' fullWidth onClick={() => setStep(4)}>
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
              className='w-full h-[300px] p-4 border-2 border-border-purple rounded-[16px] ng-16-r placeholder:text-fg-gray focus:outline-none resize-none'
            />
            {storyTitle && (
              <Button variant='primary' fullWidth onClick={handleCreate}>
                동화 생성
              </Button>
            )}
          </div>
        )}

        {/* 5단계: 생성 완료 */}
        {step === 5 && (
          <div className='flex flex-col items-center space-y-6'>
            {/* 생성된 이미지 */}
            <Image
              src={generatedImage}
              alt={storyTitle}
              className='w-full aspect-square rounded-[16px]'
            />

            {/* 동화 제목 */}
            <h2 className='nsr-20-eb text-center'>{storyTitle}</h2>

            {/* 테마 & 분위기 태그 */}
            <div className='flex gap-2'>
              <span className='ng-16-r text-fg-primary'>#{getThemeLabel(selectedTheme || '')}</span>
              <span className='ng-16-r text-fg-primary'>#{getMoodLabel(selectedMood || '')}</span>
            </div>

            {/* 동화 목록으로 이동 버튼 */}
            <Button variant='primary' fullWidth onClick={() => navigate('/story')}>
              동화 목록으로 이동
            </Button>
          </div>
        )}
      </div>

      {/* 로딩 모달 */}
      <LoadingModal
        isOpen={isLoading}
        title={isGeneratingThumbnail ? '썸네일을 생성중입니다' : '동화를 생성중입니다'}
        subtitle='잠시만 기다려주세요'
        bottomText={
          isGeneratingThumbnail ? '멋진 이미지를 만들고 있어요' : '특별한 이야기를 만들고 있어요'
        }
      />
    </div>
  );
};

export default StoryCreatePage;
