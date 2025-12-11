import { useQuery } from '@tanstack/react-query';
import { fetchCharacters, fetchCharacterDetail } from '@/api/character/character';

export const useCharacters = () => {
  return useQuery({
    queryKey: ['characters'],
    queryFn: fetchCharacters,
  });
};

export const useCharacterDetail = (id: number) => {
  return useQuery({
    queryKey: ['characterDetail', id],
    queryFn: () => fetchCharacterDetail(id),
    enabled: id > 0,
  });
};
