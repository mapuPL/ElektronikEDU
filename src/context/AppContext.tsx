import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { UserStats, Badge, LeaderboardUser, ExamAttempt } from '../types';
import { INITIAL_USER_STATS, INITIAL_BADGES, INITIAL_LEADERBOARD, LEVEL_TITLES } from '../data/initialData';

export type NavigationTab = 
  | 'dashboard' 
  | 'compendium' 
  | 'workshop' 
  | 'troubleshooter'
  | 'breadboard'
  | 'exam' 
  | 'formulas' 
  | 'curriculum' 
  | 'gamification';

interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'xp' | 'badge' | 'success' | 'info';
}

interface AppContextType {
  stats: UserStats;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  selectedLessonId: string | null;
  setSelectedLessonId: (id: string | null) => void;
  selectedWorkshopTool: 'ohm' | 'resistor' | 'logic' | 'led' | 'oscilloscope';
  setSelectedWorkshopTool: (tool: 'ohm' | 'resistor' | 'logic' | 'led' | 'oscilloscope') => void;
  selectedExamMode: 'training' | 'exam';
  setSelectedExamMode: (mode: 'training' | 'exam') => void;
  badges: Badge[];
  leaderboard: LeaderboardUser[];
  currentLevelInfo: { level: number; title: string; minXp: number; maxXp: number; progress: number };
  toasts: ToastNotification[];
  removeToast: (id: string) => void;
  addXp: (amount: number, reason: string) => void;
  completeLesson: (lessonId: string, xpReward: number) => void;
  recordQuestionAnswer: (questionId: string, isCorrect: boolean) => void;
  recordExamResult: (attempt: ExamAttempt) => void;
  unlockBadge: (badgeId: string) => void;
  toggleTheme: () => void;
  resetProgress: () => void;
}

