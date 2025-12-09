// 인증 상태 타입
export type VerificationStatus = 'idle' | 'success' | 'failed';

// 인증 메시지 타입
export interface VerificationMessage {
  text: string;
  colorClass: string;
}

// 법정대리인 동의 폼 데이터 타입
export interface ParentalConsentFormData {
  name: string;
  gender: string;
  relation: string;
  phone: string;
  verificationCode: string;
  agreePrivacy: boolean;
}

// 법정대리인 동의 폼 초기값
export const INITIAL_PARENTAL_CONSENT_FORM: ParentalConsentFormData = {
  name: '',
  gender: '',
  relation: '',
  phone: '',
  verificationCode: '',
  agreePrivacy: false,
};

// 회원가입 정보설정 폼 데이터 타입
export interface InfoSetupFormData {
  name: string;
  birth: string;
  phone: string;
  gender: string;
  nickname: string;
  agreeTerms: boolean;
  agreePrivacy: boolean;
}

// 회원가입 정보설정 폼 초기값
export const INITIAL_INFO_SETUP_FORM: InfoSetupFormData = {
  name: '',
  birth: '',
  phone: '',
  gender: '',
  nickname: '',
  agreeTerms: false,
  agreePrivacy: false,
};

// 인증 상태에 따른 메시지 반환 함수
export const getVerificationMessage = (status: VerificationStatus): VerificationMessage | null => {
  if (status === 'idle') return null;

  if (status === 'success') {
    return { text: '인증되었습니다.', colorClass: 'text-fg-blue' };
  }

  return { text: '인증되지 않았습니다.', colorClass: 'text-fg-error' };
};

// 법정대리인 동의 폼 완성 여부 체크 함수
export const isParentalConsentFormComplete = (
  formData: ParentalConsentFormData,
  verificationStatus: VerificationStatus,
): boolean => {
  return (
    formData.name !== '' &&
    formData.gender !== '' &&
    formData.relation !== '' &&
    formData.phone !== '' &&
    formData.verificationCode !== '' &&
    verificationStatus === 'success' &&
    formData.agreePrivacy
  );
};

// 회원가입 정보설정 폼 완성 여부 체크 함수
export const isInfoSetupFormComplete = (formData: InfoSetupFormData): boolean => {
  return (
    formData.name !== '' &&
    formData.birth !== '' &&
    formData.phone !== '' &&
    formData.gender !== '' &&
    formData.nickname !== '' &&
    formData.agreeTerms &&
    formData.agreePrivacy
  );
};

// 만 나이 계산 함수
export const calculateAge = (birthDate: string): number => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};
