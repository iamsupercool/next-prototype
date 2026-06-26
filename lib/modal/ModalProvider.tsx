'use client';

import { usePathname } from 'next/navigation';
import { createContext, useContext, useEffect } from 'react';

import { cn } from '@/lib/utils';

import { useModalStore } from './store';
import type { DimMode, ModalProviderProps } from './types';

interface ModalConfig {
  dimMode: DimMode;
  zIndexBase: number;
}

const ModalConfigContext = createContext<ModalConfig>({
  dimMode: 'global',
  zIndexBase: 1000,
});

export const useModalConfig = () => useContext(ModalConfigContext);

const mobilePositionClass = {
  center: 'fixed inset-0 flex items-center justify-center',
  bottom: 'fixed inset-x-0 bottom-0 flex justify-center sm:inset-0 sm:items-center',
  full: 'fixed inset-0',
};

export function ModalProvider({
  children,
  dimMode = 'global',
  zIndexBase = 1000,
}: ModalProviderProps) {
  const modals = useModalStore((s) => s.modals);
  const close = useModalStore((s) => s.close);
  const closeAll = useModalStore((s) => s.closeAll);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = modals.length > 0 ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [modals.length]);

  useEffect(() => {
    closeAll();
  }, [pathname, closeAll]);

  return (
    <ModalConfigContext.Provider value={{ dimMode, zIndexBase }}>
      {children}

      {dimMode === 'global' && modals.length > 0 && (
        <div
          className="fixed inset-0 bg-black/50"
          style={{ zIndex: zIndexBase }}
          onClick={() => {
            const last = modals[modals.length - 1];
            if (last?.options?.dimClosable !== false) close(last.id);
          }}
        />
      )}

      {modals.map((modal, index) => {
        const isPerModal = dimMode === 'per-modal';
        const showDim = isPerModal && modal.options?.dim !== false;

        // per-modal: dim=zIndexBase+i*2, modal=zIndexBase+i*2+1
        // global:    modal=zIndexBase+1+i (dim is always at zIndexBase)
        const dimZ = zIndexBase + index * 2;
        const modalZ = isPerModal ? zIndexBase + index * 2 + 1 : zIndexBase + 1 + index;

        const containerClass = mobilePositionClass[modal.options?.mobilePosition ?? 'center'];

        return (
          <div key={modal.id}>
            {showDim && (
              <div
                className="fixed inset-0 bg-black/50"
                style={{ zIndex: dimZ }}
                onClick={() => {
                  if (modal.options?.dimClosable !== false) close(modal.id);
                }}
              />
            )}
            <div
              className={cn(containerClass, 'pointer-events-none')}
              style={{ zIndex: modalZ }}
            >
              <div className="pointer-events-auto">{modal.component}</div>
            </div>
          </div>
        );
      })}
    </ModalConfigContext.Provider>
  );
}
