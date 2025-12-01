import React from 'react';

export type TextButtonVariant = 'title' | 'subtitle' | 'body' | 'caption' | 'link';

export type TextButtonColor = 'black' | 'gray';

export interface TextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TextButtonVariant;
  color?: TextButtonColor;
}
