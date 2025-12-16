import type { CharacterSummary, CharacterDetail } from '@/types/character';

export const characterListMock: CharacterSummary[] = [
  {
    id: 200,
    name: '루비',
    thumbnailUrl: 'https://example.com/char-thumb.jpg',
  },
];

export const characterDetailMock = (id: number): CharacterDetail => ({
  id,
  name: '루비',
  thumbnailUrl: 'https://example.com/char-thumb.jpg',
  description: '숲속의 용감한 토끼',
  tags: ['용기', '모험'],
  likeCount: 0,
  audios: [
    {
      id: 400,
      title: '숲속의 용감한 토끼 오디오북',
      duration: 600,
    },
  ],
});
