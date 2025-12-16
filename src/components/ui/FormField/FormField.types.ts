import type { ReactNode } from 'react';

export interface FormFieldProps {
  /** 필드 라벨 */
  label: string;
  /** 필드 내용 */
  children: ReactNode;
  /** 추가 className */
  className?: string;
}
