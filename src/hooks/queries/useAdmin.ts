import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllMembers, getAllStories, getAllAudioBooks, deleteMember } from '@/api/admin/admin';

// Query Keys
export const adminKeys = {
  all: ['admin'] as const,
  members: () => [...adminKeys.all, 'members'] as const,
  stories: () => [...adminKeys.all, 'stories'] as const,
  audiobooks: () => [...adminKeys.all, 'audiobooks'] as const,
};

// 모든 회원 조회
export const useGetAllMembers = () => {
  return useQuery({
    queryKey: adminKeys.members(),
    queryFn: getAllMembers,
    staleTime: 1000 * 60 * 5, // 5분
  });
};

// 모든 동화 조회
export const useGetAllStories = () => {
  return useQuery({
    queryKey: adminKeys.stories(),
    queryFn: getAllStories,
    staleTime: 1000 * 60 * 5, // 5분
  });
};

// 모든 오디오북 조회
export const useGetAllAudioBooks = () => {
  return useQuery({
    queryKey: adminKeys.audiobooks(),
    queryFn: getAllAudioBooks,
    staleTime: 1000 * 60 * 5, // 5분
  });
};

// 회원 삭제
export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      // 회원 목록 갱신
      queryClient.invalidateQueries({ queryKey: adminKeys.members() });
    },
  });
};
