import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CURRICULUM_MODULES } from '../data/curriculumData';
import { Lesson, LessonContentBlock } from '../types';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Zap,
  Search,
  Filter,
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  Lightbulb,
  Check,
  Award,
  Sliders,
  Sparkles,
  FileText
} from 'lucide-react';

export const Compendium: React.FC = () => {
  const {
    stats,
    selectedLessonId,
    setSelectedLessonId,
    completeLesson,
    recordQuestionAnswer
  } = useApp();

  const [selectedQualification, setSelectedQualification] = useState<'ALL' | 'ELM.02' | 'ELM.05'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [interactiveUwe, setInteractiveUwe] = useState(12);
  const [interactiveR1, setInteractiveR1] = useState(10); // kΩ
  const [interactiveR2, setInteractiveR2] = useState(10); // kΩ

  // Flatten lessons for linear navigation
  const allLessons = useMemo(() => {
    return CURRICULUM_MODULES.flatMap((m) => m.lessons);
  }, []);

  // Filtered modules
  const filteredModules = useMemo(() => {
    return CURRICULUM_MODULES.filter((m) => {
      if (selectedQualification !== 'ALL' && m.qualificationId !== selectedQualification) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesModule =
          m.title.toLowerCase().includes(query) ||
          m.code.toLowerCase().includes(query) ||
          m.description.toLowerCase().includes(query);
        const matchesLesson = m.lessons.some(
          (l) =>
            l.title.toLowerCase().includes(query) ||
            l.description.toLowerCase().includes(query) ||
            l.learningOutcomes.some((lo) => lo.toLowerCase().includes(query))
        );
        return matchesModule || matchesLesson;
      }
      return true;
    });
  }, [selectedQualification, searchQuery]);

  // Current active lesson
  const currentLesson: Lesson | undefined = useMemo(() => {
    if (!selectedLessonId) return undefined;
    return allLessons.find((l) => l.id === selectedLessonId);
  }, [selectedLessonId, allLessons]);

  const currentIndex = currentLesson ? allLessons.findIndex((l) => l.id === currentLesson.id) : -1;
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex >= 0 && currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const isCurrentCompleted = currentLesson ? stats.completedLessonIds.includes(currentLesson.id) : false;

  const handleQuizOptionClick = (questionId: string, optionIdx: number, correctIdx: number) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
    recordQuestionAnswer(questionId, optionIdx === correctIdx);
  };

  const interactiveUwy = useMemo(() => {
    const r1 = interactiveR1 * 1000;
    const r2 = interactiveR2 * 1000;
    if (r1 + r2 === 0) return 0;
    return Number(((interactiveUwe * r2) / (r1 + r2)).toFixed(2));
  }, [interactiveUwe, interactiveR1, interactiveR2]);

  // Render Lesson Content Block
  const renderBlock = (block: LessonContentBlock, idx: number) => {
    switch (block.type) {
      case 'text':
        return (
          <div key={idx} className="space-y-2">
            {block.title && (
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {block.title}
              </h4>
            )}
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {block.content}
            </p>
          </div>
        );

      case 'formula':
        return (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 shadow-sm space-y-3"
          >
            {block.title && (
              <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                {block.title}
              </p>
            )}
            <div className="p-3 rounded-lg bg-slate-950 font-mono text-center text-base sm:text-lg text-cyan-300 overflow-x-auto">
              {block.formula}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{block.content}</p>
            {block.variables && (
              <div className="pt-2 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {block.variables.map((v, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-400 bg-slate-800 px-1.5 py-0.5 rounded">
                      {v.symbol}
                    </span>
                    <span className="text-slate-300">{v.name}:</span>
                    <span className="text-slate-400 font-mono text-[11px]">{v.unit}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'diagram':
        return (
          <div
            key={idx}
            className="p-5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 space-y-3"
          >
            {block.title && (
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-500" />
                <span>{block.title}</span>
              </h4>
            )}

            {/* Interactive schematic for voltage divider */}
            {block.diagramType === 'voltage_divider' && (
              <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  {/* Schematic SVG */}
                  <div className="w-full md:w-1/2 flex justify-center">
                    <svg viewBox="0 0 280 180" className="w-64 h-40 text-slate-700 dark:text-slate-300">
                      {/* Top wire from Uwe */}
                      <line x1="40" y1="30" x2="140" y2="30" stroke="currentColor" strokeWidth="2.5" />
                      <circle cx="40" cy="30" r="4" fill="currentColor" />
                      <text x="15" y="34" className="text-[12px] font-mono fill-current font-bold">+ {interactiveUwe}V</text>

                      {/* Resistor R1 */}
                      <line x1="140" y1="30" x2="140" y2="45" stroke="currentColor" strokeWidth="2.5" />
                      <rect x="125" y="45" width="30" height="35" rx="3" fill="#0284c7" fillOpacity="0.2" stroke="#0284c7" strokeWidth="2" />
                      <text x="165" y="66" className="text-[11px] font-mono fill-current font-semibold">R1 = {interactiveR1} kΩ</text>

                      {/* Node between R1 and R2 */}
                      <line x1="140" y1="80" x2="140" y2="105" stroke="currentColor" strokeWidth="2.5" />
                      <circle cx="140" cy="92" r="5" fill="#06b6d4" />
                      
                      {/* Output branch to Uwy */}
                      <line x1="140" y1="92" x2="220" y2="92" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="4 2" />
                      <circle cx="220" cy="92" r="4" fill="#06b6d4" />
                      <text x="230" y="96" className="text-[12px] font-mono font-bold fill-cyan-500">
                        Uwy = {interactiveUwy} V
                      </text>

                      {/* Resistor R2 */}
                      <rect x="125" y="105" width="30" height="35" rx="3" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
                      <text x="165" y="126" className="text-[11px] font-mono fill-current font-semibold">R2 = {interactiveR2} kΩ</text>

                      {/* Bottom GND */}
                      <line x1="140" y1="140" x2="140" y2="160" stroke="currentColor" strokeWidth="2.5" />
                      <line x1="120" y1="160" x2="160" y2="160" stroke="currentColor" strokeWidth="2.5" />
                      <line x1="128" y1="165" x2="152" y2="165" stroke="currentColor" strokeWidth="2" />
                      <line x1="135" y1="170" x2="145" y2="170" stroke="currentColor" strokeWidth="1.5" />
                      <text x="140" y="178" className="text-[9px] font-mono fill-slate-400 text-anchor-middle">GND (0V)</text>
                    </svg>
                  </div>

                  {/* Interactive sliders */}
                  <div className="w-full md:w-1/2 space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between text-slate-600 dark:text-slate-400 font-medium mb-1">
                        <span>Napięcie wejściowe Uwe:</span>
                        <span className="font-mono font-bold text-slate-900 dark:text-white">{interactiveUwe} V</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="48"
                        value={interactiveUwe}
                        onChange={(e) => setInteractiveUwe(Number(e.target.value))}
                        className="w-full accent-cyan-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-600 dark:text-slate-400 font-medium mb-1">
                        <span>Górny rezystor R1:</span>
                        <span className="font-mono font-bold text-sky-600 dark:text-sky-400">{interactiveR1} kΩ</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={interactiveR1}
                        onChange={(e) => setInteractiveR1(Number(e.target.value))}
                        className="w-full accent-sky-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-600 dark:text-slate-400 font-medium mb-1">
                        <span>Dolny rezystor R2:</span>
                        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{interactiveR2} kΩ</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={interactiveR2}
                        onChange={(e) => setInteractiveR2(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>

                    <div className="p-2.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 text-[11px] text-cyan-800 dark:text-cyan-300">
                      Zauważ: Gdy R1 = R2, napięcie wyjściowe wynosi dokładnie połowę napięcia zasilania ({interactiveUwe / 2} V)!
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* EPA Station visual */}
            {block.diagramType === 'esd_station' && (
              <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center">
                <svg viewBox="0 0 320 140" className="w-full max-w-sm h-36">
                  {/* Table Surface */}
                  <rect x="40" y="50" width="240" height="14" rx="2" fill="#334155" />
                  <rect x="50" y="44" width="220" height="6" rx="1" fill="#0284c7" /> {/* Antistatic mat */}
                  <text x="160" y="40" className="text-[10px] font-sans fill-cyan-500 font-semibold text-anchor-middle text-center">
                    Mata antystatyczna stołowa (10^6 - 10^9 Ω)
                  </text>

                  {/* Table Legs */}
                  <line x1="60" y1="64" x2="60" y2="120" stroke="#475569" strokeWidth="6" />
                  <line x1="260" y1="64" x2="260" y2="120" stroke="#475569" strokeWidth="6" />

                  {/* EBP Point */}
                  <circle cx="160" cy="57" r="5" fill="#f59e0b" />
                  <text x="160" y="75" className="text-[9px] font-mono fill-amber-500 text-center font-bold">
                    Punkt EBP (1 MΩ)
                  </text>

                  {/* Ground wire */}
                  <path d="M 160 57 L 160 115" stroke="#10b981" strokeWidth="2.5" strokeDasharray="3 2" fill="none" />
                  <line x1="145" y1="115" x2="175" y2="115" stroke="#10b981" strokeWidth="3" />
                  <line x1="150" y1="120" x2="170" y2="120" stroke="#10b981" strokeWidth="2" />
                  <line x1="155" y1="125" x2="165" y2="125" stroke="#10b981" strokeWidth="1.5" />
                  <text x="180" y="125" className="text-[10px] font-mono fill-emerald-500 font-semibold">Uziemienie PE</text>
                </svg>
              </div>
            )}

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{block.content}</p>
          </div>
        );

      case 'table':
        return (
          <div key={idx} className="space-y-2 overflow-x-auto">
            {block.title && (
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {block.title}
              </h4>
            )}
            <p className="text-xs text-slate-500 dark:text-slate-400">{block.content}</p>
            {block.tableData && (
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      {block.tableData.headers.map((h, i) => (
                        <th key={i} className="p-3 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300">
                    {block.tableData.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`p-3 ${cIdx === 0 ? 'font-medium text-slate-900 dark:text-slate-100' : ''}`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );

      case 'tip':
        return (
          <div
            key={idx}
            className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 text-xs space-y-1"
          >
            <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>{block.title || 'Wskazówka Egzaminacyjna'}</span>
            </div>
            <p className="leading-relaxed pl-6">{block.content}</p>
          </div>
        );

      case 'warning':
        return (
          <div
            key={idx}
            className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/60 text-red-900 dark:text-red-200 text-xs space-y-1"
          >
            <div className="flex items-center gap-2 font-bold text-red-800 dark:text-red-300">
              <ShieldAlert className="w-4 h-4 text-red-500" />
              <span>{block.title || 'Ważne Ostrzeżenie'}</span>
            </div>
            <p className="leading-relaxed pl-6">{block.content}</p>
          </div>
        );

      default:
        return null;
    }
  };

  // If a lesson is selected -> Show full reader
  if (currentLesson) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => setSelectedLessonId(null)}
            className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Wróć do listy modułów</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
              {currentLesson.unitCode}
            </span>
            <span className="text-xs font-semibold text-amber-500 flex items-center gap-1 font-mono">
              <Zap className="w-3.5 h-3.5 fill-amber-500" />
              +{currentLesson.xpReward} XP
            </span>
          </div>
        </div>

        {/* Lesson Header Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                  {currentLesson.qualificationId}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {currentLesson.durationMinutes} min czytania
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                {currentLesson.title}
              </h1>
            </div>

            <button
              onClick={() => completeLesson(currentLesson.id, currentLesson.xpReward)}
              className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isCurrentCompleted
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/20'
              }`}
            >
              {isCurrentCompleted ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Ukończona (+{currentLesson.xpReward} XP)</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Oznacz jako ukończoną</span>
                </>
              )}
            </button>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
            {currentLesson.description}
          </p>

          {/* Ministerial Criteria from PDF */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs space-y-1.5">
            <p className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-cyan-500" />
              Efekty kształcenia według Dziennika Ustaw:
            </p>
            <ul className="list-disc list-inside space-y-0.5 text-slate-600 dark:text-slate-400">
              {currentLesson.learningOutcomes.map((lo, i) => (
                <li key={i}>{lo}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Content Blocks */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          {currentLesson.blocks.map((block, idx) => renderBlock(block, idx))}
        </div>

        {/* Practice Questions inside Lesson */}
        {currentLesson.practiceQuestions && currentLesson.practiceQuestions.length > 0 && (
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Sprawdź swoją wiedzę z tej lekcji
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Odpowiedz na pytanie kontrolne, aby utrwalić pojęcia i zdobyć dodatkowe punkty XP.
            </p>

            <div className="space-y-4 pt-2">
              {currentLesson.practiceQuestions.map((q) => {
                const selectedOpt = quizAnswers[q.id];
                const isAnswered = selectedOpt !== undefined;

                return (
                  <div key={q.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                      {q.question}
                    </p>

                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const isCorrect = optIdx === q.correctAnswer;
                        const isSelected = selectedOpt === optIdx;
                        let btnClass = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-cyan-400';

                        if (isAnswered) {
                          if (isCorrect) {
                            btnClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-semibold';
                          } else if (isSelected) {
                            btnClass = 'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-200';
                          } else {
                            btnClass = 'border-slate-200 dark:border-slate-800 opacity-50 text-slate-400';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isAnswered}
                            onClick={() => handleQuizOptionClick(q.id, optIdx, q.correctAnswer)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg border text-xs text-left transition-all ${btnClass}`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 flex items-center justify-center font-mono font-bold text-[10px]">
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{opt}</span>
                            </div>
                            {isAnswered && isCorrect && <Check className="w-4 h-4 text-emerald-500" />}
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 animate-in fade-in">
                        <strong className="text-slate-900 dark:text-white">Komentarz: </strong>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Prev / Next Lesson Navigation Footer */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          {prevLesson ? (
            <button
              onClick={() => {
                setSelectedLessonId(prevLesson.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <div className="text-left hidden sm:block">
                <span className="block text-[10px] text-slate-400 font-normal">Poprzednia lekcja</span>
                <span className="truncate max-w-[180px] block">{prevLesson.title}</span>
              </div>
            </button>
          ) : <div />}

          {nextLesson && (
            <button
              onClick={() => {
                setSelectedLessonId(nextLesson.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:opacity-90 transition-opacity ml-auto"
            >
              <div className="text-right hidden sm:block">
                <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-normal">Następna lekcja</span>
                <span className="truncate max-w-[180px] block">{nextLesson.title}</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Modules List View
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
            <BookOpen className="w-4 h-4" />
            <span>INTERAKTYWNE KOMPENDIUM WIEDZY</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Podstawa Programowa Technika Elektronika
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Materiały zintegrowane z Dziennikiem Ustaw (kwalifikacje ELM.02 i ELM.05)
          </p>
        </div>

        {/* Filter Tabs for Qualifications */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl self-start md:self-auto border border-slate-200 dark:border-slate-700">
          {(['ALL', 'ELM.02', 'ELM.05'] as const).map((qual) => (
            <button
              key={qual}
              onClick={() => setSelectedQualification(qual)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedQualification === qual
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {qual === 'ALL' ? 'Wszystkie działy' : qual}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filtruj lekcje po tytule, pojęciach (np. prawo Ohma, bramki, ESD, światłowód, RCD)..."
          className="w-full pl-10 pr-4 py-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* Modules & Lessons List */}
      <div className="space-y-6">
        {filteredModules.map((module) => (
          <div
            key={module.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
          >
            {/* Module Title Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                    {module.code}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {module.hours} godzin nauczania
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                  {module.title}
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-right max-w-md">
                {module.description}
              </p>
            </div>

            {/* Lessons Grid in this module */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {module.lessons.map((lesson) => {
                const isCompleted = stats.completedLessonIds.includes(lesson.id);

                return (
                  <button
                    key={lesson.id}
                    onClick={() => setSelectedLessonId(lesson.id)}
                    className="flex flex-col justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850 hover:bg-white dark:hover:bg-slate-800 hover:border-cyan-400 dark:hover:border-cyan-700 transition-all text-left group shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                          {lesson.unitCode}
                        </span>
                        <div className="flex items-center gap-2">
                          {isCompleted ? (
                            <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Opanowane
                            </span>
                          ) : (
                            <span className="text-[11px] font-mono text-amber-500 flex items-center gap-0.5">
                              <Zap className="w-3 h-3 fill-amber-500" />
                              +{lesson.xpReward} XP
                            </span>
                          )}
                        </div>
                      </div>

                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                        {lesson.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {lesson.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400 mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-750">
                      <span className="flex items-center gap-1 text-[11px]">
                        <Clock className="w-3 h-3" />
                        {lesson.durationMinutes} min
                      </span>
                      <span className="text-cyan-600 dark:text-cyan-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1 text-[11px]">
                        <span>Rozpocznij lekcję</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
