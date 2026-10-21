import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { EXAM_QUESTIONS } from '../data/examQuestions';
import { QuizQuestion, ExamAttempt, QualificationId } from '../types';
import {
  GraduationCap,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  RotateCcw,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Filter,
  Flame,
  Check,
  Zap,
  Bookmark
} from 'lucide-react';

export const ExamCenter: React.FC = () => {
  const {
    selectedExamMode,
    setSelectedExamMode,
    recordQuestionAnswer,
    recordExamResult,
    stats
  } = useApp();

  // Mode: 'training' or 'exam'
  const [filterQual, setFilterQual] = useState<QualificationId>('ALL');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  // Training state
  const [trainingIndex, setTrainingIndex] = useState<number>(0);
  const [trainingShowHint, setTrainingShowHint] = useState<boolean>(false);
  const [trainingAnswers, setTrainingAnswers] = useState<Record<string, number>>({});

  // Exam Simulation state
  const [examActive, setExamActive] = useState<boolean>(false);
  const [examFinished, setExamFinished] = useState<boolean>(false);
  const [examQuestionCount, setExamQuestionCount] = useState<number>(10);
  const [examQuestions, setExamQuestions] = useState<QuizQuestion[]>([]);
  const [examCurrentIndex, setExamCurrentIndex] = useState<number>(0);
  const [examUserAnswers, setExamUserAnswers] = useState<Record<number, number>>({});
  const [examFlagged, setExamFlagged] = useState<Record<number, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(1200); // 20 min default
  const [lastExamResult, setLastExamResult] = useState<ExamAttempt | null>(null);

  // Available categories
  const categories = useMemo(() => {
    const set = new Set(EXAM_QUESTIONS.map((q) => q.category));
    return ['ALL', ...Array.from(set)];
  }, []);

  // Filtered training questions
  const trainingQuestions = useMemo(() => {
    return EXAM_QUESTIONS.filter((q) => {
      if (filterQual !== 'ALL' && q.qualification !== filterQual) return false;
      if (filterCategory !== 'ALL' && q.category !== filterCategory) return false;
      return true;
    });
  }, [filterQual, filterCategory]);

  const activeTrainingQ = trainingQuestions[trainingIndex] || trainingQuestions[0];

  // Timer for official exam
  useEffect(() => {
    if (!examActive || examFinished) return;
    const interval = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          handleFinishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [examActive, examFinished]);

  // Start official exam simulation
  const handleStartExam = (count: number) => {
    let pool = [...EXAM_QUESTIONS];
    if (filterQual !== 'ALL') {
      pool = pool.filter((q) => q.qualification === filterQual);
    }
    // Shuffle pool
    const shuffled = pool.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(count, pool.length));

    setExamQuestions(selected);
    setExamQuestionCount(selected.length);
    setExamCurrentIndex(0);
    setExamUserAnswers({});
    setExamFlagged({});
    setTimeLeftSeconds(selected.length * 90); // 1.5 min per question
    setExamActive(true);
    setExamFinished(false);
  };

  const handleFinishExam = () => {
    setExamActive(false);
    setExamFinished(true);

    let correctCount = 0;
    examQuestions.forEach((q, idx) => {
      if (examUserAnswers[idx] === q.correctAnswer) {
        correctCount++;
        recordQuestionAnswer(q.id, true);
      } else {
        recordQuestionAnswer(q.id, false);
      }
    });

    const percentage = Math.round((correctCount / Math.max(1, examQuestions.length)) * 100);
    const passed = percentage >= 50;

    const attempt: ExamAttempt = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      qualification: filterQual,
      mode: 'exam',
      score: correctCount,
      totalQuestions: examQuestions.length,
      percentage,
      passed,
      timeSpentSeconds: examQuestions.length * 90 - timeLeftSeconds
    };

    setLastExamResult(attempt);
    recordExamResult(attempt);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
            <GraduationCap className="w-4 h-4" />
            <span>CENTRUM EGZAMINACYJNE CKE</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Testy i Arkusze Egzaminu Zawodowego
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Pytania testowe z kwalifikacji ELM.02 i ELM.05 z objaśnieniami krok po kroku
          </p>
        </div>

        {/* Mode Selector */}
        {!examActive && (
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => {
                setSelectedExamMode('training');
                setExamFinished(false);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedExamMode === 'training' && !examFinished
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Tryb Treningowy
            </button>
            <button
              onClick={() => setSelectedExamMode('exam')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedExamMode === 'exam' || examFinished
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Oficjalny Egzamin CKE
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 1. TRYB TRENINGOWY (LEARNING & DRILL)                                      */}
      {/* ========================================================================= */}
      {selectedExamMode === 'training' && !examFinished && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                Kwalifikacja:
              </span>
              {(['ALL', 'ELM.02', 'ELM.05'] as QualificationId[]).map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setFilterQual(q);
                    setTrainingIndex(0);
                  }}
                  className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                    filterQual === q
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {q === 'ALL' ? 'Wszystkie' : q}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Kategoria:
              </span>
              <select
                value={filterCategory}
                onChange={(e) => {
                  setFilterCategory(e.target.value);
                  setTrainingIndex(0);
                }}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c === 'ALL' ? 'Wszystkie kategorie' : c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {activeTrainingQ ? (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              {/* Question Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800">
                    {activeTrainingQ.qualification}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {activeTrainingQ.category}
                  </span>
                  {activeTrainingQ.officialRef && (
                    <>
                      <span className="text-slate-300 dark:text-slate-700">·</span>
                      <span className="text-xs font-mono text-slate-400">
                        {activeTrainingQ.officialRef}
                      </span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                  <span>Pytanie {trainingIndex + 1} z {trainingQuestions.length}</span>
                </div>
              </div>

              {/* Question Text */}
              <p className="text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
                {activeTrainingQ.question}
              </p>

              {/* Options */}
              <div className="space-y-3">
                {activeTrainingQ.options.map((opt, optIdx) => {
                  const userChoice = trainingAnswers[activeTrainingQ.id];
                  const isAnswered = userChoice !== undefined;
                  const isCorrect = optIdx === activeTrainingQ.correctAnswer;
                  const isSelected = userChoice === optIdx;

                  let style =
                    'border-slate-200 dark:border-slate-750 bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 hover:border-cyan-400 hover:bg-white dark:hover:bg-slate-800';

                  if (isAnswered) {
                    if (isCorrect) {
                      style =
                        'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-semibold shadow-xs';
                    } else if (isSelected) {
                      style =
                        'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-100';
                    } else {
                      style = 'border-slate-200 dark:border-slate-800 opacity-50 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isAnswered}
                      onClick={() => {
                        setTrainingAnswers((prev) => ({
                          ...prev,
                          [activeTrainingQ.id]: optIdx
                        }));
                        recordQuestionAnswer(activeTrainingQ.id, isCorrect);
                      }}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-xs sm:text-sm text-left transition-all ${style}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isAnswered && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      )}
                      {isAnswered && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Hint Box (if toggled) */}
              {trainingShowHint && activeTrainingQ.hint && (
                <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5 animate-in fade-in">
                  <HelpCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Podpowiedź do zadania: </span>
                    <span>{activeTrainingQ.hint}</span>
                  </div>
                </div>
              )}

              {/* Explanation after answering */}
              {trainingAnswers[activeTrainingQ.id] !== undefined && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 animate-in fade-in">
                  <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Wyjaśnienie krok po kroku:
                  </p>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {activeTrainingQ.explanation}
                  </p>
                </div>
              )}

              {/* Controls Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <button
                    disabled={trainingIndex === 0}
                    onClick={() => {
                      setTrainingIndex((prev) => Math.max(0, prev - 1));
                      setTrainingShowHint(false);
                    }}
                    className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800"
                    title="Poprzednie pytanie"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    disabled={trainingIndex === trainingQuestions.length - 1}
                    onClick={() => {
                      setTrainingIndex((prev) =>
                        Math.min(trainingQuestions.length - 1, prev + 1)
                      );
                      setTrainingShowHint(false);
                    }}
                    className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800"
                    title="Następne pytanie"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  {activeTrainingQ.hint && (
                    <button
                      onClick={() => setTrainingShowHint(!trainingShowHint)}
                      className="px-3 py-1.5 text-xs text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-lg transition-colors font-medium flex items-center gap-1.5 border border-amber-200 dark:border-amber-800"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>{trainingShowHint ? 'Ukryj podpowiedź' : 'Pokaż podpowiedź'}</span>
                    </button>
                  )}

                  {trainingIndex < trainingQuestions.length - 1 && (
                    <button
                      onClick={() => {
                        setTrainingIndex((prev) => prev + 1);
                        setTrainingShowHint(false);
                      }}
                      className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-1.5"
                    >
                      <span>Następne</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              Brak pytań dla wybranych filtrów. Zmień kwalifikację lub kategorię.
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. OFICJALNY EGZAMIN CKE - START LOBBY                                    */}
      {/* ========================================================================= */}
      {selectedExamMode === 'exam' && !examActive && !examFinished && (
        <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl mx-auto space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/20">
            <GraduationCap className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Symulacja Egzaminu Pisemnego CKE
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              Sprawdź się w warunkach zbliżonych do rzeczywistego egzaminu państwowego. Czas jest odliczany, a poprawność odpowiedzi poznasz dopiero po zakończeniu arkusza.
            </p>
          </div>

          {/* Rules Summary */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-xs text-left space-y-2 text-slate-600 dark:text-slate-300">
            <p className="font-semibold text-slate-900 dark:text-white">Zasady egzaminu:</p>
            <ul className="list-disc list-inside space-y-1 text-[11px]">
              <li>Próg zdawalności CKE wynosi dokładnie <strong>50%</strong> poprawnych odpowiedzi.</li>
              <li>Każde pytanie posiada 4 odpowiedzi (A, B, C, D) i dokładnie jedną poprawną.</li>
              <li>Możesz dowolnie wracać do pytań i oznaczać je do ponownego sprawdzenia.</li>
              <li>Za zdanie egzaminu otrzymujesz <strong>+120 XP</strong> oraz oficjalną odznakę!</li>
            </ul>
          </div>

          {/* Choose Question Count */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Wybierz liczbę pytań w arkuszu:
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { count: 10, time: '15 min', label: 'Szybki test (10)' },
                { count: 20, time: '30 min', label: 'Średni arkusz (20)' },
                { count: EXAM_QUESTIONS.length, time: '60 min', label: `Pełna baza (${EXAM_QUESTIONS.length})` }
              ].map((opt) => (
                <button
                  key={opt.count}
                  onClick={() => setExamQuestionCount(opt.count)}
                  className={`p-3 rounded-xl border text-xs text-center transition-all ${
                    examQuestionCount === opt.count
                      ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-800 dark:text-cyan-200 font-semibold ring-2 ring-cyan-500'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <p className="font-bold">{opt.label}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{opt.time}</p>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleStartExam(examQuestionCount)}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
          >
            Rozpocznij Egzamin CKE
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. AKTYWNY EGZAMIN W TOKU (ACTIVE TEST RUN)                                */}
      {/* ========================================================================= */}
      {examActive && !examFinished && examQuestions[examCurrentIndex] && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Question Card (8 Cols) */}
          <div className="lg:col-span-8 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800">
                  {examQuestions[examCurrentIndex].qualification}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Zadanie {examCurrentIndex + 1} z {examQuestions.length}
                </span>
              </div>

              {/* Flag question button */}
              <button
                onClick={() =>
                  setExamFlagged((prev) => ({
                    ...prev,
                    [examCurrentIndex]: !prev[examCurrentIndex]
                  }))
                }
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg transition-colors ${
                  examFlagged[examCurrentIndex]
                    ? 'bg-amber-500 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{examFlagged[examCurrentIndex] ? 'Oznaczone' : 'Oznacz do sprawdzenia'}</span>
              </button>
            </div>

            <p className="text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
              {examQuestions[examCurrentIndex].question}
            </p>

            {/* Exam Options */}
            <div className="space-y-3">
              {examQuestions[examCurrentIndex].options.map((opt, optIdx) => {
                const isSelected = examUserAnswers[examCurrentIndex] === optIdx;

                return (
                  <button
                    key={optIdx}
                    onClick={() =>
                      setExamUserAnswers((prev) => ({
                        ...prev,
                        [examCurrentIndex]: optIdx
                      }))
                    }
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-xs sm:text-sm text-left transition-all ${
                      isSelected
                        ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-100 font-semibold ring-2 ring-cyan-500/50'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                          isSelected
                            ? 'bg-cyan-600 text-white border-cyan-500'
                            : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Stepper Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                disabled={examCurrentIndex === 0}
                onClick={() => setExamCurrentIndex((prev) => prev - 1)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Poprzednie</span>
              </button>

              {examCurrentIndex < examQuestions.length - 1 ? (
                <button
                  onClick={() => setExamCurrentIndex((prev) => prev + 1)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  <span>Następne pytanie</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleFinishExam}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all"
                >
                  <Check className="w-4 h-4" />
                  <span>Zakończ i oceń arkusz</span>
                </button>
              )}
            </div>
          </div>

          {/* Exam Sidebar with Timer & Question Grid (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Timer Card */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className={`w-5 h-5 ${timeLeftSeconds < 180 ? 'text-red-500 animate-pulse' : 'text-cyan-500'}`} />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Pozostały czas:</span>
              </div>
              <span className={`text-xl font-bold font-mono ${timeLeftSeconds < 180 ? 'text-red-500' : 'text-cyan-600 dark:text-cyan-400'}`}>
                {formatTimer(timeLeftSeconds)}
              </span>
            </div>

            {/* Answer Sheet Navigator Grid */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Karta odpowiedzi:</span>
                <span className="text-slate-400">
                  {Object.keys(examUserAnswers).length} z {examQuestions.length} zazn.
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {examQuestions.map((_, idx) => {
                  const isAnswered = examUserAnswers[idx] !== undefined;
                  const isCurrent = examCurrentIndex === idx;
                  const isFlagged = examFlagged[idx];

                  let btnStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700';

                  if (isCurrent) {
                    btnStyle = 'ring-2 ring-cyan-500 font-bold bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400';
                  } else if (isAnswered) {
                    btnStyle = 'bg-cyan-600 text-white font-semibold border-cyan-500';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => setExamCurrentIndex(idx)}
                      className={`relative p-2 rounded-lg text-xs font-mono border transition-all ${btnStyle}`}
                    >
                      {idx + 1}
                      {isFlagged && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleFinishExam}
                className="w-full mt-2 py-2.5 rounded-xl border border-red-500/40 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-semibold transition-colors"
              >
                Przerwij i zakończ egzamin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. PODSUMOWANIE EGZAMINU (EXAM RESULTS & REVIEW)                           */}
      {/* ========================================================================= */}
      {examFinished && lastExamResult && (
        <div className="space-y-6">
          {/* Result Banner */}
          <div
            className={`p-6 sm:p-8 rounded-2xl border text-white shadow-xl ${
              lastExamResult.passed
                ? 'bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-900 border-emerald-700'
                : 'bg-gradient-to-br from-red-950 via-slate-900 to-slate-900 border-red-800'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold">
                  {lastExamResult.passed ? (
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      OFICJALNY WERDYKT CKE: POZYTYWNY
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-md bg-red-500/20 text-red-300 border border-red-500/30">
                      OFICJALNY WERDYKT CKE: NIEZALICZONY
                    </span>
                  )}
                  <span className="text-slate-400">· Próg: 50%</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  {lastExamResult.passed
                    ? 'Gratulacje! Zdałeś arkusz egzaminacyjny!'
                    : 'Niestety, zabrakło punktów do zaliczenia.'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                  {lastExamResult.passed
                    ? 'Twój wynik przekroczył wymagany przez Okręgową Komisję Egzaminacyjną próg 50%. Punkty XP oraz osiągnięcie zostały dopisane do Twojego profilu!'
                    : 'Nie zniechęcaj się! Przejrzyj poniższe błędy, powtórz odpowiednie lekcje w kompendium i spróbuj ponownie.'}
                </p>
              </div>

              {/* Big Score Box */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 text-center shrink-0 min-w-[150px]">
                <p className="text-xs text-slate-400 font-medium">Twój Wynik</p>
                <p className="text-4xl font-extrabold font-mono mt-1 text-white tabular-nums">
                  {lastExamResult.percentage}%
                </p>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  {lastExamResult.score} / {lastExamResult.totalQuestions} pkt
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
              <span className="text-slate-300">
                Czas rozwiązywania: <strong>{Math.floor(lastExamResult.timeSpentSeconds / 60)} min {lastExamResult.timeSpentSeconds % 60} s</strong>
              </span>
              <button
                onClick={() => {
                  setExamFinished(false);
                  setExamActive(false);
                  setSelectedExamMode('exam');
                }}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Rozwiąż nowy arkusz</span>
              </button>
            </div>
          </div>

          {/* Step-by-Step Question Review */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Szczegółowa analiza wszystkich pytań z arkusza:
            </h3>

            <div className="space-y-4">
              {examQuestions.map((q, idx) => {
                const userAns = examUserAnswers[idx];
                const isCorrect = userAns === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border bg-white dark:bg-slate-900 shadow-xs space-y-3 ${
                      isCorrect
                        ? 'border-emerald-200 dark:border-emerald-800/40'
                        : 'border-red-200 dark:border-red-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 font-mono font-bold text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400">
                          {q.qualification} · {q.category}
                        </span>
                      </div>
                      <span
                        className={`text-xs font-semibold flex items-center gap-1 ${
                          isCorrect ? 'text-emerald-500' : 'text-red-500'
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Poprawna (+1 pkt)</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4" />
                            <span>Błędna (0 pkt)</span>
                          </>
                        )}
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {q.question}
                    </p>

                    {/* Options list with highlight */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt, optIdx) => {
                        const isCorrectOption = optIdx === q.correctAnswer;
                        const isUserChoice = userAns === optIdx;

                        let cardClass =
                          'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 text-slate-600 dark:text-slate-400';

                        if (isCorrectOption) {
                          cardClass =
                            'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-semibold';
                        } else if (isUserChoice && !isCorrectOption) {
                          cardClass =
                            'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-200 line-through';
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`p-2.5 rounded-lg border flex items-center justify-between gap-2 ${cardClass}`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold">
                                {String.fromCharCode(65 + optIdx)}.
                              </span>
                              <span>{opt}</span>
                            </div>
                            {isCorrectOption && (
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Detailed CKE Explanation */}
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
                      <strong className="text-slate-900 dark:text-white">Wyjaśnienie: </strong>
                      {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
