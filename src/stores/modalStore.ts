import { create } from 'zustand';

interface ModalState {
  isHelpOpen: boolean;
  isExportOpen: boolean;
  openHelp: () => void;
  closeHelp: () => void;
  openExport: () => void;
  closeExport: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isHelpOpen: false,
  isExportOpen: false,
  openHelp: () => set({ isHelpOpen: true }),
  closeHelp: () => set({ isHelpOpen: false }),
  openExport: () => set({ isExportOpen: true }),
  closeExport: () => set({ isExportOpen: false }),
}));