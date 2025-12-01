export interface DownloadToastProps {
  isVisible: boolean;
  progress?: number; // 0-100 사이 값
  onClose?: () => void;
  className?: string;
}
