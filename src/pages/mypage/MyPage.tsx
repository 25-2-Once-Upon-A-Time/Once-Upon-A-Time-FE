import React, { useState } from 'react';
import UserInfoList from '@/features/mypage/UserInfoList/UserInfoList';
import type { UserInfoItem } from '@/features/mypage/UserInfoList/UserInfoList.types';
import { TopNav } from '@/components/ui/TopNav';
import { BottomNav } from '@/components/ui/BottomNav';
import Button from '@/components/ui/Button/Button';
import TextButton from '@/components/ui/TextButton/TextButton';

const MyPage: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfoItem[]>([
    { key: '이름', value: '', placeholder: '이름' },
    { key: '생년월일', value: '', placeholder: '2004-01-01' },
    { key: '전화번호', value: '', placeholder: '01011112222', type: 'tel' },
    { key: '성별', value: '', placeholder: '여성' },
    { key: '닉네임', value: '', placeholder: '컴공' },
  ]);

  const handleChange = (key: string, value: string) => {
    setUserInfo((prev) => prev.map((item) => (item.key === key ? { ...item, value } : item)));
  };

  const handleEdit = () => {
    if (isEditMode) {
      // 완료 버튼 클릭 - 수정 모드 비활성화
      setIsEditMode(false);
      console.log('저장된 데이터:', userInfo);
    } else {
      // 수정 버튼 클릭 - 수정 모드 활성화
      setIsEditMode(true);
    }
  };

  const handleLogout = () => {
    console.log('로그아웃 버튼 클릭');
  };

  return (
    <div className='flex flex-col h-full bg-bg-purple-50'>
      <TopNav className='bg-bg-purple-50' title='내정보' />
      <div className='w-full px-7 overflow-y-auto flex-1 pt-[65px] pb-[80px]'>
        <UserInfoList items={userInfo} onChange={handleChange} isEditMode={isEditMode} />
        <div className='mt-6 flex justify-start'>
          <Button
            variant='primary'
            onClick={handleEdit}
            className='w-[61px] h-[31px] text-[14px] px-0 rounded-[4px]'
          >
            {isEditMode ? '완료' : '수정'}
          </Button>
        </div>
        <div className='mt-4 flex justify-end'>
          <TextButton
            variant='body'
            color='gray'
            onClick={handleLogout}
            className='text-[14px] h-[26px]'
          >
            로그아웃
          </TextButton>
        </div>
      </div>
      <BottomNav className='shadow-shadow-purple' />
    </div>
  );
};

export default MyPage;
