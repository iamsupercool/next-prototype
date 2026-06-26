import { create } from 'zustand';

import type { ModalEntry } from './types';

interface ModalStore {
  modals: ModalEntry[];
  open: (entry: ModalEntry) => void;
  close: (id: string) => void;
  closeAll: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modals: [],
  open: (entry) => set((s) => ({ modals: [...s.modals, entry] })),
  close: (id) => set((s) => ({ modals: s.modals.filter((m) => m.id !== id) })),
  closeAll: () => set({ modals: [] }),
}));
