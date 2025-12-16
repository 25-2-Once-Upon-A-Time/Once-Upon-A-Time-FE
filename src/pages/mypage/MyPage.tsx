// src/pages/mypage/MyPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInfoList from '@/features/mypage/UserInfoList/UserInfoList';
import type { UserInfoItem } from '@/features/mypage/UserInfoList/UserInfoList.types';
import { TopNav } from '@/components/ui/TopNav';
import { BottomNav } from '@/components/ui/BottomNav';
import Button from '@/components/ui/Button/Button';
import TextButton from '@/components/ui/TextButton/TextButton';
import { userApi, type UserProfile } from '@/api/mypage/user';
import { useAuthStore } from '@/stores/authStore';

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const { accessToken, logout } = useAuthStore();

  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfoItem[]>([
    { key: '이름', value: '', placeholder: '이름' },
    { key: '생년월일', value: '', placeholder: '2004-01-01' },
    { key: '전화번호', value: '', placeholder: '010-1111-2222', type: 'tel' },
    { key: '성별', value: '', placeholder: '여성' },
    { key: '닉네임', value: '', placeholder: '컴공' },
  ]);

  // 내 정보 불러오기
  useEffect(() => {
    const fetchProfile = async () => {
      if (!accessToken) {
        alert('로그인이 필요합니다.');
        navigate('/login');
        return;
      }

      try {
        setLoading(true);
        const response = await userApi.getMyProfile();

        console.log('내 정보 응답:', response);

        if (response.success && response.data) {
          const profile: UserProfile = response.data;

          // UserInfoItem 형식으로 변환
          setUserInfo([
            { key: '이름', value: profile.name || '', placeholder: '이름' },
            { key: '생년월일', value: profile.birth || '', placeholder: '2004-01-01' },
            {
              key: '전화번호',
              value: profile.personalPhone || '',
              placeholder: '010-1111-2222',
              type: 'tel',
            },
            {
              key: '성별',
              value: profile.gender === 'MALE' ? '남성' : '여성',
              placeholder: '여성',
            },
            { key: '닉네임', value: profile.nickname || '', placeholder: '컴공' },
          ]);
        }
      } catch (err: any) {
        console.error('프로필 조회 실패:', err);

        // 401 에러면 로그아웃
        if (err?.response?.status === 401) {
          alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
          logout();
          navigate('/login');
          return;
        }

        alert(
          err?.response?.data?.error?.message ||
            err?.response?.data?.message ||
            '프로필을 불러오는 중 오류가 발생했습니다.',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [accessToken, navigate, logout]);

  const handleChange = (key: string, value: string) => {
    setUserInfo((prev) => prev.map((item) => (item.key === key ? { ...item, value } : item)));
  };

  const handleEdit = async () => {
    if (isEditMode) {
      // 완료 버튼 클릭 - 수정 내용 저장
      setIsSaving(true);

      try {
        const name = userInfo.find((item) => item.key === '이름')?.value || '';
        const birth = userInfo.find((item) => item.key === '생년월일')?.value || '';
        const phone = userInfo.find((item) => item.key === '전화번호')?.value || '';
        const genderText = userInfo.find((item) => item.key === '성별')?.value || '';
        const nickname = userInfo.find((item) => item.key === '닉네임')?.value || '';

        const gender = genderText === '남성' ? 'MALE' : 'FEMALE';

        const requestData: {
          name: string;
          nickname: string;
          gender: 'MALE' | 'FEMALE';
          birth: string;
          personalPhone: string;
        } = {
          name: name.trim(),
          nickname: nickname.trim(),
          gender,
          birth,
          personalPhone: phone,
        };

        console.log('=== 프로필 수정 요청 ===');
        console.log('요청 데이터:', requestData);

        const response = await userApi.updateProfile(requestData);

        console.log('프로필 수정 응답:', response);

        if (response.success) {
          alert('프로필이 수정되었습니다.');
          setIsEditMode(false);
        } else {
          alert('프로필 수정에 실패했습니다.');
        }
      } catch (err: any) {
        console.error('===== 프로필 수정 실패 =====', err);

        if (err?.response?.status === 500) {
          console.error('===== 백엔드 500 에러 상세 =====');
          console.error('응답 데이터:', err.response.data);
          console.error('요청 데이터:', err.config.data);
        }

        alert(
          err?.response?.data?.error?.message ||
            err?.response?.data?.message ||
            err?.response?.data?.message ||
            '프로필 수정 중 오류가 발생했습니다.',
        );
      } finally {
        setIsSaving(false);
      }
    } else {
      // 수정 버튼 클릭 - 편집 모드 진입
      setIsEditMode(true);
    }
  };

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      logout();
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div className='max-w-[430px] min-w-[360px] min-h-screen flex flex-col mx-auto'>
        <TopNav className='bg-bg-purple-50' title='내정보' />
        <div className='flex-1 flex items-center justify-center'>
          <p className='ng-16-r text-fg-primary'>로딩 중...</p>
        </div>
        <BottomNav className='shadow-shadow-purple' />
      </div>
    );
  }

  return (
    <div className='max-w-[430px] min-w-[360px] min-h-screen flex flex-col mx-auto'>
      <TopNav className='bg-bg-purple-50' title='내정보' />
      <div className='w-full px-7 overflow-y-auto flex-1 pt-[90px] pb-[85px]'>
        <UserInfoList items={userInfo} onChange={handleChange} isEditMode={isEditMode} />
        <div className='mt-8 flex justify-end'>
          <Button
            variant='primary'
            onClick={handleEdit}
            disabled={isSaving}
            className='w-[70px] h-[31px] rounded-[4px]'
          >
            <span className='pre-16-43-r'>
              {isSaving ? '저장 중...' : isEditMode ? '완료' : '수정'}
            </span>
          </Button>
        </div>
        <div className='mt-20 flex justify-center'>
          <TextButton variant='body' className='h-[26px]' onClick={handleLogout}>
            <span className='pre-16-43-r fg-fg-primary'>로그아웃</span>
          </TextButton>
        </div>
      </div>
      <BottomNav className='shadow-shadow-purple' />
    </div>
  );
};

export default MyPage;
