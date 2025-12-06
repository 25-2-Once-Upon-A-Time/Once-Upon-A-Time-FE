import React, { useState } from 'react';
import { TopNav } from '@/components/ui/TopNav';
import { Input } from '@/components/ui/Input';
import Checkbox from '@/components/ui/Checkbox/Checkbox';
import Button from '@/components/ui/Button/Button';

const InfoSetupPage: React.FC = () => {
  // 폼 상태 관리
  const [formData, setFormData] = useState({
    name: '',
    birth: '',
    phone: '',
    gender: '', // 'M' or 'F'
    nickname: '',
  });

  // 생년월일 포맷팅 (YYYY-MM-DD)
  const formatBirth = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 8);
    if (numbers.length <= 4) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
    return `${numbers.slice(0, 4)}-${numbers.slice(4, 6)}-${numbers.slice(6)}`;
  };

  // 일반 입력 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'birth') {
      setFormData((prev) => ({ ...prev, [name]: formatBirth(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 성별 체크박스 핸들러
  const handleGenderChange = (selectedGender: 'M' | 'F') => {
    setFormData((prev) => ({
      ...prev,
      gender: selectedGender,
    }));
  };

  // 완료 버튼 핸들러
  const handleSubmit = () => {
    console.log('설정 완료된 데이터:', formData);
    // TODO: 서버 전송 및 페이지 이동 로직
  };

  // 폼 완성 여부 체크
  const isFormComplete =
    formData.name !== '' &&
    formData.birth !== '' &&
    formData.phone !== '' &&
    formData.gender !== '' &&
    formData.nickname !== '';

  return (
    <div className='flex flex-col h-full bg-bg-purple-50'>
      <TopNav className='bg-bg-purple-50' title='회원가입' showBack />

      {/* 메인 스크롤 영역 */}
      <div className='w-full px-7 overflow-y-auto flex-1 pt-[65px] pb-[120px]'>
        <div className='space-y-6'>
          {/* 이름 */}
          <div className='w-full'>
            <label className='block text-fg-primary pre-16-43-r mb-2'>이름</label>
            <Input
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              placeholder='이름을 입력해주세요'
              className='border-border-purple bg-[#A2AADB] placeholder:text-fg-gray'
              autoComplete='off'
            />
          </div>

          {/* 생년월일 */}
          <div className='w-full'>
            <label className='block text-fg-primary pre-16-43-r mb-2'>생년월일</label>
            <Input
              name='birth'
              value={formData.birth}
              onChange={handleInputChange}
              placeholder='2004-01-01'
              maxLength={10}
              className='border-border-purple bg-[#A2AADB] placeholder:text-fg-gray'
              autoComplete='off'
            />
          </div>

          {/* 전화번호 */}
          <div className='w-full'>
            <label className='block text-fg-primary pre-16-43-r mb-2'>전화번호</label>
            <Input
              type='tel'
              name='phone'
              value={formData.phone}
              onChange={handleInputChange}
              placeholder='01012345678'
              className='border-border-purple bg-[#A2AADB] placeholder:text-fg-gray'
              autoComplete='off'
            />
          </div>

          {/* 성별 */}
          <div className='w-full'>
            <label className='block text-fg-primary pre-16-43-r mb-2'>성별</label>
            <div className='flex gap-12'>
              <Checkbox
                id='gender-female'
                label='여성'
                checked={formData.gender === 'F'}
                onChange={() => handleGenderChange('F')}
              />
              <Checkbox
                id='gender-male'
                label='남성'
                checked={formData.gender === 'M'}
                onChange={() => handleGenderChange('M')}
              />
            </div>
          </div>

          {/* 닉네임 */}
          <div className='w-full'>
            <label className='block text-fg-primary pre-16-43-r mb-2'>닉네임</label>
            <Input
              name='nickname'
              value={formData.nickname}
              onChange={handleInputChange}
              placeholder='닉네임을 입력해주세요'
              className='border-border-purple bg-[#A2AADB] placeholder:text-fg-gray'
              autoComplete='off'
            />
          </div>
        </div>
      </div>

      {/* 하단 고정 버튼 영역 */}
      <div className='fixed bottom-0 left-0 right-0 w-full px-7 pb-8 pt-4 bg-bg-purple-50'>
        <Button
          variant='primary'
          fullWidth
          onClick={handleSubmit}
          disabled={!isFormComplete}
          className={!isFormComplete ? 'bg-[#A7ABC3] hover:bg-[#A7ABC3]' : ''}
        >
          완료
        </Button>
      </div>
    </div>
  );
};

export default InfoSetupPage;
