import type {
  AudioBookSummaryResponse,
  AudioBookPlaybackInfoResponse,
  AudioBookPlaybackStartResponse,
} from '@/types/audiobook';

/**
 * 오디오북 리스트 mock
 * audio_books + stories + characters JOIN 결과 기준
 */
export const audioBookListMock: AudioBookSummaryResponse[] = [
  {
    audiobookId: 400,
    audiobookName: '숲속의 용감한 토끼 오디오북',
    storyTitle: '숲속의 용감한 토끼',
    theme: '용기',
    vibe: '따뜻하고 서정적',
    thumbnailUrl: 'https://example.com/story-thumb.jpg',
    characterName: '루비',
    duration: 600,
  },
];

/**
 * 오디오북 재생 정보 조회 mock
 * audio_books_playback 기준
 */
export const audioBookPlaybackInfoMock = (audiobookId: number): AudioBookPlaybackInfoResponse => ({
  playbackId: 500,
  audiobookId,
  duration: 600,
  lastPosition: 120,
  progressRate: 0.2,
  status: 'PLAYING',
  storyTitle: '숲속의 용감한 토끼',
  theme: '용기',
  vibe: '따뜻하고 서정적',
  thumbnailUrl: 'https://example.com/story-thumb.jpg',
  characterName: '루비',
});

/**
 * 오디오북 재생 시작 mock
 */
export const audioBookPlaybackStartMock = (
  audiobookId: number,
): AudioBookPlaybackStartResponse => ({
  playbackId: 500,
  audiobookId,
  lastPosition: 0,
  progressRate: 0,
  status: 'PLAYING',
  audioUrl: 'https://example.com/audio.mp3',
});
