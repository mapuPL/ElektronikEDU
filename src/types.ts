export type QualificationId = 'ELM.02' | 'ELM.05' | 'ALL';

export interface LessonContentBlock {
  type: 'text' | 'formula' | 'diagram' | 'table' | 'tip' | 'warning';
  title?: string;
  content: string;
  formula?: string;
  variables?: { symbol: string; name: string; unit: string }[];
  tableData?: { headers: string[]; rows: string[][] };
  diagramType?: 'voltage_divider' | 'ohm_circuit' | 'rectifier' | 'led_resistor' | 'esd_station' | 'logic_gates';
}

export interface QuizQuestion {
  id: string;
  qualification: 'ELM.02' | 'ELM.05';
  category: string; // np. 'BHP i ESD', 'Podstawy elektrotechniki', 'Elementy i układy', 'Montaż THT/SMD', 'Instalacje', 'Pomiary i diagnostyka'
  question: string;
  options: [string, string, string, string];
  correctAnswer: 0 | 1 | 2 | 3; // 0=A, 1=B, 2=C, 3=D
  explanation: string;
  hint?: string;
  schematicSvg?: string;
  officialRef?: string; // np. "ELM.02.2 (3)"
}

export interface Lesson {
  id: string;
  qualificationId: 'ELM.02' | 'ELM.05';
  moduleId: string;
  unitCode: string; // np. 'ELM.02.2'
  title: string;
  durationMinutes: number;
  description: string;
  learningOutcomes: string[]; // z oficjalnego PDF
  blocks: LessonContentBlock[];
  practiceQuestions: QuizQuestion[];
  xpReward: number;
}

export interface ModuleItem {
  id: string;
  qualificationId: 'ELM.02' | 'ELM.05';
  code: string; // np. 'ELM.02.1'
  title: string;
  hours: number;
  description: string;
  lessons: Lesson[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlockedAt?: string;
  category: 'simulator' | 'lessons' | 'exam' | 'streak';
  xpValue: number;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  schoolClass: string;
  xp: number;
  weeklyXp: number;
  avatar: string;
  rank: number;
  badgesCount: number;
  isCurrentUser?: boolean;
}

export interface ExamAttempt {
  id: string;
  date: string;
  qualification: QualificationId;
  mode: 'exam' | 'training';
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  timeSpentSeconds: number;
}

export interface UserStats {
  xp: number;
  level: number;
  streakDays: number;
  lastActiveDate: string;
  completedLessonIds: string[];
  answeredQuestionIds: string[];
  correctQuestionIds: string[];
  unlockedBadgeIds: string[];
  examHistory: ExamAttempt[];
  theme: 'dark' | 'light';
}
