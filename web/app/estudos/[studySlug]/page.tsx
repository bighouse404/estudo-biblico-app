import Link from 'next/link';
import { fetchStudy } from '@/lib/api';
import { StudyDetail } from '@/lib/types';
import ResumeButton from '@/components/ResumeButton';

export default async function StudyPage({ params }: { params: Promise<{ studySlug: string }> }) {
  const { studySlug } = await params;
  let study: StudyDetail | null = null;
  try {
    study = await fetchStudy(studySlug);
  } catch {
    return <p className="text-red-500">Estudo não encontrado.</p>;
  }

  if (!study) return <p className="text-red-500">Estudo não encontrado.</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{study.title}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{study.description}</p>
      <ResumeButton studyId={study.id} studySlug={study.slug} />
      <h2 className="text-xl font-semibold mb-4 mt-6">Lições</h2>
      <ol className="space-y-2">
        {study.lessons.map((lesson) => (
          <li key={lesson.id}>
            <Link
              href={`/estudos/${studySlug}/licoes/${lesson.slug}`}
              className="flex items-center gap-3 p-3 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <span className="text-gray-500 dark:text-gray-400 text-sm w-6">{lesson.order}.</span>
              <span>{lesson.title}</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
