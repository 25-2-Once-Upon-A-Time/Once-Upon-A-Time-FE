import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'back';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}
