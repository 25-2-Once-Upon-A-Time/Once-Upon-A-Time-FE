export interface TopNavProps {
  title: string;
  showBack?: boolean;
  className?: string;
  onBackClick?: () => void | Promise<void>;
}
