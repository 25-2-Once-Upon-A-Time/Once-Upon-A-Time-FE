import { api } from '../api';
import type { CharacterSummary, CharacterDetail } from '@/types/character';
import { characterListMock, characterDetailMock } from '@/mocks/character';

const isMock = import.meta.env.VITE_API_MODE === 'MOCK';

// 캐릭터 목록 조회
export const fetchCharacters = async (): Promise<CharacterSummary[]> => {
  if (isMock) {
    return Promise.resolve(characterListMock);
  }

  const { data } = await api.get<CharacterSummary[]>('/api/v1/characters');
  return data;
};

// 캐릭터 상세 조회
export const fetchCharacterDetail = async (characterId: number): Promise<CharacterDetail> => {
  if (isMock) {
    return Promise.resolve(characterDetailMock(characterId));
  }

  const { data } = await api.get<CharacterDetail>(`/api/v1/characters/${characterId}`);
  return data;
};
