import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

const BASE_URL =
  import.meta.env.MODE === 'production'
    ? '' // 배포(Vercel)에서는 rewrite 사용
    : import.meta.env.VITE_API_BASE_URL; // 로컬에서만 학교 서버 주소 직접 사용

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* ----- 요청 인터셉터 ----- */
api.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;

    console.log('🔑 API Request Interceptor');
    console.log('🔑 URL:', config.url);
    console.log('🔑 accessToken exists:', !!accessToken);
    console.log(
      '🔑 accessToken value:',
      accessToken ? `${accessToken.substring(0, 20)}...` : 'MISSING',
    );

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log('✅ Authorization header set');
    } else {
      console.error('❌ No access token - request will fail with 403!');
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/* ----- 응답 인터셉터 ----- */
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    console.error('❌ API Response Error');
    console.error('❌ Status:', error.response?.status);
    console.error('❌ URL:', originalRequest?.url);
    console.error('❌ Message:', error.response?.data?.message);

    // 403 에러 추가 처리
    if (error.response?.status === 403) {
      console.error('❌ 403 Forbidden - Authentication required');
      console.error('❌ Redirecting to login...');
      useAuthStore.getState().clearAuth();
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // 토큰 만료 케이스
    const isExpired =
      error.response?.status === 401 &&
      error.response?.data?.message?.includes('JWT expired') &&
      !originalRequest._retry;

    if (isExpired) {
      originalRequest._retry = true;

      console.error('❌ 401 JWT Expired - Redirecting to login...');
      useAuthStore.getState().logout();
      window.location.href = '/login';

      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default api;
