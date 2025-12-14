import { api } from './api';

export interface UserProfile {
  id: number;
  name: string;
  nickname: string;
  gender: 'MALE' | 'FEMALE';
  birth: string;
  personalPhone: string;
  email?: string;
}

export const userApi = {
  // 내 정보 조회
  getMyProfile: async () => {
    const response = await api.get('/api/v1/members/me');
    return response.data;
  },

  updateProfile: async (data: {
    name: string;
    nickname: string;
    gender: 'MALE' | 'FEMALE';
    birth: string;
    personalPhone: string;
  }) => {
    const response = await api.patch('/api/v1/members/me', data);
    return response.data;
  },
};
