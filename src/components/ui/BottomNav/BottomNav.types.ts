import type { ComponentType, SVGProps } from 'react';

export interface NavItem {
  label: string;
  to: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface BottomNavProps {
  className?: string;
}
