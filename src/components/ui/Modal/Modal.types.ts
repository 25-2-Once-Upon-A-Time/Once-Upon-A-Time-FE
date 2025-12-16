export interface ModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  onConfirm?: () => void;
  cancelText?: string;
  confirmText?: string;
}
