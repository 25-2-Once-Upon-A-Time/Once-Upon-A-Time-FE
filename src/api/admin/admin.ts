import { api } from '@/api/api';
import type { AdminApiResponse, Member, AdminStory, AdminAudioBook } from './Admin.types';

// 모든 회원 조회
export const getAllMembers = async (): Promise<Member[]> => {
  const response = await api.get<AdminApiResponse<Member[]>>('/admin/members');
  return response.data.data;
};

// 모든 동화 조회
export const getAllStories = async (): Promise<AdminStory[]> => {
  const response = await api.get<AdminApiResponse<AdminStory[]>>('/admin/stories');
  return response.data.data;
};

// 모든 오디오북 조회
export const getAllAudioBooks = async (): Promise<AdminAudioBook[]> => {
  const response = await api.get<AdminApiResponse<AdminAudioBook[]>>('/admin/audiobooks');
  return response.data.data;
};

// 회원 강제 탈퇴
export const deleteMember = async (memberId: number): Promise<void> => {
  await api.delete(`/admin/members/${memberId}`);
};
