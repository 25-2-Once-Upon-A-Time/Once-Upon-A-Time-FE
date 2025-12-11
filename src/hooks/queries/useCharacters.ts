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
    enabled: !!id, // id 있으면 true(실행), 없으면 false(비실행)
  });
};
