import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CURRICULUM_MODULES } from '../data/curriculumData';
import { EXAM_QUESTIONS } from '../data/examQuestions';
import {
  Flame,
  Zap,
  BookOpen,
  Award,
  ArrowRight,
  Calculator,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Clock,
  Layers,
  Wrench,
  HelpCircle,
  ShieldAlert,
  Activity
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const {
    stats,
    currentLevelInfo,
    setActiveTab,
    setSelectedLessonId,
    setSelectedWorkshopTool,
    setSelectedExamMode,
    recordQuestionAnswer
  } = useApp();

  // Find daily question (first unanswered or question 0)
  const dailyQuestion = EXAM_QUESTIONS[0];
  const [dailyAnswerSelected, setDailyAnswerSelected] = useState<number | null>(null);
  const [dailyAnswered, setDailyAnswered] = useState(
    stats.answeredQuestionIds.includes(dailyQuestion.id)
  );

  // Compute progress for ELM.02 and ELM.05
  const elm02Lessons = CURRICULUM_MODULES.filter((m) => m.qualificationId === 'ELM.02').flatMap(
    (m) => m.lessons
  );
  const elm05Lessons = CURRICULUM_MODULES.filter((m) => m.qualificationId === 'ELM.05').flatMap(
    (m) => m.lessons
  );

  const elm02Completed = elm02Lessons.filter((l) => stats.completedLessonIds.includes(l.id)).length;
  const elm05Completed = elm05Lessons.filter((l) => stats.completedLessonIds.includes(l.id)).length;

  const elm02Progress = Math.round((elm02Completed / Math.max(1, elm02Lessons.length)) * 100);
  const elm05Progress = Math.round((elm05Completed / Math.max(1, elm05Lessons.length)) * 100);
  const overallProgress = Math.round(
    ((elm02Completed + elm05Completed) / (elm02Lessons.length + elm05Lessons.length)) * 100
  );

  // Next recommended lesson
  const allLessons = [...elm02Lessons, ...elm05Lessons];
  const nextLesson = allLessons.find((l) => !stats.completedLessonIds.includes(l.id)) || allLessons[0];

  const handleDailySubmit = (optionIndex: number) => {
    if (dailyAnswered) return;
    setDailyAnswerSelected(optionIndex);
    setDailyAnswered(true);
    const isCorrect = optionIndex === dailyQuestion.correctAnswer;
    recordQuestionAnswer(dailyQuestion.id, isCorrect);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-800 p-6 md:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
              <Sparkles className="w-4 h-4" />
              <span>PLATFORMA PRZYGOTOWUJĄCA DO EGZAMINU ZAWODOWEGO</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">Technik Elektronik 311408</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              Cześć, przyszły techniku! Gotowy na kolejną dawkę wiedzy?
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Przygotowuj się do egzaminów z kwalifikacji <strong className="text-cyan-300">ELM.02</strong> (Montaż i instalacje) oraz <strong className="text-emerald-300">ELM.05</strong> (Eksploatacja i serwis). Ucz się teorii, trenuj na wirtualnych schematach i rozwiązuj oficjalne arkusze CKE.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => {
                setActiveTab('compendium');
                setSelectedLessonId(nextLesson.id);
              }}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>Kontynuuj naukę</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setActiveTab('exam');
                setSelectedExamMode('exam');
              }}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-sm font-medium transition-colors"
            >
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>Próbny Egzamin CKE</span>
            </button>
          </div>
        </div>

        {/* Next recommended lesson indicator */}
        <div className="relative z-10 mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Polecana następna lekcja:</span>
            <span className="font-semibold text-slate-200">{nextLesson.title}</span>
            <span className="text-slate-600">·</span>
            <span className="text-cyan-400 font-mono">+{nextLesson.xpReward} XP</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>Szacowany czas: {nextLesson.durationMinutes} min</span>
          </div>
        </div>

        {/* Ambient subtle technical glow */}
        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 4 Stats KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 shrink-0">
            <Flame className="w-5 h-5 fill-orange-500 text-orange-500" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Dni serii (Streak)</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white tabular-nums font-mono mt-0.5">
              {stats.streakDays} dni
            </p>
          </div>
        </div>

        {/* Total XP */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shrink-0">
            <Zap className="w-5 h-5 fill-amber-500 text-amber-500" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Punkty Doświadczenia</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white tabular-nums font-mono mt-0.5">
              {stats.xp} <span className="text-xs font-normal text-slate-400">XP</span>
            </p>
          </div>
        </div>

        {/* Solved Questions */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Zadania CKE</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white tabular-nums font-mono mt-0.5">
              {stats.correctQuestionIds.length} <span className="text-xs font-normal text-slate-400">/ {EXAM_QUESTIONS.length}</span>
            </p>
          </div>
        </div>

        {/* Level / Badges */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 shrink-0">
            <Award className="w-5 h-5 text-cyan-500" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Poziom Zawodowy</p>
            <p className="text-base font-bold text-slate-900 dark:text-white truncate mt-0.5">
              Lvl {currentLevelInfo.level} <span className="text-xs font-normal text-slate-400">({stats.unlockedBadgeIds.length} odznak)</span>
            </p>
          </div>
        </div>
      </div>

      {/* Qualification Progress Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* ELM.02 Progress Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                KWALIFIKACJA 1
              </span>
              <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
                {elm02Completed} z {elm02Lessons.length} lekcji
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              ELM.02: Montaż oraz instalowanie układów i urządzeń elektronicznych
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              BHP, ochrona antystatyczna ESD, podstawy elektrotechniki, prawa Ohma i Kirchhoffa, montaż THT/SMD, układy sieci TN-S/TT, instalacje SSWiN, CCTV, domofonowe.
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center text-xs font-medium mb-1.5">
              <span className="text-slate-700 dark:text-slate-300">Stopień opanowania materiału</span>
              <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400 tabular-nums">
                {elm02Progress}%
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${elm02Progress}%` }}
              />
            </div>
            <button
              onClick={() => {
                setActiveTab('compendium');
              }}
              className="mt-3.5 w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-cyan-700 dark:text-cyan-300 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 rounded-lg transition-colors border border-transparent hover:border-cyan-200 dark:hover:border-cyan-800"
            >
              <span>Przeglądaj działy ELM.02</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ELM.05 Progress Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                KWALIFIKACJA 2
              </span>
              <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
                {elm05Completed} z {elm05Lessons.length} lekcji
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              ELM.05: Eksploatacja urządzeń elektronicznych
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Pomiary sygnałów i parametrów, technika światłowodowa (włókna SM/MM, złącza APC), magistrale RS-485, I2C, SPI, diagnostyka zasilaczy impulsowych i kondensatorów ESR.
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center text-xs font-medium mb-1.5">
              <span className="text-slate-700 dark:text-slate-300">Stopień opanowania materiału</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                {elm05Progress}%
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-500"
                style={{ width: `${elm05Progress}%` }}
              />
            </div>
            <button
              onClick={() => {
                setActiveTab('compendium');
              }}
              className="mt-3.5 w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg transition-colors border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800"
            >
              <span>Przeglądaj działy ELM.05</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Daily Question Challenge & Quick Tools Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Challenge Card (2 Cols on lg) */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-500">
                  <Zap className="w-4 h-4 fill-amber-500" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Zadanie Dnia (Arkusz CKE)
                </h3>
              </div>
              <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                {dailyQuestion.officialRef || 'ELM.02'} · +15 XP
              </span>
            </div>

            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-4 leading-relaxed">
              {dailyQuestion.question}
            </p>

            {/* Answer Options */}
            <div className="space-y-2">
              {dailyQuestion.options.map((option, idx) => {
                const isSelected = dailyAnswerSelected === idx;
                const isCorrect = idx === dailyQuestion.correctAnswer;
                let btnStyle =
                  'border-slate-200 dark:border-slate-750 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800';

                if (dailyAnswered) {
                  if (isCorrect) {
                    btnStyle =
                      'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200 font-semibold';
                  } else if (isSelected) {
                    btnStyle =
                      'border-red-500 bg-red-50 dark:bg-red-950/50 text-red-800 dark:text-red-200';
                  } else {
                    btnStyle =
                      'border-slate-200 dark:border-slate-800 opacity-60 text-slate-500 dark:text-slate-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={dailyAnswered}
                    onClick={() => handleDailySubmit(idx)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-all ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 flex items-center justify-center font-mono font-bold text-[11px] shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>
                    {dailyAnswered && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after answer */}
            {dailyAnswered && (
              <div className="mt-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1 animate-in fade-in duration-200">
                <p className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-cyan-500" />
                  Wyjaśnienie eksperta CKE:
                </p>
                <p className="leading-relaxed whitespace-pre-line">{dailyQuestion.explanation}</p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-500 dark:text-slate-400">
              W bazie dostępnych jest <strong>{EXAM_QUESTIONS.length}</strong> zadań z egzaminów
            </span>
            <button
              onClick={() => {
                setActiveTab('exam');
                setSelectedExamMode('training');
              }}
              className="text-cyan-600 dark:text-cyan-400 hover:underline font-medium flex items-center gap-1"
            >
              <span>Więcej zadań</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Workshop Shortcuts Card (1 Col) */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-md bg-cyan-500/10 text-cyan-500">
                <Wrench className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Szybkie Narzędzia Inżynierskie
              </h3>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => {
                  setActiveTab('troubleshooter');
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 transition-colors text-left group"
              >
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-500 transition-colors">
                    Wirtualny Serwisant (ELM.05)
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    Diagnozuj usterki multimetrem na schematach
                  </p>
                </div>
              </button>

              <button
                onClick={() => {
                  setActiveTab('breadboard');
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 transition-colors text-left group"
              >
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500 shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-cyan-500 transition-colors">
                    Trener Płytki Stykowej
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    Wyszukaj błędy montażu i odwrócone diody
                  </p>
                </div>
              </button>

              <button
                onClick={() => {
                  setActiveTab('workshop');
                  setSelectedWorkshopTool('oscilloscope');
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 transition-colors text-left group"
              >
                <div className="p-2 rounded-lg bg-teal-500/10 text-teal-500 shrink-0">
                  <Activity className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-teal-500 transition-colors">
                    Oscyloskop Cyfrowy i Generator
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    Badaj przebiegi Vpp, Vrms i podstawę czasu
                  </p>
                </div>
              </button>

              <button
                onClick={() => {
                  setActiveTab('workshop');
                  setSelectedWorkshopTool('ohm');
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 transition-colors text-left group"
              >
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500 shrink-0">
                  <Calculator className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-cyan-500 transition-colors">
                    Kalkulator Prawa Ohma i Mocy
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    Obliczaj U, I, R, P z podglądem obwodu
                  </p>
                </div>
              </button>

              <button
                onClick={() => {
                  setActiveTab('workshop');
                  setSelectedWorkshopTool('resistor');
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 transition-colors text-left group"
              >
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-500 transition-colors">
                    Dekoder Kodów Paskowych
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    4 i 5 pasków, tolerancja, szereg E24
                  </p>
                </div>
              </button>

              <button
                onClick={() => {
                  setActiveTab('workshop');
                  setSelectedWorkshopTool('logic');
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 transition-colors text-left group"
              >
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500 shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-purple-500 transition-colors">
                    Symulator Bramek Logicznych
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    AND, OR, NOT, NAND, NOR, XOR, XNOR
                  </p>
                </div>
              </button>

              <button
                onClick={() => {
                  setActiveTab('formulas');
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 transition-colors text-left group"
              >
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-amber-500 transition-colors">
                    Kompendium Wzorów i Jednostek
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    Ściągawka przed egzaminem pisemnym
                  </p>
                </div>
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('workshop')}
              className="w-full py-2 text-center text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              Otwórz pełny warsztat z symulatorami →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
