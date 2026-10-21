import { Badge, LeaderboardUser, UserStats } from '../types';

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge-ohm',
    title: 'Pogromca Prawa Ohma',
    description: 'Skorzystaj z kalkulatora Prawa Ohma i Mocy w warsztacie',
    iconName: 'Zap',
    category: 'simulator',
    xpValue: 40
  },
  {
    id: 'badge-bands',
    title: 'Mistrz Kodów Paskowych',
    description: 'Rozkoduj poprawnie wartość rezystora z kolorowych pasków',
    iconName: 'Palette',
    category: 'simulator',
    xpValue: 40
  },
  {
    id: 'badge-logic',
    title: 'Logiczny Architekt',
    description: 'Przetestuj stany logiczne wszystkich bramek w symulatorze cyfrowym',
    iconName: 'Cpu',
    category: 'simulator',
    xpValue: 40
  },
  {
    id: 'badge-first-lesson',
    title: 'Pierwsze Kroki w Zawodzie',
    description: 'Ukończ swoją pierwszą lekcję w kompendium wiedzy',
    iconName: 'BookOpen',
    category: 'lessons',
    xpValue: 50
  },
  {
    id: 'badge-safety',
    title: 'Adept BHP i ESD',
    description: 'Opanuj moduł dotyczący ochrony antystatycznej oraz bezpieczeństwa pracy',
    iconName: 'ShieldCheck',
    category: 'lessons',
    xpValue: 60
  },
  {
    id: 'badge-exam-passed',
    title: 'Zdany Egzamin CKE',
    description: 'Uzyskaj co najmniej 50% punktów w pełnym teście egzaminacyjnym',
    iconName: 'Award',
    category: 'exam',
    xpValue: 150
  },
  {
    id: 'badge-perfect',
    title: 'Perfekcjonista 100%',
    description: 'Odpowiedz poprawnie na 100% pytań w teście egzaminacyjnym lub quizie',
    iconName: 'CheckCircle2',
    category: 'exam',
    xpValue: 100
  },
  {
    id: 'badge-streak-3',
    title: 'Trzydniowy Zapał',
    description: 'Utrzymaj serię nauki (Streak) przez minimum 3 dni z rzędu',
    iconName: 'Flame',
    category: 'streak',
    xpValue: 80
  }
];

export const INITIAL_USER_STATS: UserStats = {
  xp: 340,
  level: 2,
  streakDays: 4,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessonIds: ['lesson-esd-epa'],
  answeredQuestionIds: ['cke-elm02-01', 'cke-elm02-10'],
  correctQuestionIds: ['cke-elm02-01', 'cke-elm02-10'],
  unlockedBadgeIds: ['badge-first-lesson'],
  examHistory: [
    {
      id: 'mock-attempt-1',
      date: '2026-10-19',
      qualification: 'ELM.02',
      mode: 'training',
      score: 8,
      totalQuestions: 10,
      percentage: 80,
      passed: true,
      timeSpentSeconds: 420
    }
  ],
  theme: 'dark'
};

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  {
    id: 'user-1',
    name: 'Kacper Lewandowski',
    schoolClass: '4 Technikum Elektroniczne',
    xp: 920,
    weeklyXp: 380,
    avatar: 'KL',
    rank: 1,
    badgesCount: 7
  },
  {
    id: 'user-2',
    name: 'Zofia Kowalczyk',
    schoolClass: '4 Technikum Elektroniczne',
    xp: 780,
    weeklyXp: 290,
    avatar: 'ZK',
    rank: 2,
    badgesCount: 6
  },
  {
    id: 'user-current',
    name: 'Uczeń Technikum (Ty)',
    schoolClass: '4 Technikum Elektroniczne',
    xp: 340,
    weeklyXp: 180,
    avatar: 'TY',
    rank: 3,
    badgesCount: 2,
    isCurrentUser: true
  },
  {
    id: 'user-3',
    name: 'Mateusz Zieliński',
    schoolClass: '4 Technikum Elektroniczne',
    xp: 310,
    weeklyXp: 140,
    avatar: 'MZ',
    rank: 4,
    badgesCount: 2
  },
  {
    id: 'user-4',
    name: 'Julia Nowak',
    schoolClass: '4 Technikum Elektroniczne',
    xp: 260,
    weeklyXp: 110,
    avatar: 'JN',
    rank: 5,
    badgesCount: 2
  },
  {
    id: 'user-5',
    name: 'Tomasz Dąbrowski',
    schoolClass: '4 Technikum Elektroniczne',
    xp: 190,
    weeklyXp: 80,
    avatar: 'TD',
    rank: 6,
    badgesCount: 1
  }
];

export interface ResistorColor {
  name: string;
  polishName: string;
  hex: string;
  textDark?: boolean;
  digit?: number;
  multiplier?: number;
  tolerance?: number; // w procentach np. 5 dla 5%
}

export const RESISTOR_COLORS: ResistorColor[] = [
  { name: 'black', polishName: 'Czarny', hex: '#1e293b', digit: 0, multiplier: 1 },
  { name: 'brown', polishName: 'Brązowy', hex: '#854d0e', digit: 1, multiplier: 10, tolerance: 1 },
  { name: 'red', polishName: 'Czerwony', hex: '#dc2626', digit: 2, multiplier: 100, tolerance: 2 },
  { name: 'orange', polishName: 'Pomarańczowy', hex: '#ea580c', digit: 3, multiplier: 1000 },
  { name: 'yellow', polishName: 'Żółty', hex: '#eab308', textDark: true, digit: 4, multiplier: 10000 },
  { name: 'green', polishName: 'Zielony', hex: '#16a34a', digit: 5, multiplier: 100000, tolerance: 0.5 },
  { name: 'blue', polishName: 'Niebieski', hex: '#2563eb', digit: 6, multiplier: 1000000, tolerance: 0.25 },
  { name: 'violet', polishName: 'Fioletowy', hex: '#9333ea', digit: 7, multiplier: 10000000, tolerance: 0.1 },
  { name: 'gray', polishName: 'Szary', hex: '#64748b', digit: 8, multiplier: 100000000, tolerance: 0.05 },
  { name: 'white', polishName: 'Biały', hex: '#f8fafc', textDark: true, digit: 9, multiplier: 1000000000 },
  { name: 'gold', polishName: 'Złoty', hex: '#d97706', multiplier: 0.1, tolerance: 5 },
  { name: 'silver', polishName: 'Srebrny', hex: '#94a3b8', multiplier: 0.01, tolerance: 10 }
];

export const E24_SERIES = [
  1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0,
  3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1
];

export const LEVEL_TITLES = [
  { level: 1, title: 'Nowicjusz / Praktykant', minXp: 0, maxXp: 200 },
  { level: 2, title: 'Młodszy Monter Elektronik', minXp: 200, maxXp: 500 },
  { level: 3, title: 'Technik Elektronik (Adept)', minXp: 500, maxXp: 1000 },
  { level: 4, title: 'Mistrz Serwisu i Diagnostyki', minXp: 1000, maxXp: 2000 },
  { level: 5, title: 'Główny Inżynier Systemów', minXp: 2000, maxXp: 5000 }
];
