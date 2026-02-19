export interface Study {
  id: string;
  title: string;
  slug: string;
  description: string;
  createdAt: string;
}

export interface LessonSummary {
  id: string;
  title: string;
  slug: string;
  order: number;
}

export interface StudyDetail extends Study {
  lessons: LessonSummary[];
}

export interface LessonDetail {
  id: string;
  title: string;
  slug: string;
  contentMarkdown: string;
  order: number;
  createdAt: string;
}
