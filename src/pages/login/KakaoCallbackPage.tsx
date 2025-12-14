import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/api/api';
import { useAuthStore } from '@/stores/authStore';

type KakaoCallbackData = {
  isNewUser?: boolean;
  signupToken?: string;
  accessToken?: string;
  refreshToken?: string;
};

function parseXmlToData(xmlText: string): KakaoCallbackData {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

  const parserError = xmlDoc.querySelector('parsererror');
  if (parserError) {
    throw new Error('XML 파싱 실패');
  }

  const dataNode = xmlDoc.querySelector('data');
  const isNewUser = dataNode?.querySelector('isNewUser')?.textContent === 'true';
  const signupToken = dataNode?.querySelector('signupToken')?.textContent || undefined;
  const accessToken = dataNode?.querySelector('accessToken')?.textContent || undefined;
  const refreshToken = dataNode?.querySelector('refreshToken')?.textContent || undefined;

  return { isNewUser, signupToken, accessToken, refreshToken };
}

const KakaoCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const { setAccessToken, setRefreshToken, setSignupToken } = useAuthStore();

  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const run = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        // console.log('카카오 인가 코드:', code);

        if (!code) throw new Error('인가 코드가 없습니다.');

        // 백엔드 호출 (GET 방식)
        const res = await api.get(`/api/v1/auth/kakao/callback?code=${code}`, {
          headers: { Accept: 'application/json, application/xml' },
        });

        // console.log('백엔드 응답:', res.data);

        // JSON / XML 둘 다 대응
        let payload: any = res.data;

        if (typeof payload === 'string') {
          const trimmed = payload.trim();
          // console.log('String 응답:', trimmed);

          if (trimmed.startsWith('<')) {
            payload = parseXmlToData(trimmed);
          } else if (trimmed.startsWith('{')) {
            try {
              payload = JSON.parse(trimmed);
            } catch {
              throw new Error('응답 형식을 이해할 수 없습니다.');
            }
          }
        }

        // ApiResult 형태라면 data만 꺼내기
        const data: KakaoCallbackData = payload?.data ?? payload;

        // console.log('파싱된 데이터:', data);

        if (data?.isNewUser) {
          if (!data.signupToken) throw new Error('signupToken이 없습니다.');

          // console.log('=== 신규 사용자 처리 ===');
          // console.log('signupToken:', data.signupToken);

          // ✅ Zustand store에 저장
          setSignupToken(data.signupToken);
          // console.log('Zustand에 저장 완료');

          // ✅ sessionStorage에도 직접 저장 (백업)
          sessionStorage.setItem('temp_signup_token', data.signupToken);
          // console.log('sessionStorage에 백업 저장 완료');

          // ✅ persist가 저장될 시간을 주기 위해 약간의 딜레이
          setTimeout(() => {
            // console.log('회원가입 페이지로 이동');
            navigate('/info-setup', { replace: true });
          }, 100);
          return;
        }

        if (!data?.accessToken) throw new Error('accessToken이 없습니다.');

        // console.log('기존 사용자 - 메인 페이지로 이동');

        setAccessToken(data.accessToken);
        if (data.refreshToken) {
          setRefreshToken(data.refreshToken);
        }

        navigate('/story', { replace: true });
      } catch (err: any) {
        // console.error('===== 카카오 로그인 처리 실패 =====', err);

        // ✅ 500 에러 응답 상세 출력
        if (err?.response?.status === 500) {
          console.error('===== 백엔드 500 에러 상세 =====');
          console.error('응답 데이터:', err.response.data);
          console.error('응답 헤더:', err.response.headers);
        }

        const msg =
          err?.response?.data?.error?.message ||
          err?.response?.data?.message ||
          err?.message ||
          '로그인에 실패했습니다.';

        alert(msg);
        navigate('/login', { replace: true });
      }
    };

    run();
  }, [navigate, setAccessToken, setRefreshToken, setSignupToken]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-bg-purple-50'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-400 border-solid mx-auto mb-4'></div>
        <p className='nbp-18-b text-fg-primary'>카카오 로그인 처리 중...</p>
      </div>
    </div>
  );
};

export default KakaoCallbackPage;
