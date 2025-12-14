import React, { useEffect, useState } from 'react';
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
import { authService } from '@/api/authService';
import { useAuthStore } from '@/stores/authStore';
import type { InfoSetupFormData } from './verification';
import { isInfoSetupFormComplete, calculateAge, INITIAL_INFO_SETUP_FORM } from './verification';

const INPUT_CLASS = 'border-border-purple bg-bg-purple-800 placeholder:text-fg-gray';

const InfoSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signupToken, clearSignupToken, setAccessToken, setSignupToken, setRefreshToken } =
    useAuthStore();

  const [formData, setFormData] = useState<InfoSetupFormData>(INITIAL_INFO_SETUP_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showUnderageModal, setShowUnderageModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [termsModal, setTermsModal] = useState<'terms' | 'privacy' | null>(null);

  useEffect(() => {
    console.log('=== InfoSetupPage useEffect 실행 ===');
    console.log('showCompleteModal:', showCompleteModal);
    console.log('isSubmitting:', isSubmitting);

    if (showCompleteModal || isSubmitting) {
      console.log('체크 건너뜀');
      return;
    }

    let token = signupToken;
    console.log('Zustand signupToken:', token);

    if (!token) {
      const tempToken = sessionStorage.getItem('temp_signup_token');
      console.log('sessionStorage temp_signup_token:', tempToken);

      if (tempToken) {
        console.log('sessionStorage에서 signupToken 복구');
        setSignupToken(tempToken);
        token = tempToken;
      }
    }

    if (!token) {
      console.error('signupToken이 없습니다');
      alert('signupToken이 없습니다. 카카오 로그인을 다시 해주세요.');
      navigate('/login', { replace: true });
    } else {
      console.log('signupToken 확인 완료:', token);
    }
  }, [signupToken, navigate, setSignupToken, showCompleteModal, isSubmitting]);

  const formatBirth = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 8);
    if (numbers.length <= 4) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
    return `${numbers.slice(0, 4)}-${numbers.slice(4, 6)}-${numbers.slice(6)}`;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 11);
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'birth' ? formatBirth(value) : name === 'phone' ? formatPhone(value) : value,
    }));
  };

  const handleGenderChange = (selectedGender: 'M' | 'F') => {
    setFormData((prev) => ({ ...prev, gender: selectedGender }));
  };

  const handleAgreementChange = (field: 'agreeTerms' | 'agreePrivacy') => {
    setFormData((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async () => {
    const age = calculateAge(formData.birth);
    if (age < 14) {
      setShowUnderageModal(true);
      return;
    }

    let token = signupToken;
    if (!token) {
      token = sessionStorage.getItem('temp_signup_token');
    }

    if (!token) {
      alert('signupToken이 없습니다.');
      navigate('/login');
      return;
    }

    console.log('회원가입 API 호출, 사용할 토큰:', token);

    setIsSubmitting(true);

    try {
      const requestData = {
        name: formData.name.trim(),
        gender: formData.gender === 'M' ? 'MALE' : 'FEMALE',
        birth: formData.birth.replace(/-/g, '.'),
        nickname: formData.nickname.trim(),
        personalPhone: formData.phone,
      };

      console.log('회원가입 요청 데이터:', requestData);

      const response = await authService.signup(requestData, token);

      console.log('회원가입 응답:', response);

      if (response.success && response.data) {
        const { accessToken, refreshToken } = response.data;

        console.log('추출한 accessToken:', accessToken);
        console.log('추출한 refreshToken:', refreshToken);

        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setShowCompleteModal(true);
      } else {
        throw new Error('accessToken을 받지 못했습니다.');
      }
    } catch (err: any) {
      console.error('===== 회원가입 실패 =====', err);

      const msg =
        err?.response?.data?.error?.message ||
        err?.response?.data?.message ||
        err?.message ||
        '회원가입에 실패했습니다.';

      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCompleteConfirm = () => {
    console.log('=== 회원가입 완료 확인 ===');

    clearSignupToken();
    sessionStorage.removeItem('temp_signup_token');

    navigate('/story', { replace: true });
  };

  const handleGoToParentalConsent = () => {
    setShowUnderageModal(false);
    navigate('/parental-consent', { state: { formData } });
  };

  const isFormComplete = isInfoSetupFormComplete(formData);

  return (
    <div className='flex flex-col h-full bg-bg-purple-50'>
      <TopNav className='bg-bg-purple-50' title='회원가입' showBack />

      <div className='w-full pt-[65px]'>
        <p className='text-fg-primary pre-18-sb-uppercase text-center'>정보설정</p>
      </div>

      <div className='w-full px-7 overflow-y-auto flex-1 pb-[120px]'>
        <div className='space-y-6'>
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

          <FormField label='전화번호'>
            <Input
              type='tel'
              name='phone'
              value={formData.phone}
              onChange={handleInputChange}
              placeholder='010-1234-5678'
              maxLength={13}
              className={INPUT_CLASS}
              autoComplete='off'
            />
          </FormField>

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

      <div className='fixed bottom-0 w-full px-7 pb-8 pt-4 bg-bg-purple-50'>
        <Button
          variant='primary'
          fullWidth
          onClick={handleSubmit}
          disabled={!isFormComplete || isSubmitting}
          className={
            !isFormComplete || isSubmitting ? 'bg-bg-purple-600 hover:bg-bg-purple-600' : ''
          }
        >
          {isSubmitting ? '처리 중...' : '완료'}
        </Button>
      </div>

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
