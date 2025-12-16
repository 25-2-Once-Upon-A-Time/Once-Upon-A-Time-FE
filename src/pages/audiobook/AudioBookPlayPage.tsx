import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '@/components/ui/BackButton/BackButton';
import Image from '@/components/ui/Image/Image';
import AudioProgressBar from '@/features/audiobook/AudioProgressBar';
import AudioControls from '@/features/audiobook/AudioControls';
import {
  useStartAudioBookPlayback,
  useUpdateAudioPlayback,
  useFinishAudioPlayback,
} from '@/hooks/queries/useAudioBook';
import { formatTime } from '@/utils/time';

/* ---------------------------------------
 * 타입 (start 응답 기준)
 * ------------------------------------- */
interface PlaybackViewData {
  thumbnailUrl: string;
  storyTitle: string;
  theme: string;
  vibe: string;
  characterName: string;
  duration: number;
}

const AudioBookPlayPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const audiobookId = Number(id);
  const navigate = useNavigate();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);

  const [viewData, setViewData] = useState<PlaybackViewData | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  /* ---------------------------------------
   * Mutations
   * ------------------------------------- */
  const startPlaybackMutation = useStartAudioBookPlayback();
  const updatePlaybackMutation = useUpdateAudioPlayback();
  const finishPlaybackMutation = useFinishAudioPlayback();

  /* ---------------------------------------
   * 최초 진입 → 재생 시작
   * ------------------------------------- */
  useEffect(() => {
    if (!audiobookId || startedRef.current) return;
    startedRef.current = true;

    startPlaybackMutation.mutate(audiobookId, {
      onSuccess: (data) => {
        const audio = audioRef.current;
        if (!audio) return;

        // 🔑 UI 데이터 세팅 (GET 없이 start 응답 사용)
        setViewData({
          thumbnailUrl: data.thumbnailUrl,
          storyTitle: data.storyTitle,
          theme: data.theme,
          vibe: data.vibe,
          characterName: data.characterName,
          duration: data.duration,
        });

        audio.src = data.audioUrl;
        audio.currentTime = data.lastPosition ?? 0;
        audio.play();

        setCurrentTime(data.lastPosition ?? 0);
        setIsPlaying(true);
      },
      onError: (error) => {
        console.error('오디오북 재생 시작 실패', error);
      },
    });
  }, [audiobookId]);

  /* ---------------------------------------
   * timeupdate → currentTime 동기화
   * ------------------------------------- */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(Math.floor(audio.currentTime));
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  /* ---------------------------------------
   * 5초마다 진행도 PATCH
   * ------------------------------------- */
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

  /* ---------------------------------------
   * Handlers
   * ------------------------------------- */
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

  /* ---------------------------------------
   * 재생 완료 처리
   * ------------------------------------- */
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

  /* ---------------------------------------
   * Render
   * ------------------------------------- */
  if (!viewData) {
    return <div className='text-center mt-20'>오디오북을 준비 중입니다...</div>;
  }

  return (
    <div className='max-w-[430px] min-w-[360px] min-h-screen flex flex-col mx-auto bg-bg-purple-900 relative'>
      {/* 뒤로가기 */}
      <div className='absolute top-[18px] left-[20px]'>
        <BackButton onClick={() => navigate('/audiobook')} />
      </div>

      {/* 이미지 */}
      <div className='flex h-[400px] p-10 justify-center items-center mt-[50px]'>
        <Image
          src={viewData.thumbnailUrl}
          alt={viewData.storyTitle}
          className='w-[315px] h-full object-cover'
        />
      </div>

      <div className='px-4'>
        <div className='w-full max-w-[318px] mx-auto'>
          <h1 className='nsr-34-eb text-fg-cream mt-[8px]'>{viewData.storyTitle}</h1>

          <p className='roboto-14-m text-fg-white mt-[11px]'>
            {viewData.theme} · {viewData.vibe}
          </p>

          <div className='mt-[22px] flex items-center gap-2'>
            <div className='w-[52px] h-5 rounded-[10px] bg-bg-yellow flex items-center justify-center'>
              <span className='ng-10-n text-fg-primary'>{viewData.characterName}</span>
            </div>

            <div className='w-[63px] h-5 rounded-[10px] bg-bg-peach flex items-center justify-center'>
              <span className='ng-10-n text-fg-primary'>{formatTime(viewData.duration)}</span>
            </div>
          </div>

          <div className='mt-[48px]'>
            <AudioProgressBar currentTime={currentTime} totalTime={totalTime} onSeek={handleSeek} />
          </div>
        </div>

        <div className='mt-[41px] flex justify-center'>
          <AudioControls
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onSkipBackward={handleSkipBackward}
            onSkipForward={handleSkipForward}
          />
        </div>
      </div>

      {/* 실제 오디오 */}
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
