// 인증 상태 타입
export type VerificationStatus = 'idle' | 'success' | 'failed';

// 인증 메시지 타입
export interface VerificationMessage {
  text: string;
  colorClass: string;
}

// 인증 상태에 따른 메시지 반환 함수
export const getVerificationMessage = (status: VerificationStatus): VerificationMessage | null => {
  if (status === 'idle') return null;

  if (status === 'success') {
    return { text: '인증되었습니다.', colorClass: 'text-fg-blue' };
  }

  return { text: '인증되지 않았습니다.', colorClass: 'text-fg-error' };
};
