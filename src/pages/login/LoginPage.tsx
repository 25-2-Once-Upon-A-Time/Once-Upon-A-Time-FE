import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TopNav } from '@/components/ui/TopNav';
import Button from '@/components/ui/Button/Button';
import Image from '@/components/ui/Image/Image';
import loginImg from '@/assets/images/login.png';
import kakaoLoginImg from '@/assets/images/kakao_login_large_wide 1.png';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const handleKakaoLogin = () => {
    console.log('카카오 로그인 시도');

    // 원래는 여기서 카카오 로그인 API를 호출하고,
    // 성공 응답을 받으면 이동해야 하지만,
    // 지금은 UI 흐름 확인을 위해 바로 이동시킵니다.

    navigate('/info-setup'); // 3. 원하는 경로('/info-setup')로 이동
  };

  return (
    <div className='flex flex-col h-full bg-bg-purple-50'>
      <TopNav className='bg-bg-purple-50' title='로그인' />

      {/* [변경점 1] justify-center 대신 justify-evenly 또는 flex-col + gap 활용
        - justify-evenly: 상단, 중단, 하단 여백을 균등하게 분배합니다.
        - 키가 작은 폰에서도 요소들이 겹치지 않게 w-full과 p-6을 줍니다.
      */}
      <div className='flex-1 flex flex-col items-center justify-evenly w-full p-6 pb-10'>
        {/* [변경점 2] 이미지 영역 반응형 처리 
          - w-50 (Tailwind 기본에 없음) -> w-[50%] max-w-[200px]
          - 화면이 커지면 최대 200px까지만 커지고, 작으면 화면의 반을 차지합니다.
          - aspect-square: 정사각형 비율 유지
        */}
        <div className='relative w-[50%] max-w-[200px] aspect-square flex-none'>
          {/* [변경점 3] 텍스트 위치 조정
            - px 단위 대신 % 단위(top/left)를 쓰거나,
            - -left-20 처럼 너무 많이 빼면 화면 밖으로 나갈 수 있으므로 조절했습니다.
            - whitespace-nowrap: 글자가 좁아져도 줄바꿈 방지
          */}
          <span className='nbp-30-b-uppercase text-fg-primary absolute -top-[40%] -left-[30%] z-10 whitespace-nowrap drop-shadow-sm'>
            환영합니다!
          </span>

          <Image
            src={loginImg}
            alt='로그인 캐릭터'
            className='w-full h-full bg-transparent object-contain'
          />
        </div>

        {/* [변경점 4] 버튼 영역 
          - mt-10을 제거하고 부모의 justify-evenly에 맡기거나, 
          - margin-top을 auto로 주어 바닥에 붙일 수도 있습니다. 여기선 자연스러운 흐름 유지.
        */}
        <div className='w-full flex justify-center'>
          <Button
            onClick={handleKakaoLogin}
            // max-w-[300px]로 너무 넓어지는 것 방지
            // h-auto로 이미지 비율 유지
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
