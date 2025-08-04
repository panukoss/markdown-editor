export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  headerAction?: React.ReactNode;
}

export interface Command {
  id: string;
  title: string;
  category: string;
  shortcut?: string;
  action: () => void;
}

export interface CopyStatus {
  [key: string]: 'success' | 'error' | null;
}