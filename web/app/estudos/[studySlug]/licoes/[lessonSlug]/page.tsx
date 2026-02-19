import { fetchLesson, fetchStudy } from '@/lib/api';
import { LessonDetail, StudyDetail } from '@/lib/types';
import LessonContent from '@/components/LessonContent';
import Link from 'next/link';

export default async function LessonPage({
  params,
}: {
  params: Promise<{ studySlug: string; lessonSlug: string }>;
}) {
  const { studySlug, lessonSlug } = await params;
  let lesson: LessonDetail | null = null;
  let study: StudyDetail | null = null;

  try {
    [lesson, study] = await Promise.all([
      fetchLesson(studySlug, lessonSlug),
      fetchStudy(studySlug),
    ]);
  } catch {
    return <p className="text-red-500">Lição não encontrada.</p>;
  }

  if (!lesson || !study) return <p className="text-red-500">Lição não encontrada.</p>;

  const currentIndex = study.lessons.findIndex((l) => l.slug === lessonSlug);
  const prevLesson = currentIndex > 0 ? study.lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < study.lessons.length - 1 ? study.lessons[currentIndex + 1] : null;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4">
        <Link href={`/estudos/${studySlug}`} className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
          ← {study.title}
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>
      <LessonContent lesson={lesson} studySlug={studySlug} studyId={study.id} />
      <div className="flex justify-between mt-8 pt-4 border-t dark:border-gray-700">
        {prevLesson ? (
          <Link
            href={`/estudos/${studySlug}/licoes/${prevLesson.slug}`}
            className="px-4 py-2 rounded border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            ← {prevLesson.title}
          </Link>
        ) : <span />}
        {nextLesson ? (
          <Link
            href={`/estudos/${studySlug}/licoes/${nextLesson.slug}`}
            className="px-4 py-2 rounded border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            {nextLesson.title} →
          </Link>
        ) : <span />}
      </div>
    </div>
  );
}
