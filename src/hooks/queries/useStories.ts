import { useQuery } from '@tanstack/react-query'; // useMutation, useQueryClient 추가 필요
import { fetchStories, fetchStoryDetail } from '@/api/story/story'; // createStory 추가 필요

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

// export const useCreateStory = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: createStory,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['stories'] }); // 목록 새로고침
//     },
//   });
// };
