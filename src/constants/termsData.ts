export interface TermsItem {
  title: string;
  content: string | string[];
}

export const SERVICE_TERMS: TermsItem[] = [
  {
    title: '제1조 (목적)',
    content:
      '본 약관은 옛날옛적에 서비스의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.',
  },
  {
    title: '제2조 (정의)',
    content: [
      '1. "서비스"란 회사가 제공하는 동화 생성 및 관련 서비스를 의미합니다.',
      '2. "회원"이란 본 약관에 동의하고 서비스를 이용하는 자를 의미합니다.',
    ],
  },
  {
    title: '제3조 (약관의 효력)',
    content: '본 약관은 서비스를 이용하고자 하는 모든 회원에게 적용됩니다.',
  },
];

export const PRIVACY_TERMS: TermsItem[] = [
  {
    title: '1. 수집하는 개인정보 항목',
    content: [
      '- 필수항목: 이름, 생년월일, 전화번호, 성별, 닉네임',
      '- 법정대리인 정보: 이름, 성별, 관계, 전화번호',
    ],
  },
  {
    title: '2. 개인정보의 수집 및 이용 목적',
    content: ['- 회원 가입 및 관리', '- 만 14세 미만 아동의 법정대리인 동의 확인'],
  },
  {
    title: '3. 개인정보의 보유 및 이용 기간',
    content: '- 회원 탈퇴 시까지 보유 및 이용',
  },
];

export const PARENTAL_PRIVACY_TERMS: TermsItem[] = [
  {
    title: '1. 수집하는 개인정보 항목',
    content: '- 법정대리인 정보: 이름, 성별, 관계, 전화번호',
  },
  {
    title: '2. 개인정보의 수집 및 이용 목적',
    content: ['- 만 14세 미만 아동의 회원가입 시 법정대리인 동의 확인', '- 법정대리인 본인 확인'],
  },
  {
    title: '3. 개인정보의 보유 및 이용 기간',
    content: [
      '- 아동 회원 탈퇴 시까지 보유 및 이용',
      '- 관계 법령에 따른 보존 기간이 있는 경우 해당 기간 동안 보존',
    ],
  },
];
