import { create } from 'zustand';

interface ModalState {
  isHelpOpen: boolean;
  isExportOpen: boolean;
  isCopyOpen: boolean;
  isCommandPaletteOpen: boolean;
  openHelp: () => void;
  closeHelp: () => void;
  openExport: () => void;
  closeExport: () => void;
  openCopy: () => void;
  closeCopy: () => void;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isHelpOpen: false,
  isExportOpen: false,
  isCopyOpen: false,
  isCommandPaletteOpen: false,
  openHelp: () => set({ isHelpOpen: true }),
  closeHelp: () => set({ isHelpOpen: false }),
  openExport: () => set({ isExportOpen: true }),
  closeExport: () => set({ isExportOpen: false }),
  openCopy: () => set({ isCopyOpen: true }),
  closeCopy: () => set({ isCopyOpen: false }),
  openCommandPalette: () => set({ isCommandPaletteOpen: true }),
  closeCommandPalette: () => set({ isCommandPaletteOpen: false }),
}));