const STORAGE_KEY = 'elektronik_edu_stats_v1';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback
    }
    return INITIAL_USER_STATS;
  });

  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [selectedWorkshopTool, setSelectedWorkshopTool] = useState<'ohm' | 'resistor' | 'logic' | 'led' | 'oscilloscope'>('ohm');
  const [selectedExamMode, setSelectedExamMode] = useState<'training' | 'exam'>('training');
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch {
      // Ignore
    }
  }, [stats]);

  // Sync HTML root class for theme
  useEffect(() => {
    const root = document.documentElement;
    if (stats.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [stats.theme]);

  // Calculate Level based on XP
  const currentLevelInfo = useMemo(() => {
    const xp = stats.xp;
    let current = LEVEL_TITLES[0];
    for (const lvl of LEVEL_TITLES) {
      if (xp >= lvl.minXp) {
        current = lvl;
      }
    }
    const span = Math.max(1, current.maxXp - current.minXp);
    const progress = Math.min(100, Math.round(((xp - current.minXp) / span) * 100));
    return {
      level: current.level,
      title: current.title,
      minXp: current.minXp,
      maxXp: current.maxXp,
      progress
    };
  }, [stats.xp]);

  // Push toast notification
  const addToast = (title: string, message: string, type: ToastNotification['type'] = 'info') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const unlockBadge = (badgeId: string) => {
    if (stats.unlockedBadgeIds.includes(badgeId)) return;
    const badgeDef = INITIAL_BADGES.find((b) => b.id === badgeId);
    if (!badgeDef) return;

    setStats((prev) => ({
      ...prev,
      unlockedBadgeIds: [...prev.unlockedBadgeIds, badgeId],
      xp: prev.xp + badgeDef.xpValue
    }));

    addToast(`🏆 Odznaka odblokowana: ${badgeDef.title}`, `+${badgeDef.xpValue} XP - ${badgeDef.description}`, 'badge');
  };

  const addXp = (amount: number, reason: string) => {
    setStats((prev) => {
      const newXp = prev.xp + amount;
      let newLevel = prev.level;
      for (const lvl of LEVEL_TITLES) {
        if (newXp >= lvl.minXp) {
          newLevel = lvl.level;
        }
      }
      return {
        ...prev,
        xp: newXp,
        level: newLevel
      };
    });
    addToast(`+${amount} XP`, reason, 'xp');
  };

  const completeLesson = (lessonId: string, xpReward: number) => {
    if (stats.completedLessonIds.includes(lessonId)) {
      addToast('Lekcja powtórzona', 'Materiał został odświeżony!', 'info');
      return;
    }
    setStats((prev) => ({
      ...prev,
      completedLessonIds: [...prev.completedLessonIds, lessonId],
      xp: prev.xp + xpReward
    }));
    addToast(`Lekcja ukończona!`, `Zdobyto +${xpReward} XP za przyswojenie wiedzy`, 'xp');

    unlockBadge('badge-first-lesson');
    if (stats.completedLessonIds.length + 1 >= 2) {
      unlockBadge('badge-safety');
    }
  };

  const recordQuestionAnswer = (questionId: string, isCorrect: boolean) => {
    setStats((prev) => {
      const alreadyAnswered = prev.answeredQuestionIds.includes(questionId);
      const newAnswered = alreadyAnswered ? prev.answeredQuestionIds : [...prev.answeredQuestionIds, questionId];
      let newCorrect = prev.correctQuestionIds;
      if (isCorrect && !prev.correctQuestionIds.includes(questionId)) {
        newCorrect = [...prev.correctQuestionIds, questionId];
      }
      const xpBonus = isCorrect && !alreadyAnswered ? 15 : 0;
      return {
        ...prev,
        answeredQuestionIds: newAnswered,
        correctQuestionIds: newCorrect,
        xp: prev.xp + xpBonus
      };
    });

    if (isCorrect) {
      addToast('Poprawna odpowiedź!', '+15 XP za rozwiązanie zadania CKE', 'success');
    }
  };

  const recordExamResult = (attempt: ExamAttempt) => {
    setStats((prev) => ({
      ...prev,
      examHistory: [attempt, ...prev.examHistory]
    }));

    if (attempt.passed) {
      addXp(120, `Zdany egzamin CKE (${attempt.percentage}%)`);
      unlockBadge('badge-exam-passed');
    }
    if (attempt.percentage === 100) {
      unlockBadge('badge-perfect');
    }
  };

  const toggleTheme = () => {
    setStats((prev) => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark'
    }));
  };

  const resetProgress = () => {
    setStats(INITIAL_USER_STATS);
    localStorage.removeItem(STORAGE_KEY);
    addToast('Zresetowano postępy', 'Wszystkie dane zostały przywrócone do stanu początkowego.', 'info');
  };

  // Generate dynamic leaderboard with the current user's updated XP
  const leaderboard = useMemo(() => {
    const list = INITIAL_LEADERBOARD.map((u) => {
      if (u.isCurrentUser) {
        return {
          ...u,
          xp: stats.xp,
          weeklyXp: Math.max(120, Math.round(stats.xp * 0.45)),
          badgesCount: stats.unlockedBadgeIds.length
        };
      }
      return u;
    });

    list.sort((a, b) => b.xp - a.xp);
    return list.map((u, idx) => ({ ...u, rank: idx + 1 }));
  }, [stats.xp, stats.unlockedBadgeIds.length]);

  const badges = useMemo(() => {
    return INITIAL_BADGES.map((b) => ({
      ...b,
      unlockedAt: stats.unlockedBadgeIds.includes(b.id) ? 'Zdobyta' : undefined
    }));
  }, [stats.unlockedBadgeIds]);

  return (
    <AppContext.Provider
      value={{
        stats,
        activeTab,
        setActiveTab,
        selectedLessonId,
        setSelectedLessonId,
        selectedWorkshopTool,
        setSelectedWorkshopTool,
        selectedExamMode,
        setSelectedExamMode,
        badges,
        leaderboard,
        currentLevelInfo,
        toasts,
        removeToast,
        addXp,
        completeLesson,
        recordQuestionAnswer,
        recordExamResult,
        unlockBadge,
        toggleTheme,
        resetProgress
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
