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
  const [totalTime, setTotalTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);

  /* ---------------------------------------
   * Queries & Mutations
   * ------------------------------------- */
  const { data: playbackInfo, isLoading: isInfoLoading } = useAudioBookPlaybackInfo(audiobookId);

  const startPlaybackMutation = useStartAudioBookPlayback();
  const updatePlaybackMutation = useUpdateAudioPlayback();
  const finishPlaybackMutation = useFinishAudioPlayback();

  /* ---------------------------------------
   * Initialize UI from Playback Info
   * ------------------------------------- */
  useEffect(() => {
    if (playbackInfo && !isAudioLoaded) {
      console.log('📊 Initializing from playbackInfo:', playbackInfo);

      // API에서 받은 진행 정보로 초기화
      const initialPosition = playbackInfo.lastPosition ?? 0;
      const audioDuration = playbackInfo.duration ?? 0;

      setCurrentTime(initialPosition);
      setTotalTime(audioDuration);

      console.log('📊 Initial position:', initialPosition);
      console.log('📊 Total duration:', audioDuration);
      console.log('📊 Progress rate:', playbackInfo.progressRate);
    }
  }, [playbackInfo, isAudioLoaded]);

  /* ---------------------------------------
   * timeupdate → currentTime Sync
   * ------------------------------------- */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const newTime = Math.floor(audio.currentTime);
      setCurrentTime(newTime);

      // 진행률 계산 (디버깅용)
      if (totalTime > 0) {
        const progressRate = (newTime / totalTime) * 100;
        console.log(`⏱️ Progress: ${newTime}s / ${totalTime}s (${progressRate.toFixed(1)}%)`);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, [totalTime]);

  /* ---------------------------------------
   * Periodical Progress Update (PATCH)
   * ------------------------------------- */
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const audio = audioRef.current;
      if (!audio || totalTime === 0) return;

      const currentPos = Math.floor(audio.currentTime);
      const progressRate = (currentPos / totalTime) * 100;

      console.log(
        '⏱️ Updating playback - position:',
        currentPos,
        'progress:',
        progressRate.toFixed(1) + '%',
      );

      updatePlaybackMutation.mutate({
        audiobookId,
        currentTime: currentPos,
        status: 'PLAYING',
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, audiobookId, totalTime, updatePlaybackMutation]);

  /* ---------------------------------------
   * Handlers
   * ------------------------------------- */
  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const duration = Math.floor(audio.duration);
    setTotalTime(duration);
    console.log('✅ Audio metadata loaded, duration:', duration);
  };

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // Pause
      audio.pause();
      setIsPlaying(false);

      updatePlaybackMutation.mutate({
        audiobookId,
        currentTime: Math.floor(audio.currentTime),
        status: 'PAUSED',
      });
    } else {
      // Play
      if (isAudioLoaded) {
        // Already loaded, just resume
        audio
          .play()
          .then(() => {
            console.log('✅ Audio resumed');
            setIsPlaying(true);
          })
          .catch((e) => {
            console.error('❌ Audio play failed:', e);
          });

        updatePlaybackMutation.mutate({
          audiobookId,
          currentTime: Math.floor(audio.currentTime),
          status: 'PLAYING',
        });
      } else {
        // First play -> Call Start API
        console.log('🎬 Starting playback for audiobookId:', audiobookId);
        startPlaybackMutation.mutate(audiobookId, {
          onSuccess: (data) => {
            console.log('✅ Start API response:', data);

            if (!data.audioUrl) {
              alert('오디오 URL을 불러올 수 없습니다.');
              return;
            }

            audio.src = data.audioUrl;
            console.log('✅ Audio src set to:', data.audioUrl);

            const startPosition = data.lastPosition ?? currentTime;
            audio.currentTime = startPosition;
            console.log('✅ Starting from position:', startPosition);

            setIsAudioLoaded(true);

            audio
              .play()
              .then(() => {
                console.log('✅ Audio playing successfully');
                setIsPlaying(true);
              })
              .catch((e) => {
                console.error('❌ Audio play failed:', e);
                setIsPlaying(false);
              });

            setCurrentTime(startPosition);
          },
          onError: (error: any) => {
            console.error('❌ 오디오북 재생 시작 실패', error);
            alert('오디오북 재생을 시작할 수 없습니다.');
          },
        });
      }
    }
  };

  const handleSeek = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    console.log('🔍 Seeking to:', time);
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
   * Completion Handler
   * ------------------------------------- */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      console.log('🏁 Audio playback ended');
      setIsPlaying(false);
      finishPlaybackMutation.mutate({ audiobookId });
      navigate('/audiobook', { replace: true });
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [audiobookId, navigate, finishPlaybackMutation]);

  /* ---------------------------------------
   * Render
   * ------------------------------------- */
  if (isInfoLoading) {
    return <div className='text-center mt-20'>오디오북을 불러오는 중입니다...</div>;
  }

  if (!playbackInfo) {
    return <div className='text-center mt-20'>재생 정보를 불러오지 못했습니다.</div>;
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
          src={playbackInfo.thumbnailUrl}
          alt={playbackInfo.storyTitle}
          className='w-[315px] h-full object-cover'
        />
      </div>

      <div className='px-4'>
        <div className='w-full max-w-[318px] mx-auto'>
          <h1 className='nsr-34-eb text-fg-cream mt-[8px]'>{playbackInfo.storyTitle}</h1>

          <p className='roboto-14-m text-fg-white mt-[11px]'>
            {playbackInfo.theme} · {playbackInfo.vibe}
          </p>

          <div className='mt-[22px] flex items-center gap-2'>
            <div className='w-[52px] h-5 rounded-[10px] bg-bg-yellow flex items-center justify-center'>
              <span className='ng-10-n text-fg-primary'>{playbackInfo.characterName}</span>
            </div>

            {totalTime > 0 && (
              <div className='w-[63px] h-5 rounded-[10px] bg-bg-peach flex items-center justify-center'>
                <span className='ng-10-n text-fg-primary'>{formatTime(totalTime)}</span>
              </div>
            )}
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
