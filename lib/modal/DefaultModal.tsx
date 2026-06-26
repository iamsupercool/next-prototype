'use client';

import { X } from 'lucide-react';
import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';

import { useModalStore } from './store';

export interface DefaultModalProps {
  id: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function DefaultModal({
  id,
  title,
  description,
  children,
  confirmLabel = '확인',
  cancelLabel = '취소',
  onConfirm,
  onCancel,
}: DefaultModalProps) {
  const close = useModalStore((s) => s.close);

  const handleClose = () => {
    onCancel?.();
    close(id);
  };

  const handleConfirm = () => {
    onConfirm?.();
    close(id);
  };

  const hasFooter = onConfirm !== undefined || onCancel !== undefined;

  return (
    <div className="bg-background flex w-[calc(100vw-2rem)] max-w-lg flex-col rounded-2xl shadow-xl sm:w-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4">
        <div className="flex flex-col gap-1">
          {title && <h2 className="text-foreground text-lg font-semibold leading-snug">{title}</h2>}
          {description && (
            <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
          )}
        </div>
        <button
          onClick={handleClose}
          className="text-muted-foreground hover:text-foreground hover:bg-muted mt-0.5 shrink-0 rounded-md p-1 transition-colors"
          aria-label="닫기"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Body */}
      {children && (
        <div className="border-border border-t px-6 py-4">
          {children}
        </div>
      )}

      {/* Footer */}
      {hasFooter && (
        <div className="border-border flex justify-end gap-2 border-t px-6 py-4">
          {onCancel !== undefined && (
            <Button variant="outline" size="sm" onClick={handleClose}>
              {cancelLabel}
            </Button>
          )}
          {onConfirm !== undefined && (
            <Button size="sm" onClick={handleConfirm}>
              {confirmLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
