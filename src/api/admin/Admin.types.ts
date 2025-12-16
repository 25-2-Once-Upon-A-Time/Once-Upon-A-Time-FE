// 회원 정보
export interface Member {
  memberId: number;
  name: string;
  nickname: string;
  kakaoUserId: string;
  role: 'ADMIN' | 'USER';
}

// 동화 정보
export interface AdminStory {
  storyId: number;
  title: string;
  writerName: string;
  theme: string;
  createdDate: string;
}

// 오디오북 정보
export interface AdminAudioBook {
  audioBookId: number;
  storyTitle: string;
  memberName: string;
  characterName: string;
}

// API 응답 타입
export interface AdminApiResponse<T> {
  success: boolean;
  data: T;
  error: null | {
    code: number;
    message: string;
  };
}
