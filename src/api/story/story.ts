import { api } from '../api';
import type {
  StorySummary,
  StoryDetail,
  CreateStoryRequest,
  CreateStoryResponse,
} from '@/types/story';

// 동화 목록 조회
export const fetchStories = async (): Promise<StorySummary[]> => {
  const response = await api.get<{ success: boolean; data: StorySummary[] }>('/api/v1/stories');
  return response.data.data;
};

// 동화 상세 조회
export const fetchStoryDetail = async (storyId: number): Promise<StoryDetail> => {
  const response = await api.get<{ success: boolean; data: StoryDetail }>(
    `/api/v1/stories/${storyId}`,
  );
  return response.data.data;
};

// 동화 생성 요청
export const createStory = async (payload: CreateStoryRequest): Promise<CreateStoryResponse> => {
  const response = await api.post('/api/v1/stories', payload);
  return {
    storyId: (response.data as any).storyId,
  };
};

// 썸네일 생성 요청
export const generateThumbnail = async (storyId: number): Promise<any> => {
  const response = await api.post(`/api/v1/stories/${storyId}/thumbnail`);
  return response.data;
};
