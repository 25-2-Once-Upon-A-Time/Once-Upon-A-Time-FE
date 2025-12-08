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
      setIsEditMode(false);
      console.log('저장된 데이터:', userInfo);
    } else {
      setIsEditMode(true);
    }
  };

  // 추후에 로그아웃 로직 생성할 예정

  return (
    <div className='max-w-[430px] min-w-[360px] min-h-screen flex flex-col mx-auto'>
      <TopNav className='bg-bg-purple-50' title='내정보' />
      <div className='w-full px-7 overflow-y-auto flex-1 pt-[90px] pb-[85px]'>
        <UserInfoList items={userInfo} onChange={handleChange} isEditMode={isEditMode} />
        <div className='mt-8 flex justify-end'>
          <Button
            variant='primary'
            onClick={handleEdit}
            className='w-[70px] h-[31px] rounded-[4px]'
          >
            <span className='pre-16-43-r'>{isEditMode ? '완료' : '수정'}</span>
          </Button>
        </div>
        <div className='mt-20 flex justify-center'>
          <TextButton variant='body' className='h-[26px]'>
            <span className='pre-16-43-r fg-fg-primary'>로그아웃</span>
          </TextButton>
        </div>
      </div>
      <BottomNav className='shadow-shadow-purple' />
    </div>
  );
};

export default MyPage;
