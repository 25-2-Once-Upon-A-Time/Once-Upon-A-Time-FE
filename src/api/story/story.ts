import { api } from '../api';
import type { StorySummary, StoryDetail, CreateStoryRequest } from '@/types/story';

// 동화 목록 조회
export const fetchStories = async (): Promise<StorySummary[]> => {
  const { data } = await api.get<StorySummary[]>('/api/v1/stories');
  return data;
};

// 동화 상세 조회
export const fetchStoryDetail = async (storyId: number): Promise<StoryDetail> => {
  const { data } = await api.get<StoryDetail>(`/api/v1/stories/${storyId}`);
  return data;
};

// 동화 생성 요청
export const createStory = async (payload: CreateStoryRequest): Promise<StoryDetail> => {
  const { data } = await api.post<StoryDetail>('/api/v1/stories', payload);
  return data;
};
