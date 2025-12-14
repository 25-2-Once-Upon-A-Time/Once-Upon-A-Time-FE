import { api } from '@/api/api';

export interface SignupRequest {
  name: string;
  gender: 'MALE' | 'FEMALE';
  birth: string;
  nickname: string;
  personalPhone: string;
}

export interface SignupResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export const authService = {
  /**
   * 카카오 회원가입 API 호출
   * @param data 회원가입 데이터
   * @param token signupToken
   * @returns 회원가입 응답 (accessToken, refreshToken 포함)
   */
  async signup(data: SignupRequest, token: string): Promise<SignupResponse> {
    const response = await api.post('/api/v1/auth/signup/kakao', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};
