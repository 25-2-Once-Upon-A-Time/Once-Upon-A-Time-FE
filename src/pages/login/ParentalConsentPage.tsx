import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// 컴포넌트
import { TopNav } from '@/components/ui/TopNav';
import { Input } from '@/components/ui/Input';
import Checkbox from '@/components/ui/Checkbox/Checkbox';
import Button from '@/components/ui/Button/Button';
import TextButton from '@/components/ui/TextButton/TextButton';
import VerificationCompleteModal from '@/components/ui/VerificationCompleteModal';
import TermsDetailModal from '@/components/ui/TermsDetailModal';
import FormField from '@/components/ui/FormField';

// 상수
import { PARENTAL_PRIVACY_TERMS } from '@/constants/termsData';

// 인증 관련
import type { VerificationStatus } from './verification';
import { getVerificationMessage } from './verification';

// 공통 스타일
const INPUT_CLASS = 'border-border-purple bg-bg-purple-800 placeholder:text-fg-gray';
const INLINE_BTN_BASE =
  'absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full text-white pre-14-m transition-colors';
const INLINE_BTN_ACTIVE = 'bg-bg-purple-500 hover:bg-bg-purple-700';
const INLINE_BTN_DISABLED = 'bg-bg-purple-600 cursor-not-allowed';

const ParentalConsentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // InfoSetupPage에서 전달받은 회원가입 데이터
  const childFormData = location.state?.formData;

  // 폼 상태 관리
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    relation: '',
    phone: '',
    verificationCode: '',
    agreePrivacy: false,
  });

  // 인증 상태 관리
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('idle');

  // 모달 상태 관리
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  // 인증 메시지 계산
  const verificationMessage = getVerificationMessage(verificationStatus);

  // 입력 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 성별 선택 핸들러
  const handleGenderChange = (selectedGender: 'M' | 'F') => {
    setFormData((prev) => ({ ...prev, gender: selectedGender }));
  };

  // 인증코드 발송 핸들러
  const handleSendCode = () => {
    if (!formData.phone) return;
    console.log('인증코드 발송:', formData.phone);
    setIsCodeSent(true);
    // TODO: 실제 인증코드 발송 API 호출
  };

  // 인증코드 확인 핸들러
  const handleVerifyCode = () => {
    if (!formData.verificationCode) return;
    console.log('인증코드 확인:', formData.verificationCode);
    // TODO: 실제 인증코드 검증 API 호출 (임시: 1234)
    setVerificationStatus(formData.verificationCode === '1234' ? 'success' : 'failed');
  };

  // 완료 버튼 핸들러
  const handleSubmit = () => {
    console.log('법정대리인 정보:', formData);
    console.log('아동 회원가입 정보:', childFormData);
    setShowCompleteModal(true);
  };

  // 완료 확인 핸들러
  const handleCompleteConfirm = () => {
    setShowCompleteModal(false);
    navigate('/');
  };

  // 폼 완성 여부 체크
  const isFormComplete =
    formData.name !== '' &&
    formData.gender !== '' &&
    formData.relation !== '' &&
    formData.phone !== '' &&
    formData.verificationCode !== '' &&
    verificationStatus === 'success' &&
    formData.agreePrivacy;

  return (
    <div className='flex flex-col h-full bg-bg-purple-50'>
      <TopNav className='bg-bg-purple-50' title='법정대리인 동의' showBack />

      {/* 세부 타이틀 */}
      <div className='w-full pt-[65px]'>
        <p className='text-fg-primary pre-18-sb-uppercase text-center'>
          법정대리인 정보를 입력해주세요
        </p>
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
              placeholder='법정대리인 이름을 입력해주세요'
              className={INPUT_CLASS}
              autoComplete='off'
            />
          </FormField>

          {/* 성별 */}
          <FormField label='성별'>
            <div className='flex gap-12'>
              <Checkbox
                id='parent-gender-female'
                label='여성'
                checked={formData.gender === 'F'}
                onChange={() => handleGenderChange('F')}
              />
              <Checkbox
                id='parent-gender-male'
                label='남성'
                checked={formData.gender === 'M'}
                onChange={() => handleGenderChange('M')}
              />
            </div>
          </FormField>

          {/* 관계 */}
          <FormField label='관계'>
            <Input
              name='relation'
              value={formData.relation}
              onChange={handleInputChange}
              placeholder='예: 부, 모, 법정대리인'
              className={INPUT_CLASS}
              autoComplete='off'
            />
          </FormField>

          {/* 전화번호 */}
          <FormField label='전화번호'>
            <div className='relative'>
              <Input
                type='tel'
                name='phone'
                value={formData.phone}
                onChange={handleInputChange}
                placeholder='01012345678'
                className={`${INPUT_CLASS} pr-24`}
                autoComplete='off'
              />
              <button
                type='button'
                onClick={handleSendCode}
                disabled={!formData.phone}
                className={`${INLINE_BTN_BASE} ${formData.phone ? INLINE_BTN_ACTIVE : INLINE_BTN_DISABLED}`}
              >
                {isCodeSent ? '재발송' : '인증'}
              </button>
            </div>
          </FormField>

          {/* 인증코드 */}
          <FormField label='인증코드'>
            <div className='relative'>
              <Input
                name='verificationCode'
                value={formData.verificationCode}
                onChange={handleInputChange}
                placeholder='인증코드를 입력해주세요'
                className={`${INPUT_CLASS} pr-24`}
                autoComplete='off'
                disabled={!isCodeSent}
              />
              <button
                type='button'
                onClick={handleVerifyCode}
                disabled={!formData.verificationCode}
                className={`${INLINE_BTN_BASE} ${formData.verificationCode ? INLINE_BTN_ACTIVE : INLINE_BTN_DISABLED}`}
              >
                확인
              </button>
            </div>
            {/* 인증 상태 메시지 */}
            {verificationMessage && (
              <p className={`mt-2 pre-11-m text-right ${verificationMessage.colorClass}`}>
                {verificationMessage.text}
              </p>
            )}
          </FormField>

          {/* 약관 동의 */}
          <div className='w-full'>
            <div className='flex items-center justify-between'>
              <Checkbox
                id='agree-privacy'
                label='(필수) 개인정보 수집이용 동의'
                checked={formData.agreePrivacy}
                onChange={() =>
                  setFormData((prev) => ({ ...prev, agreePrivacy: !prev.agreePrivacy }))
                }
              />
              <TextButton
                variant='caption'
                color='gray'
                className='underline'
                onClick={() => setShowTermsModal(true)}
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
          동의 완료
        </Button>
      </div>

      {/* 약관 모달 */}
      <TermsDetailModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        title='개인정보 수집이용 동의'
        subtitle='동의사항'
        termsData={PARENTAL_PRIVACY_TERMS}
      />

      {/* 본인인증 완료 모달 */}
      <VerificationCompleteModal
        isOpen={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        onConfirm={handleCompleteConfirm}
        message={'만 14세 미만 사용자의 법정대리인\n인증을 완료하였습니다.'}
        confirmText='시작하기'
      />
    </div>
  );
};

export default ParentalConsentPage;
