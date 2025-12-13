import { api } from '../api';
import type { CharacterSummary, CharacterDetail } from '@/types/character';

// 캐릭터 목록 조회
export const fetchCharacters = async (): Promise<CharacterSummary[]> => {
  const { data } = await api.get<CharacterSummary[]>('/api/v1/characters');
  return data;
};

// 캐릭터 상세 조회
export const fetchCharacterDetail = async (characterId: number): Promise<CharacterDetail> => {
  const { data } = await api.get<CharacterDetail>(`/api/v1/characters/${characterId}`);
  return data;
};
