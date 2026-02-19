const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function fetchStudies() {
  const res = await fetch(`${API_URL}/api/studies`);
  if (!res.ok) throw new Error('Failed to fetch studies');
  return res.json();
}

export async function fetchStudy(slug: string) {
  const res = await fetch(`${API_URL}/api/studies/${slug}`);
  if (!res.ok) throw new Error('Failed to fetch study');
  return res.json();
}

export async function fetchLesson(studySlug: string, lessonSlug: string) {
  const res = await fetch(`${API_URL}/api/studies/${studySlug}/lessons/${lessonSlug}`);
  if (!res.ok) throw new Error('Failed to fetch lesson');
  return res.json();
}

export async function register(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Registration failed');
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function markComplete(lessonId: string, token: string) {
  const res = await fetch(`${API_URL}/api/progress/${lessonId}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok && res.status !== 409) throw new Error('Failed to mark complete');
}

export async function undoComplete(lessonId: string, token: string) {
  const res = await fetch(`${API_URL}/api/progress/${lessonId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to undo complete');
}

export async function getStudyProgress(studyId: string, token: string) {
  const res = await fetch(`${API_URL}/api/progress/study/${studyId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to get progress');
  return res.json();
}

export async function resumeStudy(studyId: string, token: string) {
  const res = await fetch(`${API_URL}/api/progress/resume/${studyId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to resume');
  return res.json();
}
