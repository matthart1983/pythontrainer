export enum LessonDifficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert',
}

export interface Lesson {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  difficulty: LessonDifficulty;
  estimatedTime: number; // in minutes
  orderIndex: number;
  topic: string;
  prerequisites: string[];
  createdAt: string;
  updatedAt: string;
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  completionDate?: string;
  timeSpent: number; // in seconds
}

export interface Exercise {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  starterCode: string;
  testCases: TestCase[];
  hints: string[];
}

export interface TestCase {
  name: string;
  setup?: string;
  assertion: string;
  errorMessage: string;
}
