import api from '@/api/api';
import type {
  AudioBookSummaryResponse,
  AudioBookPlaybackInfoResponse,
  AudioBookPlaybackStartResponse,
  AudioBookCreateResponse,
} from '@/types/audiobook';
import type { ApiResponse, ApiListResponse } from '@/types/common';
import type { AudioPlaybackStatus } from '@/types/audiobook';

interface UpdateAudioPlaybackPayload {
  currentTime: number;
  status: AudioPlaybackStatus;
}

interface FinishAudioPlaybackPayload {
  finalPosition?: number;
  status?: 'PLAYING' | 'PAUSED' | 'COMPLETED';
}

interface CreateAudioBookPayload {
  storyId: number;
  characterId: number;
  theme: string;
  vibe: string;
}

// 오디오북 리스트 조회
export const fetchAudioBookList = async (): Promise<AudioBookSummaryResponse[]> => {
  const { data } = await api.get<ApiListResponse<AudioBookSummaryResponse>>('/api/v1/audiobooks');
  return data.data.items;
};

// 오디오북 재생 정보 조회
export const fetchAudioBookPlaybackInfo = async (
  audiobookId: number,
): Promise<AudioBookPlaybackInfoResponse> => {
  const { data } = await api.get<ApiResponse<AudioBookPlaybackInfoResponse>>(
    `/api/v1/audiobooks/${audiobookId}/playback`,
  );
  return data.data;
};

// 오디오북 재생 시작 - ✅ 수정: data.data 반환으로 통일
export const startAudioBookPlayback = async (
  audiobookId: number,
): Promise<AudioBookPlaybackStartResponse> => {
  console.log('🔵 Calling start API with audiobookId:', audiobookId);
  console.log('🔵 API URL:', `/api/v1/audiobooks/${audiobookId}/playback/start`);

  try {
    const { data } = await api.post<ApiResponse<AudioBookPlaybackStartResponse>>(
      `/api/v1/audiobooks/${audiobookId}/playback/start`,
      {}, // 명시적으로 빈 객체 전송
    );

    console.log('🎵 Start Playback API Response (full):', data);
    console.log('🎵 Response success:', data.success);
    console.log('🎵 Response error:', data.error);
    console.log('🎵 Extracted data.data:', data.data);
    console.log('🎵 audioUrl:', data.data?.audioUrl);
    console.log('🎵 lastPosition:', data.data?.lastPosition);
    console.log('🎵 playbackId:', data.data?.playbackId);

    return data.data; // ✅ data.data 반환
  } catch (error: any) {
    console.error('❌ Start Playback API Error:', error);
    console.error('❌ Error response:', error.response?.data);
    console.error('❌ Error status:', error.response?.status);
    console.error('❌ Error config:', error.config);
    throw error;
  }
};

// 오디오북 재생 진행도 업데이트
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

// 오디오북 재생 완료
export const finishAudioPlayback = async (
  audiobookId: number,
  payload?: FinishAudioPlaybackPayload,
): Promise<void> => {
  const { data } = await api.post<ApiResponse<null>>(
    `/api/v1/audiobooks/${audiobookId}/playback/finish`,
    payload ?? {},
  );

  if (!data.success) {
    throw new Error('오디오북 재생 완료 처리 실패');
  }
};

// 오디오북 생성
export const createAudioBook = async (
  payload: CreateAudioBookPayload,
): Promise<AudioBookCreateResponse> => {
  console.log('📝 Creating audiobook with payload:', payload);

  const { data } = await api.post<ApiResponse<AudioBookCreateResponse>>(
    '/api/v1/audiobook/make',
    payload,
  );

  console.log('📝 Create audiobook API response (full):', data);
  console.log('📝 Response success:', data.success);
  console.log('📝 Response data:', data.data);

  if (!data.success) {
    throw new Error('오디오북 생성 실패');
  }

  // ID 매핑 (backend가 id로 줄 경우 대비)
  const responseData = data.data as any;
  const extractedId = responseData.audiobookId || responseData.id;

  console.log('📝 Extracted audiobookId:', extractedId);

  return {
    ...data.data,
    audiobookId: extractedId,
  };
};
