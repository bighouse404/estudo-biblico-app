import Link from 'next/link';
import { fetchStudies } from '@/lib/api';
import { Study } from '@/lib/types';

export default async function HomePage() {
  let studies: Study[] = [];
  try {
    studies = await fetchStudies();
  } catch {
    // API may not be running
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Estudos Bíblicos</h1>
      {studies.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">Nenhum estudo disponível no momento.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {studies.map((study) => (
            <Link
              key={study.id}
              href={`/estudos/${study.slug}`}
              className="block p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{study.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{study.description}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
