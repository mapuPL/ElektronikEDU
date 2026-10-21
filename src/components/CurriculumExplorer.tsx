import React from 'react';
import { FileText, Download, ExternalLink, CheckCircle2, Shield, Wrench, Cpu, BookOpen } from 'lucide-react';

export const CurriculumExplorer: React.FC = () => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
            <FileText className="w-4 h-4" />
            <span>DOKUMENTACJA MINISTERIALNA</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Podstawa Programowa Kształcenia w Zawodzie
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Analiza załączonego dokumentu Dziennik Ustaw – Technik Elektronik (Symbol cyfrowy: 311408)
          </p>
        </div>

        <a
          href="/assets/aistudio/technik-elektronik_e3b1b56d.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Otwórz plik PDF (25 stron)</span>
          <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
        </a>
      </div>

      {/* Qualifications Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* ELM.02 */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800">
              KWALIFIKACJA 1
            </span>
            <span className="text-xs font-mono text-slate-400">780 godzin kształcenia</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              ELM.02. Montaż oraz instalowanie układów i urządzeń elektronicznych
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Przygotowuje absolwenta do montażu elementów na PCB, wykonywania instalacji teletechnicznych, uruchamiania układów i przygotowania do recyklingu.
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <p className="font-semibold text-slate-700 dark:text-slate-300">Jednostki efektów kształcenia:</p>
            <div className="space-y-1.5 text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>ELM.02.1. Bezpieczeństwo i higiena pracy (BHP & ESD)</span>
                <span className="font-mono">30 h</span>
              </div>
              <div className="flex justify-between">
                <span>ELM.02.2. Podstawy elektroniki</span>
                <span className="font-mono">180 h</span>
              </div>
              <div className="flex justify-between">
                <span>ELM.02.3. Montaż i demontaż układów (THT & SMD)</span>
                <span className="font-mono">180 h</span>
              </div>
              <div className="flex justify-between">
                <span>ELM.02.4. Wykonywanie instalacji elektronicznych</span>
                <span className="font-mono">360 h</span>
              </div>
              <div className="flex justify-between">
                <span>ELM.02.5. Język obcy zawodowy</span>
                <span className="font-mono">30 h</span>
              </div>
            </div>
          </div>
        </div>

        {/* ELM.05 */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              KWALIFIKACJA 2
            </span>
            <span className="text-xs font-mono text-slate-400">600 godzin kształcenia</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              ELM.05. Eksploatacja urządzeń elektronicznych
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Przygotowuje do użytkowania instalacji i urządzeń, diagnostyki sygnałów i parametrów, konserwacji oraz profesjonalnej naprawy sprzętu.
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <p className="font-semibold text-slate-700 dark:text-slate-300">Jednostki efektów kształcenia:</p>
            <div className="space-y-1.5 text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>ELM.05.1. Bezpieczeństwo i higiena pracy</span>
                <span className="font-mono">30 h</span>
              </div>
              <div className="flex justify-between">
                <span>ELM.05.2. Podstawy elektroniki</span>
                <span className="font-mono">180 h</span>
              </div>
              <div className="flex justify-between">
                <span>ELM.05.3. Użytkowanie urządzeń oraz pomiary</span>
                <span className="font-mono">150 h</span>
              </div>
              <div className="flex justify-between">
                <span>ELM.05.4. Konserwacja i naprawa urządzeń</span>
                <span className="font-mono">210 h</span>
              </div>
              <div className="flex justify-between">
                <span>ELM.05.5. Język obcy zawodowy</span>
                <span className="font-mono">30 h</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Practical Laboratories Specification */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Wrench className="w-4 h-4 text-cyan-500" />
          <span>Wymagane Wyposażenie Pracowni i Laboratoriów (zgodnie z Rozporządzeniem MEiN)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 space-y-2">
            <p className="font-bold text-slate-900 dark:text-white">Laboratorium Elektrotechniki:</p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1 text-[11px]">
              <li>Zasilacze stabilizowane napięcia stałego</li>
              <li>Generatory funkcyjne i arbitralne</li>
              <li>Oscyloskopy cyfrowe dwukanałowe</li>
              <li>Zadajniki stanów logicznych</li>
              <li>Autotransformatory i trenażery</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 space-y-2">
            <p className="font-bold text-slate-900 dark:text-white">Pracownia Montażu (THT/SMD):</p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1 text-[11px]">
              <li>Stacje lutownicze i gorącego powietrza (hot-air)</li>
              <li>Mata i opaska stołowa antystatyczna EPA</li>
              <li>Elektryczne odsysacze i rozlutownice</li>
              <li>Taśmy kaptonowe, topniki w żelu i płynie</li>
              <li>Mikroskopy inspekcyjne do SMD</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 space-y-2">
            <p className="font-bold text-slate-900 dark:text-white">Pracownia Instalacyjna:</p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1 text-[11px]">
              <li>Centrale alarmowe SSWiN i czujki PIR</li>
              <li>Systemy CCTV analogowe i kamery IP PoE</li>
              <li>Multiswitche, zwrotnice, anteny DVB-T2/S2</li>
              <li>Czytniki RFID, kontrolery dostępu KD</li>
              <li>Zabezpieczenia nadprądowe MCB i RCD</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 space-y-2">
            <p className="font-bold text-slate-900 dark:text-white">Laboratorium Eksploatacji:</p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1 text-[11px]">
              <li>Mierniki ESR kondensatorów elektrolitycznych</li>
              <li>Testery sieci komputerowych LAN i DVB</li>
              <li>Spawarki światłowodowe i złącza SC/APC</li>
              <li>Reflektometry optyczne OTDR</li>
              <li>Sterowniki PLC i mikrokontrolery</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
