export type ExportFormat = 'pdf' | 'docx' | 'md';

export interface ExportOption {
  format: ExportFormat;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface CopyOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  disabled: boolean;
}