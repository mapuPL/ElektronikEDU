import React from 'react';
import { useApp, NavigationTab } from '../context/AppContext';
import {
  LayoutDashboard,
  BookOpen,
  Wrench,
  GraduationCap,
  FileSpreadsheet,
  FileText,
  Trophy,
  ChevronRight,
  ExternalLink,
  ShieldAlert,
  Layers
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  id: NavigationTab;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  badge?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const { activeTab, setActiveTab, setSelectedLessonId, stats } = useApp();

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Pulpit Ucznia',
      sublabel: 'Przegląd i statystyki',
      icon: LayoutDashboard
    },
    {
      id: 'compendium',
      label: 'Kompendium Wiedzy',
      sublabel: 'ELM.02 i ELM.05 z PDF',
      icon: BookOpen,
      badge: `${stats.completedLessonIds.length} opan.`
    },
    {
      id: 'troubleshooter',
      label: 'Wirtualny Serwisant',
      sublabel: 'Diagnostyka usterek ELM.05',
      icon: ShieldAlert,
      badge: 'ELM.05'
    },
    {
      id: 'breadboard',
      label: 'Trener Płytki Stykowej',
      sublabel: 'Weryfikacja montażu THT',
      icon: Layers,
      badge: 'Gra'
    },
    {
      id: 'workshop',
      label: 'Warsztat i Symulatory',
      sublabel: 'Ohm, kody, bramki, oscyloskop',
      icon: Wrench
    },
    {
      id: 'exam',
      label: 'Centrum Egzaminacyjne',
      sublabel: 'Arkusze i testy CKE',
      icon: GraduationCap,
      badge: 'CKE'
    },
    {
      id: 'formulas',
      label: 'Wzory i Symbole',
      sublabel: 'Ściągawka i jednostki SI',
      icon: FileSpreadsheet
    },
    {
      id: 'curriculum',
      label: 'Podstawa z PDF',
      sublabel: 'Wymagania ministerialne',
      icon: FileText
    },
    {
      id: 'gamification',
      label: 'Grywalizacja i Klasa',
      sublabel: 'Odznaki i ranking klasy',
      icon: Trophy,
      badge: `${stats.unlockedBadgeIds.length} 🏆`
    }
  ];

  const handleNavClick = (tab: NavigationTab) => {
    setActiveTab(tab);
    if (tab !== 'compendium') {
      setSelectedLessonId(null);
    }
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header inside Sidebar for Mobile/Desktop */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow-sm shadow-emerald-500/20">
              TE
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                Technik Elektronik
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Podstawa Programowa 311408
              </p>
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-semibold text-slate-400 dark:text-slate-400 tracking-wider">
            NAWIGACJA GŁÓWNA
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all group ${
                  isActive
                    ? 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 font-semibold shadow-xs border border-cyan-200/80 dark:border-cyan-800/40'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`p-1.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-cyan-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-medium leading-none truncate">{item.label}</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-400 mt-1 leading-none truncate">
                      {item.sublabel}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  {item.badge && (
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isActive ? 'text-cyan-600 dark:text-cyan-400 translate-x-0.5' : 'text-slate-400 dark:text-slate-400 opacity-40 group-hover:opacity-100'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Qualification Card */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
          <div className="p-3 rounded-xl bg-gradient-to-br from-slate-100 to-white dark:from-slate-800 dark:to-slate-850 border border-slate-200 dark:border-slate-700/80 shadow-xs">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              <span>Kwalifikacje CKE</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">1380h</span>
            </div>
            <div className="space-y-1.5 text-[11px] text-slate-500 dark:text-slate-400">
              <div className="flex justify-between items-center">
                <span className="font-medium text-slate-800 dark:text-slate-200">ELM.02:</span>
                <span>Montaż & instalacje</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-slate-800 dark:text-slate-200">ELM.05:</span>
                <span>Eksploatacja & naprawa</span>
              </div>
            </div>
            <a
              href="/assets/aistudio/technik-elektronik_e3b1b56d.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 w-full flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-medium text-cyan-700 dark:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 rounded-lg transition-colors"
            >
              <span>Oryginalny plik PDF</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};
