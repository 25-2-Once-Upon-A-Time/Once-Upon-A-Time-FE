// 오디오북 리스트 조회
export interface AudioBookSummaryResponse {
  audiobookId: number;
  audiobookName: string;
  storyTitle: string;
  theme: string;
  vibe: string;
  thumbnailUrl: string;
  characterName: string;
  duration: number;
}

// 오디오북 재생 정보 조회
export interface AudioBookPlaybackInfoResponse {
  playbackId: number;
  audiobookId: number;
  duration: number;
  lastPosition: number;
  progressRate: number;
  status: 'PLAYING' | 'PAUSED' | 'COMPLETED';
  storyTitle: string;
  theme: string;
  vibe: string;
  thumbnailUrl: string;
  characterName: string;
}

// 오디오북 재생 시작
export interface AudioBookPlaybackStartResponse {
  playbackId: number;
  audiobookId: number;
  lastPosition: number;
  progressRate: number;
  status: 'PLAYING';
  audioUrl: string;
}

export type AudioPlaybackStatus = 'PLAYING' | 'PAUSED' | 'COMPLETED';
