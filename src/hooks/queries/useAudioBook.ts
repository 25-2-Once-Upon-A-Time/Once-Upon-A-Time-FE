import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchAudioBookList,
  fetchAudioBookPlaybackInfo,
  startAudioBookPlayback,
  updateAudioPlayback,
  finishAudioPlayback,
  createAudioBook,
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

export const useCreateAudioBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { storyId: number; characterId: number; theme: string; vibe: string }) =>
      createAudioBook(payload),

    onSuccess: () => {
      // ✅ 생성 후 오디오북 리스트 갱신
      queryClient.invalidateQueries({ queryKey: ['audiobooks'] });
    },
  });
};
