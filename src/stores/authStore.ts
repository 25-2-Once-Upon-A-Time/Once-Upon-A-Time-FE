import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  signupToken: string | null;

  setAccessToken: (accessToken: string | null) => void;
  setRefreshToken: (refreshToken: string | null) => void;
  setSignupToken: (signupToken: string | null) => void;

  logout: () => void;
  clearSignupToken: () => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      signupToken: null,

      setAccessToken: (accessToken) => set({ accessToken }),
      setRefreshToken: (refreshToken) => set({ refreshToken }),
      setSignupToken: (signupToken) => set({ signupToken }),

      clearSignupToken: () => set({ signupToken: null }),

      logout: () => set({ accessToken: null, refreshToken: null, signupToken: null }),
      clearAuth: () => set({ accessToken: null, refreshToken: null }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
