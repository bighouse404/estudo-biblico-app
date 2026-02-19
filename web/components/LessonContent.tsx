'use client';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useAuth } from '@/context/AuthContext';
import { markComplete, undoComplete, getStudyProgress } from '@/lib/api';
import { LessonDetail } from '@/lib/types';

interface Props {
  lesson: LessonDetail;
  studySlug: string;
  studyId: string;
}

export default function LessonContent({ lesson, studySlug, studyId }: Props) {
  const { token } = useAuth();
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    getStudyProgress(studyId, token)
      .then((data) => {
        setCompleted(data.completedLessonIds.includes(lesson.id));
      })
      .catch(() => {});
  }, [token, studyId, lesson.id]);

  const handleShare = async () => {
    const url = window.location.href;
    const title = lesson.title;
    if (navigator.share) {
      await navigator.share({ title, url });
    } else {
      await navigator.clipboard.writeText(url);
      alert('Link copiado para a área de transferência!');
    }
  };

  const handleToggleComplete = async () => {
    if (!token) return;
    setLoading(true);
    try {
      if (completed) {
        await undoComplete(lesson.id, token);
        setCompleted(false);
      } else {
        await markComplete(lesson.id, token);
        setCompleted(true);
      }
    } catch {
      console.error('Failed to toggle complete');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex gap-3 mb-6">
        <button
          onClick={handleShare}
          className="px-3 py-1 rounded border dark:border-gray-600 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          Compartilhar
        </button>
        {token && (
          <button
            onClick={handleToggleComplete}
            disabled={loading}
            className={`px-3 py-1 rounded text-sm ${
              completed
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'border dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            {completed ? '✓ Concluída' : 'Marcar como concluída'}
          </button>
        )}
      </div>
      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{lesson.contentMarkdown}</ReactMarkdown>
      </div>
    </div>
  );
}
