import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '@/components/ui/BackButton/BackButton';
import Image from '@/components/ui/Image/Image';
import AudioProgressBar from '@/features/audiobook/AudioProgressBar';
import AudioControls from '@/features/audiobook/AudioControls';
import {
  useAudioBookPlaybackInfo,
  useStartAudioBookPlayback,
  useUpdateAudioPlayback,
  useFinishAudioPlayback,
} from '@/hooks/queries/useAudioBook';
import { formatTime } from '@/utils/time';

const AudioBookPlayPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const audiobookId = Number(id);
  const navigate = useNavigate();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [totalTime, setTotalTime] = useState(0);

  /* --------------------------------------------------
   * Queries / Mutations
   * -------------------------------------------------- */

  // 재생 정보 조회 (복구용)
  const { data: playbackInfo, isLoading, isError } = useAudioBookPlaybackInfo(audiobookId);

  // 재생 시작 (audioUrl 받기)
  const startPlaybackMutation = useStartAudioBookPlayback();

  // 진행도 PATCH
  const updatePlaybackMutation = useUpdateAudioPlayback();

  // 재생 완료
  const finishPlaybackMutation = useFinishAudioPlayback();

  /* --------------------------------------------------
   * Effects
   * -------------------------------------------------- */

  // 페이지 진입 시 재생 시작
  useEffect(() => {
    if (!audiobookId) return;

    startPlaybackMutation.mutate(audiobookId, {
      onSuccess: (data) => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.src = data.audioUrl;
        audio.currentTime = data.lastPosition;
        audio.play();

        setCurrentTime(data.lastPosition);
        setIsPlaying(true);
      },
    });
  }, [audiobookId]);

  // timeupdate → currentTime 동기화
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(Math.floor(audio.currentTime));
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  // 5초마다 진행도 PATCH
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const audio = audioRef.current;
      if (!audio) return;

      updatePlaybackMutation.mutate({
        audiobookId,
        currentTime: Math.floor(audio.currentTime),
        status: 'PLAYING',
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, audiobookId]);

  /* --------------------------------------------------
   * Handlers
   * -------------------------------------------------- */

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setTotalTime(Math.floor(audio.duration));
  };

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);

      updatePlaybackMutation.mutate({
        audiobookId,
        currentTime: Math.floor(audio.currentTime),
        status: 'PAUSED',
      });
    } else {
      audio.play();
      setIsPlaying(true);

      updatePlaybackMutation.mutate({
        audiobookId,
        currentTime: Math.floor(audio.currentTime),
        status: 'PLAYING',
      });
    }
  };

  const handleSeek = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = time;
    setCurrentTime(time);

    updatePlaybackMutation.mutate({
      audiobookId,
      currentTime: time,
      status: isPlaying ? 'PLAYING' : 'PAUSED',
    });
  };

  const handleSkipBackward = () => {
    handleSeek(Math.max(0, currentTime - 15));
  };

  const handleSkipForward = () => {
    handleSeek(Math.min(totalTime, currentTime + 15));
  };

  // 재생 완료
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
      finishPlaybackMutation.mutate({ audiobookId });
      navigate('/audiobook', { replace: true });
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [audiobookId]);

  /* --------------------------------------------------
   * Render
   * -------------------------------------------------- */

  if (isLoading || !playbackInfo) {
    return <div className='text-center mt-20'>불러오는 중...</div>;
  }

  if (isError) {
    return <div className='text-center mt-20'>재생 정보를 불러오지 못했습니다.</div>;
  }

  return (
    <div className='max-w-[430px] min-w-[360px] min-h-screen flex flex-col mx-auto bg-bg-purple-900 relative'>
      {/* 뒤로가기 버튼 */}
      <div className='absolute top-[18px] left-[20px]'>
        <BackButton onClick={() => navigate('/audiobook')} />
      </div>

      {/* 이미지 영역 */}
      <div className='flex h-[400px] p-10 flex-col justify-center items-center shrink-0 self-stretch mt-[50px]'>
        <Image
          src={playbackInfo.thumbnailUrl}
          alt={playbackInfo.storyTitle}
          className='w-[315px] h-full object-cover'
        />
      </div>

      <div className='px-4'>
        <div className='w-full max-w-[318px] mx-auto'>
          {/* 타이틀 */}
          <div className='mt-[8px]'>
            <h1 className='nsr-34-eb text-fg-cream'>{playbackInfo.storyTitle}</h1>
          </div>

          {/* 태그 */}
          <div className='mt-[11px]'>
            <p className='roboto-14-m text-fg-white'>
              {playbackInfo.theme} · {playbackInfo.vibe}
            </p>
          </div>

          <div className='mt-[22px] flex items-center gap-2'>
            {/* 캐릭터 뱃지 */}
            <div className='w-[52px] h-5 rounded-[10px] bg-bg-yellow flex items-center justify-center'>
              <span className='ng-10-n text-fg-primary'>{playbackInfo.characterName}</span>
            </div>

            {/* 시간 뱃지 */}
            <div className='w-[63px] h-5 rounded-[10px] bg-bg-peach flex items-center justify-center'>
              <span className='ng-10-n text-fg-primary'>{formatTime(playbackInfo.duration)}</span>
            </div>
          </div>

          {/* 재생 진행 바 */}
          <div className='mt-[48px]'>
            <AudioProgressBar currentTime={currentTime} totalTime={totalTime} onSeek={handleSeek} />
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

      {/* 실제 오디오 태그 */}
      <audio
        ref={audioRef}
        preload='auto'
        onLoadedMetadata={handleLoadedMetadata}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default AudioBookPlayPage;
