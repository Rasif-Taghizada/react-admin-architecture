 interface AppModalProps {
  open: boolean;
  title?: React.ReactNode;
  width?: number;
  height?: string;
  onOk?: () => void;
  onCancel: () => void;
  footer?: React.ReactNode | null;
  children: React.ReactNode;
  modalStyle?: React.CSSProperties;
}

export type { AppModalProps };