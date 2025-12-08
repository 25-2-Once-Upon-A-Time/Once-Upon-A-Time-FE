import type { TermsItem } from '@/constants/termsData';

export interface TermsDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string; // 추가
  termsData: TermsItem[];
}
