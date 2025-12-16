export interface AudioBook {
  id: number;
  title: string;
  tags: string[];
  character: string;
  duration: string;
  imageSrc?: string;
}

export const audiobooks: AudioBook[] = [
  {
    id: 1,
    title: '나눠먹으면 맛있어요',
    tags: ['#용기', '#따뜻한'],
    character: '뽀로로',
    duration: '00:01:32',
  },
  {
    id: 2,
    title: '나눠먹으면 맛있어요',
    tags: ['#모험', '#신비로움'],
    character: '신데렐라',
    duration: '00:01:32',
  },
];
