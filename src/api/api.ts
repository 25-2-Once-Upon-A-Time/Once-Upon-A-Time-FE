import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
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

    // 토큰 만료 케이스
    const isExpired =
      error.response?.status === 401 &&
      error.response?.data?.message?.includes('JWT expired') &&
      !originalRequest._retry;

    if (isExpired) {
      try {
        originalRequest._retry = true;

        useAuthStore.getState().logout();
        window.location.href = '/login';
        return;
      } catch {
        useAuthStore.getState().logout();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);

export default api;
