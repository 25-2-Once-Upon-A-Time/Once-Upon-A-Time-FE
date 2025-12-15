import type { StorySummary, StoryDetail } from '@/types/story';

export const storyListMock: StorySummary[] = [
  {
    id: 300,
    title: '동대문에 간 공주',
    thumbnailUrl: 'https://example.com/story-thumb.jpg',
  },
];

export const storyDetailMock = (id: number): StoryDetail => ({
  id,
  title: '동대문에 간 공주',
  thumbnailUrl: 'https://example.com/story-thumb.jpg',
  tags: ['모험', '시장'],
  description: '동대문 시장에서의 따뜻한 하루 이야기',
  theme: '모험',
  vibe: '따뜻하고 서정적',
  content: `어느 평범한 동네길을 가던 바로 지구 서울에 동대문시장이라는 오래된 시장이 있었어요.

시장에는 다채로운 물건들이 즐비했고 사람들의 손길이 이어졌어요.

그렇게 공주님의 시장 모험은 가장 따뜻한 기억이 되었어요.`,
});
