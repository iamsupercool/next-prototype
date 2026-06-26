'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { TiptapEditor } from '@/components/editor/tiptap-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useModal } from '@/lib/modal';

export default function NewPostPage() {
  const router = useRouter();
  const { openDefaultModal } = useModal();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      openDefaultModal({ title: '제목을 입력해주세요.', confirmLabel: '확인' });
      return;
    }
    if (!content || content === '<p></p>') {
      openDefaultModal({ title: '내용을 입력해주세요.', confirmLabel: '확인' });
      return;
    }

    openDefaultModal({
      title: '게시물 등록',
      description: '게시물을 등록하시겠습니까?',
      confirmLabel: '등록',
      cancelLabel: '취소',
      onCancel: () => {},
      onConfirm: () => {
        openDefaultModal({
          title: '등록되었습니다.',
          confirmLabel: '확인',
          onConfirm: () => router.push('/main'),
        });
      },
    });
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">게시물 등록</h2>
        <p className="text-muted-foreground mt-1 text-sm">새 게시물을 작성하세요.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="title">제목</Label>
          <Input
            id="title"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label>내용</Label>
          <TiptapEditor onChange={setContent} />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            취소
          </Button>
          <Button type="submit">등록</Button>
        </div>
      </form>
    </div>
  );
}
