import React from 'react';
import type { FormFieldProps } from './FormField.types';

// 라벨 스타일
const LABEL_CLASS = 'block text-fg-primary pre-16-43-r mb-2';

const FormField: React.FC<FormFieldProps> = ({ label, children, className = '' }) => {
  return (
    <div className={`w-full ${className}`}>
      <label className={LABEL_CLASS}>{label}</label>
      {children}
    </div>
  );
};

export default FormField;
