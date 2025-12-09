import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopNav } from '@/components/ui/TopNav';
import { Input } from '@/components/ui/Input';
import Checkbox from '@/components/ui/Checkbox/Checkbox';
import Button from '@/components/ui/Button/Button';
import TextButton from '@/components/ui/TextButton/TextButton';
import VerificationCompleteModal from '@/components/ui/VerificationCompleteModal';
import TermsDetailModal from '@/components/ui/TermsDetailModal';
import FormField from '@/components/ui/FormField';
import loginImg from '@/assets/images/login.svg';
import fatherhoodImg from '@/assets/images/fatherhood.svg';
import { SERVICE_TERMS, PRIVACY_TERMS } from '@/constants/termsData';

// 공통 Input 스타일
const INPUT_CLASS = 'border-border-purple bg-bg-purple-800 placeholder:text-fg-gray';

const InfoSetupPage: React.FC = () => {
  const navigate = useNavigate();

  // 폼 상태 관리
  const [formData, setFormData] = useState({
    name: '',
    birth: '',
    phone: '',
    gender: '',
    nickname: '',
    agreeTerms: false,
    agreePrivacy: false,
  });

  // 모달 상태 관리
  const [showUnderageModal, setShowUnderageModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [termsModal, setTermsModal] = useState<'terms' | 'privacy' | null>(null);

  // 만 나이 계산 함수
  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  // 생년월일 포맷팅 (YYYY-MM-DD)
  const formatBirth = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 8);
    if (numbers.length <= 4) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
    return `${numbers.slice(0, 4)}-${numbers.slice(4, 6)}-${numbers.slice(6)}`;
  };

  // 입력 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'birth' ? formatBirth(value) : value,
    }));
  };

  // 성별 선택 핸들러
  const handleGenderChange = (selectedGender: 'M' | 'F') => {
    setFormData((prev) => ({ ...prev, gender: selectedGender }));
  };

  // 약관 체크박스 핸들러
  const handleAgreementChange = (field: 'agreeTerms' | 'agreePrivacy') => {
    setFormData((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // 완료 버튼 핸들러
  const handleSubmit = () => {
    const age = calculateAge(formData.birth);
    if (age < 14) {
      setShowUnderageModal(true);
      return;
    }
    console.log('설정 완료된 데이터:', formData);
    // TODO: 서버 전송
    setShowCompleteModal(true);
  };

  // 회원가입 완료 확인 핸들러
  const handleCompleteConfirm = () => {
    setShowCompleteModal(false);
    navigate('/'); // TODO: 원하는 페이지로 이동
  };

  // 법정대리인 동의 페이지로 이동
  const handleGoToParentalConsent = () => {
    setShowUnderageModal(false);
    navigate('/parental-consent', { state: { formData } });
  };

  // 폼 완성 여부 체크
  const isFormComplete =
    formData.name !== '' &&
    formData.birth !== '' &&
    formData.phone !== '' &&
    formData.gender !== '' &&
    formData.nickname !== '' &&
    formData.agreeTerms &&
    formData.agreePrivacy;

  return (
    <div className='flex flex-col h-full bg-bg-purple-50'>
      <TopNav className='bg-bg-purple-50' title='회원가입' showBack />

      {/* 세부 타이틀 */}
      <div className='w-full pt-[65px]'>
        <p className='text-fg-primary pre-18-sb-uppercase text-center'>정보설정</p>
      </div>

      {/* 메인 스크롤 영역 */}
      <div className='w-full px-7 overflow-y-auto flex-1 pb-[120px]'>
        <div className='space-y-6'>
          {/* 이름 */}
          <FormField label='이름'>
            <Input
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              placeholder='이름을 입력해주세요'
              className={INPUT_CLASS}
              autoComplete='off'
            />
          </FormField>

          {/* 생년월일 */}
          <FormField label='생년월일'>
            <Input
              name='birth'
              value={formData.birth}
              onChange={handleInputChange}
              placeholder='2004-01-01'
              maxLength={10}
              className={INPUT_CLASS}
              autoComplete='off'
            />
          </FormField>

          {/* 전화번호 */}
          <FormField label='전화번호'>
            <Input
              type='tel'
              name='phone'
              value={formData.phone}
              onChange={handleInputChange}
              placeholder='01012345678'
              className={INPUT_CLASS}
              autoComplete='off'
            />
          </FormField>

          {/* 성별 */}
          <FormField label='성별'>
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
          </FormField>

          {/* 닉네임 */}
          <FormField label='닉네임'>
            <Input
              name='nickname'
              value={formData.nickname}
              onChange={handleInputChange}
              placeholder='닉네임을 입력해주세요'
              className={INPUT_CLASS}
              autoComplete='off'
            />
          </FormField>

          {/* 약관 동의 */}
          <div className='w-full space-y-4'>
            <div className='flex items-center justify-between'>
              <Checkbox
                id='agree-terms'
                label='(필수) 서비스 이용약관'
                checked={formData.agreeTerms}
                onChange={() => handleAgreementChange('agreeTerms')}
              />
              <TextButton
                variant='caption'
                color='gray'
                className='underline'
                onClick={() => setTermsModal('terms')}
              >
                보기
              </TextButton>
            </div>
            <div className='flex items-center justify-between'>
              <Checkbox
                id='agree-privacy'
                label='(필수) 개인정보 수집이용 동의'
                checked={formData.agreePrivacy}
                onChange={() => handleAgreementChange('agreePrivacy')}
              />
              <TextButton
                variant='caption'
                color='gray'
                className='underline'
                onClick={() => setTermsModal('privacy')}
              >
                보기
              </TextButton>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 고정 버튼 영역 */}
      <div className='fixed bottom-0 w-full px-7 pb-8 pt-4 bg-bg-purple-50'>
        <Button
          variant='primary'
          fullWidth
          onClick={handleSubmit}
          disabled={!isFormComplete}
          className={!isFormComplete ? 'bg-bg-purple-600 hover:bg-bg-purple-600' : ''}
        >
          완료
        </Button>
      </div>

      {/* 14세 미만 안내 모달 */}
      {showUnderageModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
          <div className='mx-7 w-full max-w-[320px] rounded-2xl bg-white p-6'>
            <div className='flex justify-center mb-4'>
              <img src={fatherhoodImg} alt='법정대리인 동의 안내' className='w-24 h-24' />
            </div>
            <p className='text-center text-fg-primary pre-16-43-r mb-6'>
              만 14세 미만인 분은
              <br />
              <span className='font-semibold'>법정대리인의 동의</span>가 필요해요!
            </p>
            <div className='flex flex-col gap-3'>
              <Button variant='primary' fullWidth onClick={handleGoToParentalConsent}>
                법정대리인 동의하기
              </Button>
              <button
                type='button'
                onClick={() => setShowUnderageModal(false)}
                className='text-fg-gray pre-14-m py-2'
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 약관 모달 */}
      <TermsDetailModal
        isOpen={termsModal === 'terms'}
        onClose={() => setTermsModal(null)}
        title='서비스 이용약관'
        subtitle='동의사항'
        termsData={SERVICE_TERMS}
      />
      <TermsDetailModal
        isOpen={termsModal === 'privacy'}
        onClose={() => setTermsModal(null)}
        title='개인정보 수집이용 동의'
        subtitle='동의사항'
        termsData={PRIVACY_TERMS}
      />

      {/* 회원가입 완료 모달 */}
      <VerificationCompleteModal
        isOpen={showCompleteModal}
        onConfirm={handleCompleteConfirm}
        imageSrc={loginImg}
        message='회원가입을 완료하였습니다.'
        confirmText='시작하기'
      />
    </div>
  );
};

export default InfoSetupPage;
