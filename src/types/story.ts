// 동화 목록 조회
export interface StorySummary {
  id: number;
  title: string;
  thumbnailUrl: string;
  createdDate?: string;
  theme?: string;
  vibe?: string;
}

// 상세 조회 화면
export interface StoryDetail {
  id: number;
  title: string;
  thumbnailUrl: string | null;
  content: string;
  summary?: string;
  keywords?: string[];
  createdDate?: string;
  theme?: string;
  vibe?: string;
  tags?: string[];
  description?: string;
}

// 동화 생성 요청
export interface CreateStoryRequest {
  theme: string;
  vibe: string;
  prompt: string;
  title: string;
}

// 동화 생성 응답
export interface CreateStoryResponse {
  storyId: number;
}
