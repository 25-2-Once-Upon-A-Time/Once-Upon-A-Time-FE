import React, { useEffect, useState } from 'react';
import { TopNav } from '@/components/ui/TopNav';
import Button from '@/components/ui/Button/Button';
import Image from '@/components/ui/Image/Image';

import loginImg from '@/assets/images/login.svg';
import kakaoLoginImg from '@/assets/images/kakao_login_large_wide.svg';

import { api } from '@/api/api';

const LoginPage: React.FC = () => {
  const [kakaoClientId, setKakaoClientId] = useState<string>('');

  useEffect(() => {
    // 백엔드에서 카카오 REST API 키 받아오기
    const fetchKakaoClientId = async () => {
      try {
        const response = await api.get('/api/v1/auth/kakao/url');
        console.log('API 응답:', response.data);

        if (response.data.success && response.data.data.redirectUrl) {
          // redirectUrl에서 client_id 파라미터 추출
          const url = new URL(response.data.data.redirectUrl);
          const clientId = url.searchParams.get('client_id');

          if (clientId) {
            console.log('추출한 client_id:', clientId);
            setKakaoClientId(clientId);
          }
        }
      } catch (error) {
        console.error('카카오 클라이언트 ID 조회 실패:', error);
      }
    };

    fetchKakaoClientId();
  }, []);

  const handleKakaoLogin = () => {
    if (!kakaoClientId) {
      alert('카카오 로그인 설정을 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    // ✅ 프론트엔드에서 직접 카카오 로그인 URL 생성
    const REDIRECT_URI = `${window.location.origin}/kakao/callback`;
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    console.log('프론트엔드에서 생성한 카카오 URL:', kakaoAuthUrl);

    // 카카오 로그인 페이지로 이동
    window.location.href = kakaoAuthUrl;
  };

  return (
    <div className='flex flex-col h-full bg-bg-purple-50'>
      <TopNav className='bg-bg-purple-50' title='로그인' />
      <div className='flex-1 flex flex-col items-center justify-evenly w-full p-6 pb-10'>
        <div className='relative w-[50%] max-w-[200px] aspect-square flex-none'>
          <span className='nbp-30-b-uppercase text-fg-primary absolute -top-[40%] -left-[30%] z-10 whitespace-nowrap drop-shadow-sm'>
            환영합니다!
          </span>
          <Image
            src={loginImg}
            alt='로그인 캐릭터'
            className='w-full h-full bg-transparent object-contain'
          />
        </div>

        <div className='w-full flex justify-center'>
          <Button
            onClick={handleKakaoLogin}
            disabled={!kakaoClientId}
            className='p-0 bg-transparent h-auto w-full max-w-[300px] border-none hover:opacity-90 transition-opacity disabled:opacity-50'
          >
            <img src={kakaoLoginImg} alt='카카오 로그인' className='w-full h-auto object-contain' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
