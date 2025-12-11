// 동화 목록 조회
export interface StorySummary {
  id: number;
  title: string;
  thumbnailUrl: string;
}

// 상세 조회 화면
export interface StoryDetail {
  id: number;
  title: string;
  thumbnailUrl: string;
  tags: string[];
  description: string;
  content: string;
  theme: string;
  vibe: string;
}

// 동화 생성 요청
export interface CreateStoryRequest {
  theme: string;
  vibe: string;
  prompt: string;
  title: string;
}
