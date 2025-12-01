export interface ErrorToastProps {
  isVisible: boolean;
  message: string;
  onClose?: () => void;
  className?: string;
}
