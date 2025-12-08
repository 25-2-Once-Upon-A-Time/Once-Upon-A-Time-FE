import React from 'react';
import { useNavigate } from 'react-router-dom';

// 컴포넌트
import { TopNav } from '@/components/ui/TopNav';
import Button from '@/components/ui/Button/Button';
import Image from '@/components/ui/Image/Image';

// 에셋
import loginImg from '@/assets/images/login.svg';
import kakaoLoginImg from '@/assets/images/kakao_login_large_wide.svg';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  // 카카오 로그인 핸들러
  const handleKakaoLogin = () => {
    console.log('카카오 로그인 시도');
    // TODO: 카카오 로그인 API 호출 후 성공 시 이동
    navigate('/info-setup');
  };

  return (
    <div className='flex flex-col h-full bg-bg-purple-50'>
      <TopNav className='bg-bg-purple-50' title='로그인' />

      {/* 메인 콘텐츠 영역 */}
      <div className='flex-1 flex flex-col items-center justify-evenly w-full p-6 pb-10'>
        {/* 환영 이미지 영역 */}
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

        {/* 카카오 로그인 버튼 */}
        <div className='w-full flex justify-center'>
          <Button
            onClick={handleKakaoLogin}
            className='p-0 bg-transparent h-auto w-full max-w-[300px] border-none hover:opacity-90 transition-opacity'
          >
            <img src={kakaoLoginImg} alt='카카오 로그인' className='w-full h-auto object-contain' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
