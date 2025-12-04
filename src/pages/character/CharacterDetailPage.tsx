import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Image from '@/components/ui/Image/Image';
import BackButton from '@/components/ui/BackButton/BackButton';
import LikeButton from '@/components/ui/LikeButton/LikeButton';
import VoicePreviewItem from '@/features/character/VoicePreviewItem';
import { characterImageMap, characters, characterDetails } from '@/constants/characters';
import heartIcon from '@/assets/icons/heart.svg';
import dividerIcon from '@/assets/icons/divider.svg';

const CharacterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const characterId = id ? parseInt(id) : null;
  const character = characters.find((c) => c.id === characterId);
  const characterDetail = characterId ? characterDetails[characterId] : null;
  const imageSrc = characterId ? characterImageMap[characterId] : undefined;

  // 페이지 진입 시 body 배경색 변경, 떠날 때 원래대로 복구
  useEffect(() => {
    const originalBgColor = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#1d1d2d';

    return () => {
      document.body.style.backgroundColor = originalBgColor;
    };
  }, []);

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
    <div className='w-full min-h-screen bg-bg-purple-900 flex flex-col relative'>
      {/* 이미지 영역 with 버튼들 - 화면 전체 너비 */}
      <div className='relative w-screen max-w-[480px]'>
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

        {/* 음성 미리 듣기 - 고정 텍스트 */}
        <p className='nsr-20-eb text-fg-cream absolute top-[530px] left-[48.08px] w-[120px] h-[22px]'>
          음성 미리 듣기
        </p>

        {/* 음성 재생 컴포넌트 */}
        {voicePreviews.map((voice, index) => {
          const baseTop = 579.84; // 첫 번째 음성 재생 컴포넌트 위치
          const itemHeight = 40; // 음성 재생 컴포넌트 높이
          const dividerHeight = 3; // divider 높이
          const gap = 20; // 간격

          // 각 항목의 top 위치
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

              {/* Divider (마지막 항목 제외) */}
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
    </div>
  );
};

export default CharacterDetailPage;
