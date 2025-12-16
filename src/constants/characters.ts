import jjangguImage from '@/assets/images/jjanggu-image.svg';

// 캐릭터 데이터 타입
export interface Character {
  id: number;
  title: string;
  imageSrc: string;
  tags: string[];
  description: string;
}

// 캐릭터 상세 정보 타입
export interface CharacterDetail {
  id: number;
  title: string;
  tags: string[];
  description: string;
}

// 캐릭터 이미지 매핑
export const characterImageMap: Record<number, string> = {
  1: jjangguImage,
  // 추가 캐릭터 이미지 추가할 예정입니다.
};

// 캐릭터 상세 정보
export const characterDetails: Record<number, CharacterDetail> = {
  1: {
    id: 1,
    title: '짱구',
    tags: ['#활발한', '#쾌활한', '#개구장이'],
    description: '애니메이션 짱구는 못말려에 나오는 캐릭터입니다.',
  },
  // 추가 캐릭터 정보 추가할 예정입니다.
};

// 캐릭터 데이터
export const characters: Character[] = [
  {
    id: 1,
    title: '짱구',
    imageSrc: characterImageMap[1],
    tags: characterDetails[1].tags,
    description: characterDetails[1].description,
  },
  { id: 2, title: '캐릭터 2', imageSrc: '', tags: [], description: '' },
  { id: 3, title: '캐릭터 3', imageSrc: '', tags: [], description: '' },
  { id: 4, title: '캐릭터 4', imageSrc: '', tags: [], description: '' },
  { id: 5, title: '캐릭터 5', imageSrc: '', tags: [], description: '' },
  { id: 6, title: '캐릭터 6', imageSrc: '', tags: [], description: '' },
];
