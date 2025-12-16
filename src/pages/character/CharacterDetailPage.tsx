import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Image from '@/components/ui/Image/Image';
import BackButton from '@/components/ui/BackButton/BackButton';
import LikeButton from '@/components/ui/LikeButton/LikeButton';
import VoicePreviewItem from '@/features/character/VoicePreviewItem';
import ErrorToast from '@/components/ui/ErrorToast/ErrorToast';
import { useToast } from '@/hooks/useToast';
import dividerIcon from '@/assets/icons/divider.svg';
import { useCharacterDetail } from '@/hooks/queries/useCharacters';

const MAIN_AUDIO_INDEX = -1;

const CharacterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isVisible, message, showToast, hideToast } = useToast();

  //  const [isLiked, setIsLiked] = useState(false);
  //  const [likeCount, setLikeCount] = useState(0);

  // id 유효성 검사
  const numericId = Number(id);
  const isValidId = Number.isInteger(numericId) && numericId > 0;

  const { data, isLoading, isError } = useCharacterDetail(isValidId ? numericId : 0);

  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  console.log('id:', id);
  console.log('numericId:', numericId, 'isValidId:', isValidId);
  console.log('isLoading:', isLoading);
  console.log('isError:', isError);
  console.log('data:', data);

  // 페이지 배경색 설정
  useEffect(() => {
    document.body.classList.add('bg-bg-purple-900');
    return () => {
      document.body.classList.remove('bg-bg-purple-900');
    };
  }, []);

  // 에러 처리
  useEffect(() => {
    if (!isValidId || isError) {
      showToast('캐릭터를 찾을 수 없습니다.');
      const timer = setTimeout(() => navigate('/character'), 1000);
      return () => clearTimeout(timer);
    }
  }, [isValidId, isError, showToast, navigate]);

  if (isLoading) {
    return <div className='text-center text-white mt-20'>불러오는 중...</div>;
  }

  if (!data) {
    return (
      <div className='text-white p-4'>
        <pre>{JSON.stringify({ id, numericId, isValidId, isLoading, isError, data }, null, 2)}</pre>
      </div>
    );
  }

  const character = data;
  const hasExtraAudios = character.audios.length > 0;

  // const handleLikeChange = (liked: boolean) => {
  //   setIsLiked(liked);
  //   setLikeCount((prev) => (liked ? prev + 1 : Math.max(0, prev - 1)));
  // };

  const handlePlayChange = (index: number) => (playing: boolean) => {
    setPlayingIndex(playing ? index : null);
  };

  return (
    <div className='w-full min-h-screen bg-bg-purple-900 flex flex-col items-center relative overflow-auto'>
      <div className='relative w-full max-w-[480px] pb-12'>
        <div className='relative'>
          <Image
            src={character.thumbnailUrl}
            alt={character.characterName}
            className='w-[412px] h-[350px] object-cover'
          />

          {/* 뒤로가기 버튼 */}
          <div className='absolute top-[18px] left-[20px]'>
            <BackButton onClick={() => navigate('/character')} />
          </div>

          {/* 좋아요 버튼 (UI 전용) */}
          <div className='absolute top-[18px] right-[20px]'>
            <LikeButton
              isLiked={false} // 항상 false
              onClick={() => {}} // 아무 동작 안 함
            />
          </div>
        </div>

        {/* 캐릭터 정보 섹션 */}
        <div className='px-12 mt-8'>
          {/* 캐릭터 제목 */}
          <h1 className='nsr-34-eb text-fg-cream mb-4'>{character.characterName}</h1>

          {/* 캐릭터 태그 */}
          <p className='nbp-16-b text-fg-disabled mb-5'>{character.tags.join(' ')}</p>

          {/* 캐릭터 설명 */}
          <p className='nbp-16-b text-fg-cream mb-6'>{character.description}</p>

          {/* 좋아요 카운트
                <div className='flex items-center gap-[9.94px] mb-10'>
                  <img src={heartIcon} alt='좋아요' className='w-[18.26px] h-[16.14px]' />
                  <span className='pre-14-m text-fg-disabled'>{likeCount}</span>
                </div> */}

          {/* 음성 미리 듣기 */}
          <h2 className='nsr-20-eb text-fg-cream mb-[30px]'>음성 미리 듣기</h2>

          {/* 음성 재생 컴포넌트 */}
          <div>
            <div>
              <VoicePreviewItem
                title='대표 음성'
                duration=''
                audioUrl={character.voiceSampleUrl}
                isPlaying={playingIndex === MAIN_AUDIO_INDEX}
                onPlayChange={(playing) => setPlayingIndex(playing ? MAIN_AUDIO_INDEX : null)}
              />
            </div>

            {hasExtraAudios && (
              <img src={dividerIcon} alt='구분선' className='w-full h-[3px] my-5' />
            )}

            {/* 추가 음성 목록 */}
            {character.audios.map((audio, index) => (
              <React.Fragment key={audio.audioUrl}>
                <VoicePreviewItem
                  title={audio.title}
                  duration={audio.duration}
                  audioUrl={audio.audioUrl}
                  isPlaying={playingIndex === index}
                  onPlayChange={handlePlayChange(index)}
                />

                {index < character.audios.length - 1 && (
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
