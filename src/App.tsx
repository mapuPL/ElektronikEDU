import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ToastContainer } from './components/ToastContainer';
import { Dashboard } from './components/Dashboard';
import { Compendium } from './components/Compendium';
import { Workshop } from './components/Workshop';
import { ExamCenter } from './components/ExamCenter';
import { FormulasReference } from './components/FormulasReference';
import { CurriculumExplorer } from './components/CurriculumExplorer';
import { Gamification } from './components/Gamification';
import { VirtualTroubleshooter } from './components/VirtualTroubleshooter';
import { BreadboardTrainer } from './components/BreadboardTrainer';

const MainLayout: React.FC = () => {
  const { activeTab } = useApp();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        isMobileSidebarOpen={isMobileSidebarOpen}
      />

      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        <Sidebar
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'compendium' && <Compendium />}
          {activeTab === 'troubleshooter' && <VirtualTroubleshooter />}
          {activeTab === 'breadboard' && <BreadboardTrainer />}
          {activeTab === 'workshop' && <Workshop />}
          {activeTab === 'exam' && <ExamCenter />}
          {activeTab === 'formulas' && <FormulasReference />}
          {activeTab === 'curriculum' && <CurriculumExplorer />}
          {activeTab === 'gamification' && <Gamification />}
        </main>
      </div>

      <ToastContainer />

      {/* Subtle Engineering Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-500 dark:text-slate-400 py-4 px-6 text-center">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            ElektronikEdu · Platforma Przygotowawcza do Egzaminu Zawodowego (Kwalifikacje ELM.02 & ELM.05 / 311408)
          </p>
          <p className="font-mono text-[11px] text-slate-400">
            Zgodne z podstawą programową MEN i arkuszami CKE
          </p>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
