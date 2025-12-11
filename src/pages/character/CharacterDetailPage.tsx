import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Image from '@/components/ui/Image/Image';
import BackButton from '@/components/ui/BackButton/BackButton';
import LikeButton from '@/components/ui/LikeButton/LikeButton';
import VoicePreviewItem from '@/features/character/VoicePreviewItem';
import ErrorToast from '@/components/ui/ErrorToast/ErrorToast';
import { useToast } from '@/hooks/useToast';
import heartIcon from '@/assets/icons/heart.svg';
import dividerIcon from '@/assets/icons/divider.svg';
import { useCharacterDetail } from '@/hooks/queries/useCharacters';

const CharacterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isVisible, message, showToast, hideToast } = useToast();

  // id가 없는 경우를 대비 (URL 문제 등)
  const numericId = id ? Number(id) : null;

  // API 요청
  const { data, isLoading, isError } = useCharacterDetail(numericId ?? 0);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  // 페이지 배경색 설정
  useEffect(() => {
    document.body.classList.add('bg-bg-purple-900');
    return () => {
      document.body.classList.remove('bg-bg-purple-900');
    };
  }, []);

  // 1) 데이터 기반으로 좋아요 초기값 설정
  useEffect(() => {
    if (data?.likeCount !== undefined) {
      setLikeCount(data.likeCount);
    }
  }, [data?.likeCount]);

  // 2) 에러 발생 시 토스트 + 이동 처리
  useEffect(() => {
    if (isError || (!isLoading && !data)) {
      showToast('캐릭터를 찾을 수 없습니다.');
      const timer = setTimeout(() => navigate('/character'), 1000);
      return () => clearTimeout(timer);
    }
  }, [isError, isLoading, data, showToast, navigate]);

  // 3) 화면 렌더링
  if (isLoading) {
    return <div className='text-center text-white mt-20'>불러오는 중...</div>;
  }

  if (isError || !data) return null;

  // API 데이터 구조
  const character = data;

  const handleLikeChange = (liked: boolean) => {
    setIsLiked(liked);
    setLikeCount((prev) => (liked ? prev + 1 : Math.max(0, prev - 1)));
  };

  const handlePlayChange = (index: number) => (playing: boolean) => {
    setPlayingIndex(playing ? index : null);
    // 음성 파일 재생 로직 추가할 예정
  };

  // 음성 미리듣기 데이터 (추후 API로 대체)
  const voicePreviews = [
    { title: 'Focus Attention', duration: '10 MIN' },
    { title: 'Body Scan', duration: '5 MIN' },
    { title: 'Making Happiness', duration: '3 MIN' },
  ];

  return (
    <div className='w-full min-h-screen bg-bg-purple-900 flex flex-col items-center relative overflow-auto'>
      <div className='relative w-full max-w-[480px] pb-12'>
        <div className='relative'>
          <Image src={character.thumbnailUrl} alt={character.name} className='w-full h-auto' />

          {/* 뒤로가기 버튼 */}
          <div className='absolute top-[18px] left-[20px]'>
            <BackButton onClick={() => navigate('/character')} />
          </div>

          {/* 좋아요 버튼 */}
          <div className='absolute top-[18px] right-[20px]'>
            <LikeButton isLiked={isLiked} onClick={handleLikeChange} />
          </div>
        </div>

        {/* 캐릭터 정보 섹션 */}
        <div className='px-12 mt-8'>
          {/* 캐릭터 제목 */}
          <h1 className='nsr-34-eb text-fg-cream mb-4'>{character.name}</h1>

          {/* 캐릭터 태그 */}
          <p className='nbp-16-b text-fg-disabled mb-5'>{character.tags.join(' ')}</p>

          {/* 캐릭터 설명 */}
          <p className='nbp-16-b text-fg-cream mb-6'>{character.description}</p>

          {/* 좋아요 카운트 */}
          <div className='flex items-center gap-[9.94px] mb-10'>
            <img src={heartIcon} alt='좋아요' className='w-[18.26px] h-[16.14px]' />
            <span className='pre-14-m text-fg-disabled'>{likeCount}</span>
          </div>

          {/* 음성 미리 듣기 */}
          <h2 className='nsr-20-eb text-fg-cream mb-[30px]'>음성 미리 듣기</h2>

          {/* 음성 재생 컴포넌트 */}
          <div className='flex flex-col'>
            {voicePreviews.map((voice, index) => (
              <React.Fragment key={index}>
                <VoicePreviewItem
                  title={voice.title}
                  duration={voice.duration}
                  isPlaying={playingIndex === index}
                  onPlayChange={handlePlayChange(index)}
                />

                {/* Divider */}
                {index < voicePreviews.length - 1 && (
                  <img src={dividerIcon} alt='구분선' className='w-full h-[3px] my-5' />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* 에러 토스트 */}
      <ErrorToast isVisible={isVisible} message={message} onClose={hideToast} />
    </div>
  );
};

export default CharacterDetailPage;
