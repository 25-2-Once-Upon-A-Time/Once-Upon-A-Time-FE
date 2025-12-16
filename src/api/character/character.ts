import { api } from '../api';
import type { CharacterSummary, CharacterDetail } from '@/types/character';
import type { ApiResponse, ApiListResponse } from '@/types/common';

// const isMock = import.meta.env.VITE_API_MODE === 'MOCK';

// 캐릭터 목록 조회
export const fetchCharacters = async (): Promise<CharacterSummary[]> => {
  const { data } = await api.get<ApiListResponse<CharacterSummary>>('/api/v1/characters');

  return data.data.items || []; // items만 반환, undefined 방지
};

export const fetchCharacterDetail = async (characterId: number): Promise<CharacterDetail> => {
  console.log('[fetchCharacterDetail] characterId:', characterId);

  try {
    const res = await api.get<ApiResponse<CharacterDetail>>(`/api/v1/characters/${characterId}`);
    console.log('[fetchCharacterDetail] raw response:', res);
    console.log('[fetchCharacterDetail] response.data:', res.data);

    return res.data.data;
  } catch (e) {
    console.error('[fetchCharacterDetail] ERROR:', e);
    throw e;
  }
};
