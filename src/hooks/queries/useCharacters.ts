import { useQuery } from '@tanstack/react-query';
import { fetchCharacters, fetchCharacterDetail } from '@/api/character/character';
import type { CharacterSummary, CharacterDetail } from '@/types/character';

export const useCharacters = () => {
  return useQuery<CharacterSummary[]>({
    queryKey: ['characters'],
    queryFn: fetchCharacters,
  });
};

export const useCharacterDetail = (id: number) => {
  return useQuery<CharacterDetail>({
    queryKey: ['characterDetail', id],
    queryFn: () => fetchCharacterDetail(id),
    enabled: true,
  });
};
