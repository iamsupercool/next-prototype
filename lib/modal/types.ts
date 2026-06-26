import type { ReactNode } from 'react';

export type DimMode = 'global' | 'per-modal';
export type MobilePosition = 'center' | 'bottom' | 'full';

export interface ModalOptions {
  dim?: boolean;
  dimClosable?: boolean;
  mobilePosition?: MobilePosition;
}

export interface ModalEntry {
  id: string;
  component: ReactNode;
  options?: ModalOptions;
}

export interface ModalProviderProps {
  children: ReactNode;
  dimMode?: DimMode;
  zIndexBase?: number;
}
