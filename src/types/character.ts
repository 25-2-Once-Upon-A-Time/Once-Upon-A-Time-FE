// 캐릭터 목록
export interface CharacterSummary {
  id: number;
  name: string;
  thumbnailUrl: string;
}

// 캐릭터 상세
export interface CharacterDetail extends CharacterSummary {
  tags: string[];
  description: string;
  likeCount: number;

  audios: {
    id: number;
    title: string;
    duration: number;
  }[];
}
