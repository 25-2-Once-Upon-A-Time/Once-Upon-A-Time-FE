import { api } from '../api';
import type { StorySummary, StoryDetail } from '@/types/story';
import { storyListMock, storyDetailMock } from '@/mocks/story';

const isMock = import.meta.env.VITE_API_MODE === 'MOCK';

// 동화 목록 조회
export const fetchStories = async (): Promise<StorySummary[]> => {
  if (isMock) {
    return Promise.resolve(storyListMock);
  }

  const { data } = await api.get<StorySummary[]>('/api/v1/stories');
  return data;
};

// 동화 상세 조회
export const fetchStoryDetail = async (storyId: number): Promise<StoryDetail> => {
  if (isMock) {
    return Promise.resolve(storyDetailMock(storyId));
  }

  const { data } = await api.get<StoryDetail>(`/api/v1/stories/${storyId}`);
  return data;
};
