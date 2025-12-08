export interface VerificationCompleteModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  imageSrc?: string;
  message?: string;
  confirmText?: string;
}
