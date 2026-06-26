'use client';

import type { ReactNode } from 'react';

import { DefaultModal, type DefaultModalProps } from './DefaultModal';
import { useModalStore } from './store';
import type { ModalOptions } from './types';

export function useModal() {
  const { open, close, closeAll } = useModalStore();

  const openModal = (component: ReactNode, options?: ModalOptions): (() => void) => {
    const id = crypto.randomUUID();
    open({ id, component, options });
    return () => close(id);
  };

  const openDefaultModal = (
    props: Omit<DefaultModalProps, 'id'> & { id?: string },
    options?: ModalOptions
  ): (() => void) => {
    const id = props.id ?? crypto.randomUUID();
    open({ id, component: <DefaultModal {...props} id={id} />, options });
    return () => close(id);
  };

  return {
    openModal,
    openDefaultModal,
    closeAll,
  };
}
