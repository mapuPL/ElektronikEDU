import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Flame, Zap, Sun, Moon, Menu, X, Search, BookOpen, Calculator, GraduationCap } from 'lucide-react';

interface NavbarProps {
  onToggleMobileSidebar: () => void;
  isMobileSidebarOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileSidebar, isMobileSidebarOpen }) => {
  const { stats, currentLevelInfo, toggleTheme, setActiveTab, setSelectedLessonId, setSelectedWorkshopTool } = useApp();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const quickSearchResults = [
    { title: 'Wirtualny Serwisant (Diagnostyka Usterek ELM.05)', type: 'Diagnostyka', tab: 'troubleshooter' as const, id: 'troubleshooter' },
    { title: 'Trener Płytki Stykowej (Breadboard)', type: 'Montaż THT', tab: 'breadboard' as const, id: 'breadboard' },
    { title: 'Wirtualny Oscyloskop i Generator Sygnałowy', type: 'Pomiary', tab: 'workshop' as const, id: 'oscilloscope' },
    { title: 'Prawo Ohma i bilans mocy', type: 'Wzór', tab: 'formulas' as const, id: 'f-ohm' },
    { title: 'Dzielnik napięcia', type: 'Lekcja', tab: 'compendium' as const, id: 'lesson-dzielnik-napiecia' },
    { title: 'Kalkulator kodów paskowych rezystorów', type: 'Warsztat', tab: 'workshop' as const, id: 'resistor' },
    { title: 'Ochrona antystatyczna ESD i strefa EPA', type: 'Lekcja', tab: 'compendium' as const, id: 'lesson-esd-epa' },
    { title: 'Symulator bramek logicznych (AND, OR, NOT...)', type: 'Warsztat', tab: 'workshop' as const, id: 'logic' },
    { title: 'Złącza światłowodowe APC / UPC', type: 'Lekcja', tab: 'compendium' as const, id: 'lesson-swiatlowody' },
    { title: 'Oficjalny próbny egzamin CKE', type: 'Egzamin', tab: 'exam' as const, id: 'exam' },
  ].filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSelectResult = (result: typeof quickSearchResults[0]) => {
    setActiveTab(result.tab);
    if (result.tab === 'compendium') {
      setSelectedLessonId(result.id);
    }
    if (result.tab === 'workshop') {
      if (result.id === 'oscilloscope' || result.id === 'resistor' || result.id === 'logic') {
        setSelectedWorkshopTool(result.id as any);
      }
    }
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between gap-4 px-4 sm:px-6 py-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        {/* Left: Mobile Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className="p-2 -ml-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg lg:hidden transition-colors"
            aria-label="Otwórz menu nawigacji"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            onClick={() => {
              setActiveTab('dashboard');
              setSelectedLessonId(null);
            }}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-sm shadow-cyan-500/20">
              <Zap className="w-4 h-4 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white leading-none">
                  ElektronikEdu
                </span>
                <span className="hidden sm:inline-block text-[11px] font-mono text-cyan-600 dark:text-cyan-400">
                  v311408
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-none mt-1">
                Egzamin Zawodowy ELM.02 & ELM.05
              </p>
            </div>
          </button>
        </div>

        {/* Center: Search Trigger */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-1.5 text-xs text-slate-400 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/70 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-lg transition-colors text-left"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Szukaj definicji, wzorów, bramek lub pytań CKE...</span>
            </span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded shadow-xs">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right: Gamification Status & Theme Switch */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Mobile search button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 md:hidden rounded-lg transition-colors"
            aria-label="Szukaj w kompendium"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Streak indicator */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 text-xs font-semibold"
            title={`${stats.streakDays} dni ciągłej nauki z rzędu!`}
          >
            <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
            <span className="tabular-nums font-mono">{stats.streakDays}</span>
            <span className="hidden sm:inline text-[11px] font-normal">dni serii</span>
          </div>

          {/* XP & Level Status */}
          <button
            onClick={() => setActiveTab('gamification')}
            className="flex items-center gap-2.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors text-left"
            title="Kliknij, aby otworzyć profil i ranking klasy"
          >
            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 text-xs font-bold shrink-0">
              {currentLevelInfo.level}
            </div>
            <div className="hidden sm:block text-left">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-800 dark:text-slate-200 leading-none">
                <span className="tabular-nums font-mono font-semibold">{stats.xp}</span>
                <span className="text-amber-500 text-[10px]">XP</span>
              </div>
              <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-300"
                  style={{ width: `${currentLevelInfo.progress}%` }}
                />
              </div>
            </div>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title={stats.theme === 'dark' ? 'Przełącz na jasny motyw' : 'Przełącz na ciemny motyw'}
            aria-label="Przełącz motyw graficzny"
          >
            {stats.theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>
        </div>
      </header>

      {/* Global Quick Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Wpisz hasło (np. rezystor, prawo Ohma, bramka NAND, światłowód, ESD)..."
                className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/60">
              {quickSearchResults.length > 0 ? (
                quickSearchResults.map((res, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectResult(res)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:text-cyan-500">
                        {res.tab === 'compendium' && <BookOpen className="w-4 h-4" />}
                        {res.tab === 'workshop' && <Calculator className="w-4 h-4" />}
                        {res.tab === 'formulas' && <Zap className="w-4 h-4" />}
                        {res.tab === 'exam' && <GraduationCap className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-200">
                          {res.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {res.type}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-cyan-600 dark:text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Otwórz →
                    </span>
                  </button>
                ))
              ) : (
                <div className="p-6 text-center text-sm text-slate-500 dark:text-slate-400">
                  Brak wyników dla &quot;{searchQuery}&quot;. Spróbuj innego hasła.
                </div>
              )}
            </div>

            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span>Wyszukiwarka zintegrowana z programem nauczania ELM.02 i ELM.05</span>
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded">ESC aby zamknąć</kbd>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
