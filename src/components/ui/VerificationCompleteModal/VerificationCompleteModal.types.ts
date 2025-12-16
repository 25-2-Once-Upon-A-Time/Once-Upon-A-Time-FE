export interface VerificationCompleteModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onConfirm: () => void;
  imageSrc?: string;
  message?: string;
  confirmText?: string;
}
