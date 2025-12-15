import api from '@/api/api';
import type {
  AudioBookSummaryResponse,
  AudioBookPlaybackInfoResponse,
  AudioBookPlaybackStartResponse,
} from '@/types/audiobook';
import type { ApiResponse, ApiListResponse } from '@/types/common';
import {
  audioBookListMock,
  audioBookPlaybackInfoMock,
  audioBookPlaybackStartMock,
} from '@/mocks/audiobook';

const isMock = import.meta.env.VITE_API_MODE === 'MOCK';

// 재생 진행도 업데이트 (Pause / Resume / Seek)
interface UpdateAudioPlaybackPayload {
  currentTime: number;
  status: 'PAYING' | 'PAUSED' | 'COMPLETED';
}

// 재생 완료
interface FinishAudioPlaybackPayload {
  finalPosition?: number;
  status?: 'PLAYING' | 'PAUSED' | 'COMPLETED';
}

// 오디오북 리스트 조회
export const fetchAudioBookList = async (): Promise<AudioBookSummaryResponse[]> => {
  if (isMock) {
    return Promise.resolve(audioBookListMock);
  }

  const { data } = await api.get<ApiListResponse<AudioBookSummaryResponse>>('/api/v1/audiobooks');

  return data.data.items;
};

// 오디오북 재생 정보 조회
export const fetchAudioBookPlaybackInfo = async (
  audiobookId: number,
): Promise<AudioBookPlaybackInfoResponse> => {
  if (isMock) {
    return Promise.resolve(audioBookPlaybackInfoMock(audiobookId));
  }

  const { data } = await api.get<ApiResponse<AudioBookPlaybackInfoResponse>>(
    `/api/v1/audiobooks/${audiobookId}/playback`,
  );

  return data.data;
};

// 오디오북 재생 시작
export const startAudioBookPlayback = async (
  audiobookId: number,
): Promise<AudioBookPlaybackStartResponse> => {
  if (isMock) {
    return Promise.resolve(audioBookPlaybackStartMock(audiobookId));
  }

  const { data } = await api.post<ApiResponse<AudioBookPlaybackStartResponse>>(
    `/api/v1/audiobooks/${audiobookId}/playback/start`,
  );

  return data.data;
};

// 오디오북 재생 진행도 업데이트 (REAL only)
export const updateAudioPlayback = async (
  audiobookId: number,
  payload: UpdateAudioPlaybackPayload,
): Promise<void> => {
  const { data } = await api.patch<ApiResponse<null>>(
    `/api/v1/audiobooks/${audiobookId}/playback`,
    payload,
  );

  if (!data.success) {
    throw new Error('오디오북 진행도 업데이트 실패');
  }
};

// 오디오북 재생 완료 (REAL only)
export const finishAudioPlayback = async (
  audiobookId: number,
  payload?: FinishAudioPlaybackPayload,
): Promise<void> => {
  const { data } = await api.post<ApiResponse<null>>(
    `/api/v1/audiobooks/${audiobookId}/finish`,
    payload ?? {},
  );

  if (!data.success) {
    throw new Error('오디오북 재생 완료 처리 실패');
  }
};
