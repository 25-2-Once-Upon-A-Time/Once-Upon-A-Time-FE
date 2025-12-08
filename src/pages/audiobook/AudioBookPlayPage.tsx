import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import BackButton from '@/components/ui/BackButton/BackButton';
import Image from '@/components/ui/Image/Image';
import AudioProgressBar from '@/features/audiobook/AudioProgressBar';
import AudioControls from '@/features/audiobook/AudioControls';
import { audiobooks } from '@/constants/audiobooks';

const AudioBookPlayPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // 오디오북 데이터 가져오기
  const location = useLocation();
  const fallback = (location.state as any)?.audiobook as any | undefined;

  // 1. 로컬스토리지(localAudiobooks)에서 찾아보고, 없으면 정적 `audiobooks`,
  // 2. navigate state로 전달된 fallback을 사용
  let audiobook: any | undefined;
  try {
    const stored = JSON.parse(localStorage.getItem('localAudiobooks') || '[]');
    const foundInStored = Array.isArray(stored)
      ? stored.find((ab: any) => Number(ab.id) === Number(id))
      : undefined;

    audiobook =
      foundInStored ||
      audiobooks.find((ab) => ab.id === Number(id)) ||
      (fallback && Number(fallback.id) === Number(id) ? fallback : undefined);
  } catch (e) {
    audiobook =
      audiobooks.find((ab) => ab.id === Number(id)) ||
      (fallback && Number(fallback.id) === Number(id) ? fallback : undefined);
  }

  // 전체 시간
  const totalTime = audiobook
    ? parseInt(audiobook.time.split(':')[0]) * 3600 +
      parseInt(audiobook.time.split(':')[1]) * 60 +
      parseInt(audiobook.time.split(':')[2])
    : 0;

  useEffect(() => {
    document.body.classList.add('bg-bg-purple-900');
    return () => {
      document.body.classList.remove('bg-bg-purple-900');
    };
  }, []);

  // 재생 타이머
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalTime) {
            setIsPlaying(false);
            return totalTime;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, totalTime]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSkipBackward = () => {
    setCurrentTime((prev) => Math.max(0, prev - 15));
  };

  const handleSkipForward = () => {
    setCurrentTime((prev) => Math.min(totalTime, prev + 15));
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
  };

  return (
    <div className='max-w-[430px] min-w-[360px] min-h-screen flex flex-col mx-auto bg-bg-purple-900 relative'>
      {/* 뒤로가기 버튼 */}
      <div className='absolute top-[18px] left-[20px]'>
        <BackButton onClick={() => navigate('/audiobook')} />
      </div>

      {/* 이미지 영역 */}
      <div className='flex h-[370px] p-10 flex-col justify-center items-center gap-[10px] shrink-0 self-stretch mt-[93px]'>
        <Image
          src={audiobook?.imageSrc || ''}
          alt={audiobook?.title || '오디오북 이미지'}
          className='w-[315px] h-full object-cover'
        />
      </div>

      {audiobook && (
        <div className='px-4'>
          <div className='w-full max-w-[318px] mx-auto'>
            {/* 타이틀 */}
            <div className='mt-[18px]'>
              <h1 className='nsr-34-eb text-fg-cream'>{audiobook.title}</h1>
            </div>

            {/* 태그 */}
            <div className='mt-[11px]'>
              <p className='roboto-14-m text-fg-white'>{audiobook.tags.join(' ')}</p>
            </div>

            <div className='mt-[22px] flex items-center gap-2'>
              {/* 캐릭터 뱃지 */}
              <div className='w-[52px] h-5 rounded-[10px] bg-bg-yellow flex items-center justify-center'>
                <span className='ng-10-n text-fg-primary'>{audiobook.character}</span>
              </div>

              {/* 시간 뱃지 */}
              <div className='w-[63px] h-5 rounded-[10px] bg-bg-peach flex items-center justify-center'>
                <span className='ng-10-n text-fg-primary'>{audiobook.time}</span>
              </div>
            </div>

            {/* 재생 진행 바 */}
            <div className='mt-[48px]'>
              <AudioProgressBar
                currentTime={currentTime}
                totalTime={totalTime}
                onSeek={handleSeek}
              />
            </div>
          </div>

          {/* 오디오 컨트롤 */}
          <div className='mt-[41px] flex justify-center'>
            <AudioControls
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              onSkipBackward={handleSkipBackward}
              onSkipForward={handleSkipForward}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioBookPlayPage;
