// 캐릭터 목록
export interface CharacterSummary {
  id: number;
  characterName: string;
  thumbnailUrl: string;
}

// 캐릭터 상세
export interface CharacterDetail {
  id: number;
  characterName: string;
  characterType: 'MAIN' | 'SUB' | null;
  description: string;
  thumbnailUrl: string;
  voiceSampleUrl: string;
  voiceActor: string;
  tags: string[];
  audios: AudioSample[];
}

export interface AudioSample {
  title: string;
  duration: string;
  audioUrl: string;
}
