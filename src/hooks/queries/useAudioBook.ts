import { useMutation, useQuery } from '@tanstack/react-query';
import {
  fetchAudioBookList,
  fetchAudioBookPlaybackInfo,
  startAudioBookPlayback,
  updateAudioPlayback,
  finishAudioPlayback,
} from '@/api/audiobook/audiobook';

export const useAudioBooks = () => {
  return useQuery({
    queryKey: ['audiobooks'],
    queryFn: fetchAudioBookList,
  });
};

export const useAudioBookPlaybackInfo = (audiobookId: number) => {
  return useQuery({
    queryKey: ['audiobookPlayback', audiobookId],
    queryFn: () => fetchAudioBookPlaybackInfo(audiobookId),
    enabled: !!audiobookId, // id가 있을 때만 조회
  });
};

export const useStartAudioBookPlayback = () => {
  return useMutation({
    mutationFn: (audiobookId: number) => startAudioBookPlayback(audiobookId),
  });
};

export const useUpdateAudioPlayback = () => {
  return useMutation({
    mutationFn: ({
      audiobookId,
      currentTime,
      status,
    }: {
      audiobookId: number;
      currentTime: number;
      status: 'PLAYING' | 'PAUSED' | 'COMPLETED';
    }) =>
      updateAudioPlayback(audiobookId, {
        currentTime,
        status,
      }),
  });
};

export const useFinishAudioPlayback = () => {
  return useMutation({
    mutationFn: ({
      audiobookId,
      finalPosition,
      status,
    }: {
      audiobookId: number;
      finalPosition?: number;
      status?: 'PLAYING' | 'PAUSED' | 'COMPLETED';
    }) =>
      finishAudioPlayback(audiobookId, {
        finalPosition,
        status,
      }),
  });
};
