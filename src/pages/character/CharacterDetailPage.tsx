import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Image from '@/components/ui/Image/Image';
import BackButton from '@/components/ui/BackButton/BackButton';
import LikeButton from '@/components/ui/LikeButton/LikeButton';
import VoicePreviewItem from '@/features/character/VoicePreviewItem';
import ErrorToast from '@/components/ui/ErrorToast/ErrorToast';
import { useToast } from '@/hooks/useToast';
import { characterImageMap, characters, characterDetails } from '@/constants/characters';
import heartIcon from '@/assets/icons/heart.svg';
import dividerIcon from '@/assets/icons/divider.svg';

const CharacterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isVisible, message, showToast, hideToast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const characterId = id ? parseInt(id) : null;
  const character = characters.find((c) => c.id === characterId);
  const characterDetail = characterId ? characterDetails[characterId] : null;
  const imageSrc = characterId ? characterImageMap[characterId] : undefined;

  // 페이지 배경색 설정
  useEffect(() => {
    document.body.style.backgroundColor = '#1d1d2d'; // bg-purple-900
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  // 존재하지 않는 캐릭터 ID인 경우 에러 토스트 표시 후 캐릭터 목록으로 리다이렉트
  useEffect(() => {
    if (id && !characterDetail) {
      showToast('캐릭터를 찾을 수 없습니다.');
      const timer = setTimeout(() => {
        navigate('/character', { replace: true });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [id, characterDetail, navigate, showToast]);

  // 캐릭터 데이터가 없을 경우 null 반환 (리다이렉트 진행 중)
  if (!characterDetail) {
    return null;
  }

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
    <div className='w-full min-h-screen flex flex-col items-center relative'>
      <div className='relative w-full max-w-[480px]'>
        <Image src={imageSrc} alt={character?.title || '캐릭터'} className='w-full h-auto' />

        {/* 뒤로가기 버튼 */}
        <div className='absolute top-[18px] left-[20px]'>
          <BackButton onClick={() => navigate('/character')} />
        </div>

        {/* 좋아요 버튼 */}
        <div className='absolute top-[18px] right-[20px]'>
          <LikeButton isLiked={isLiked} onClick={handleLikeChange} />
        </div>

        {/* 캐릭터 정보 */}
        {characterDetail && (
          <>
            {/* 캐릭터 제목 */}
            <h1 className='nsr-34-eb text-fg-cream absolute top-[308.41px] left-[48px]'>
              {characterDetail.title}
            </h1>

            {/* 캐릭터 태그 */}
            <p className='nbp-16-b text-fg-disabled absolute top-[362px] left-[48px]'>
              {characterDetail.tags.join(' ')}
            </p>

            {/* 캐릭터 설명 */}
            <p className='nbp-16-b text-fg-cream absolute top-[401.41px] left-[48px] right-[48px]'>
              {characterDetail.description}
            </p>

            {/* 좋아요 카운트 */}
            <div className='absolute top-[451px] left-[47px] flex items-center gap-[9.94px]'>
              <img src={heartIcon} alt='좋아요' className='w-[18.26px] h-[16.14px]' />
              <span className='pre-14-m text-fg-disabled'>{likeCount}</span>
            </div>
          </>
        )}

        {/* 음성 미리 듣기 */}
        <p className='nsr-20-eb text-fg-cream absolute top-[530px] left-[48.08px] w-[120px] h-[22px]'>
          음성 미리 듣기
        </p>

        {/* 음성 재생 컴포넌트 */}
        {voicePreviews.map((voice, index) => {
          const baseTop = 579.84;
          const itemHeight = 40;
          const dividerHeight = 3;
          const gap = 20;

          const voiceTop = baseTop + (itemHeight + gap + dividerHeight + gap) * index;
          const dividerTop = voiceTop + itemHeight + gap;

          return (
            <React.Fragment key={index}>
              {/* 음성 재생 컴포넌트 */}
              <VoicePreviewItem
                title={voice.title}
                duration={voice.duration}
                isPlaying={playingIndex === index}
                onPlayChange={handlePlayChange(index)}
                className='absolute left-[48.08px]'
                style={{ top: `${voiceTop}px` }}
              />

              {/* Divider */}
              {index < voicePreviews.length - 1 && (
                <img
                  src={dividerIcon}
                  alt='구분선'
                  className='absolute left-[48px]'
                  style={{ top: `${dividerTop}px` }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* 에러 토스트 */}
      <ErrorToast isVisible={isVisible} message={message} onClose={hideToast} />
    </div>
  );
};

export default CharacterDetailPage;
