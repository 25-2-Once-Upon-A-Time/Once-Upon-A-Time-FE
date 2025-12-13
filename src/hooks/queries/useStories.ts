import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchStories, fetchStoryDetail, createStory } from '@/api/story/story';

export const useStories = () => {
  return useQuery({
    queryKey: ['stories'],
    queryFn: fetchStories,
  });
};

export const useStoryDetail = (id: number) => {
  return useQuery({
    queryKey: ['storyDetail', id],
    queryFn: () => fetchStoryDetail(id),
    enabled: !!id,
  });
};

export const useCreateStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stories'] }); // 목록 새로고침
    },
  });
};
