export enum ChallengeDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  EXPERT = 'expert',
}

export enum ChallengeType {
  CODE = 'code',
  QUIZ = 'quiz',
  PROJECT = 'project',
}

export interface Challenge {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: ChallengeDifficulty;
  type: ChallengeType;
  starterCode: string;
  solutionCode?: string;
  testCases: TestCase[];
  hints: string[];
  tags: string[];
  xpReward: number;
  isOfficial: boolean;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TestCase {
  name: string;
  setup?: string;
  assertion: string;
  errorMessage: string;
  hidden?: boolean; // Hidden test cases
}

export interface ChallengeSubmission {
  id: string;
  userId: string;
  challengeId: string;
  code: string;
  passed: boolean;
  testResults: TestResult[];
  timeTaken: number; // in seconds
  submittedAt: string;
}

export interface TestResult {
  testCase: string;
  passed: boolean;
  error?: string;
}

export interface ValidationResult {
  allPassed: boolean;
  results: TestResult[];
}
