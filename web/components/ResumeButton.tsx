'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { resumeStudy } from '@/lib/api';

interface Props {
  studyId: string;
  studySlug: string;
}

export default function ResumeButton({ studyId, studySlug }: Props) {
  const { token } = useAuth();
  const router = useRouter();

  if (!token) return null;

  const handleResume = async () => {
    try {
      const data = await resumeStudy(studyId, token);
      router.push(`/estudos/${studySlug}/licoes/${data.lessonSlug}`);
    } catch {
      console.error('Failed to resume');
    }
  };

  return (
    <button
      onClick={handleResume}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Continuar de onde parei
    </button>
  );
}
