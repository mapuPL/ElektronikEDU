import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Wrench,
  Zap,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Info,
  Check,
  Award,
  AlertTriangle
} from 'lucide-react';

interface BreadboardProblem {
  id: string;
  title: string;
  schematicTitle: string;
  schematicDesc: string;
  flawComponent: 'led' | 'resistor' | 'ground_wire' | 'switch';
  flawDescription: string;
  fixOptions: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export const BreadboardTrainer: React.FC = () => {
  const { addXp, unlockBadge } = useApp();

  const problems: BreadboardProblem[] = useMemo(() => [
    {
      id: 'bb-led-reversed',
      title: 'Zadanie 1: Dioda LED nie świeci po podłączeniu baterii',
      schematicTitle: 'Układ sygnalizacyjny: Bateria 9V → Rezystor 470Ω → Dioda LED → Masa',
      schematicDesc: 'Prąd powinien płynąć od bieguna dodatniego (+), przez rezystor ograniczający prąd, przez diodę LED w kierunku przewodzenia (od Anody do Katody) do bieguna ujemnego (-).',
      flawComponent: 'led',
      flawDescription: 'Dioda LED została wpięta odwrotną biegunowością (Katoda do plusa, Anoda do masy). Złącze p-n jest spolaryzowane zaporowo i blokuje przepływ prądu.',
      fixOptions: [
        { id: 'opt-ok', text: 'Obróć diodę LED o 180° (dłuższa nóżka – Anoda do rezystora, ścięcie/Katoda do masy)', isCorrect: true },
        { id: 'opt-2', text: 'Zwiększ napięcie baterii do 24V', isCorrect: false },
        { id: 'opt-3', text: 'Wymień rezystor na zworkę z czystego drutu (zwarcie)', isCorrect: false },
        { id: 'opt-4', text: 'Układ jest połączony prawidłowo, to wina rozładowanej baterii', isCorrect: false }
      ],
      explanation: 'Dioda półprzewodnikowa LED przewodzi prąd tylko w jednym kierunku: od Anody (dłuższe wyprowadzenie) do Katody (krótsze wyprowadzenie, ścięcie na kołnierzu obudowy). Odwrotne wpięcie powoduje polaryzację zaporową – dioda nie świeci.'
    },
    {
      id: 'bb-resistor-short',
      title: 'Zadanie 2: Rezystor wpięty w te same otwory płytki',
      schematicTitle: 'Dzielnik prądu z zabezpieczeniem rezystancyjnym',
      schematicDesc: 'Rezystor ma za zadanie ograniczyć prąd płynący przez diodę do bezpiecznej wartości 15 mA. Obie jego końcówki muszą znajdować się w RÓŻNYCH węzłach.',
      flawComponent: 'resistor',
      flawDescription: 'Obie końcówki rezystora zostały wpięte w ten sam wiersz (rząd 15, otwory 15a i 15c). Ponieważ 5 otworów w jednym rzędzie jest wewnętrznie połączonych metalową blaszką, rezystor został zwarty sam ze sobą!',
      fixOptions: [
        { id: 'opt-res-fix', text: 'Przełóż drugą nóżkę rezystora do innego rzędu (np. z rzędu 15 do rzędu 20)', isCorrect: true },
        { id: 'opt-res-2', text: 'Zostaw rezystor w rzędzie 15, blaszki w płytce stykowej są izolowane', isCorrect: false },
        { id: 'opt-res-3', text: 'Obróć rezystor o 180 stopni', isCorrect: false },
        { id: 'opt-res-4', text: 'Wepnij rezystor bezpośrednio do szyny plusa i minusa', isCorrect: false }
      ],
      explanation: 'W płytkach stykowych każdy poprzeczny rząd 5 otworów (np. 15a, 15b, 15c, 15d, 15e) jest pod spodem zmostkowany jedną ciągłą blaszką sprężystą. Wpięcie obu nóżek elementu w ten sam rząd zwiera go (R = 0 Ω).'
    },
    {
      id: 'bb-gnd-missing',
      title: 'Zadanie 3: Przerwa w pętli zasilania (brak masy)',
      schematicTitle: 'Obwód zamknięty prądu stałego',
      schematicDesc: 'Każdy obwód elektryczny wymaga zamkniętej pętli od zacisku dodatniego do zacisku ujemnego (masy GND).',
      flawComponent: 'ground_wire',
      flawDescription: 'Czarny przewód powrotny z katody diody LED został wpięty w pusty rząd 28 zamiast w niebieską szynę ujemną (GND) zasilania.',
      fixOptions: [
        { id: 'opt-gnd-fix', text: 'Przełóż końcówkę czarnego przewodu do niebieskiej szyny masy (GND / -)', isCorrect: true },
        { id: 'opt-gnd-2', text: 'Podłącz czarny przewód do czerwonej szyny dodatniej (+)', isCorrect: false },
        { id: 'opt-gnd-3', text: 'Zastąp czarny przewód kondensatorem', isCorrect: false },
        { id: 'opt-gnd-4', text: 'Usuń przewód masy całkowicie', isCorrect: false }
      ],
      explanation: 'Niebieska szyna zasilania po bokach płytki stykowej (oznaczona znakiem minus) stanowi wspólną masę GND. Wpięcie przewodu w izolowany rząd nie zamyka obwodu prądu (rozwarcie, prąd I = 0).'
    }
  ], []);

  const [currentProblemIdx, setCurrentProblemIdx] = useState<number>(0);
  const currentProblem = problems[currentProblemIdx];

  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [selectedFixId, setSelectedFixId] = useState<string | null>(null);
  const [isResolved, setIsResolved] = useState<boolean>(false);
  const [isWrongAttempt, setIsWrongAttempt] = useState<boolean>(false);

  const handleFixSubmit = () => {
    if (!selectedFixId) return;
    const chosen = currentProblem.fixOptions.find((opt) => opt.id === selectedFixId);
    if (chosen && chosen.isCorrect) {
      setIsResolved(true);
      setIsWrongAttempt(false);
      addXp(60, 'Poprawna naprawa błędu montażowego na płytce stykowej!');
      unlockBadge('badge-breadboard');
    } else {
      setIsWrongAttempt(true);
    }
  };

  const handleNextProblem = () => {
    setCurrentProblemIdx((prev) => (prev + 1) % problems.length);
    setSelectedComponent(null);
    setSelectedFixId(null);
    setIsResolved(false);
    setIsWrongAttempt(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & Introduction */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
            <Wrench className="w-4 h-4" />
            <span>INTERAKTYWNY TRENER MONTAŻU THT</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Trener Płytki Stykowej (Breadboard)
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Naucz się bezbłędnie przekładać schematy ideowe na fizyczne połączenia w rzędach a-j i szynach zasilania
          </p>
        </div>

        {/* Task Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          {problems.map((prob, idx) => (
            <button
              key={prob.id}
              onClick={() => {
                setCurrentProblemIdx(idx);
                setSelectedComponent(null);
                setSelectedFixId(null);
                setIsResolved(false);
                setIsWrongAttempt(false);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                currentProblemIdx === idx
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Zadanie {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Circuit Schematic Reference (4 Cols) */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-[11px] font-mono font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-200 dark:border-cyan-800">
              Schemat Ideowy (Wzorzec)
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {currentProblem.schematicTitle}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {currentProblem.schematicDesc}
            </p>

            {/* Schematic SVG */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-center py-6">
              <svg viewBox="0 0 240 180" className="w-full max-w-[220px] text-slate-300">
                {/* Loop Wire */}
                <rect x="30" y="30" width="180" height="120" rx="4" fill="none" stroke="#475569" strokeWidth="2.5" />

                {/* Battery Source */}
                <rect x="15" y="75" width="30" height="30" rx="2" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
                <text x="30" y="94" className="text-[10px] font-mono fill-cyan-400 font-bold" textAnchor="middle">+9V</text>

                {/* Resistor R1 (Top) */}
                <line x1="85" y1="30" x2="155" y2="30" stroke="#047857" strokeWidth="6" />
                <text x="120" y="22" className="text-[10px] font-mono fill-emerald-400 font-bold" textAnchor="middle">R = 470 Ω</text>

                {/* LED (Right) */}
                <polygon points="210,75 210,105 195,90" fill={isResolved ? '#22c55e' : '#dc2626'} stroke="white" strokeWidth="1.5" />
                <line x1="195" y1="75" x2="195" y2="105" stroke="white" strokeWidth="2" />
                <text x="218" y="94" className="text-[10px] font-mono fill-slate-300">LED</text>

                {/* Switch (Bottom) */}
                <circle cx="100" cy="150" r="3" fill="#f59e0b" />
                <circle cx="140" cy="150" r="3" fill="#f59e0b" />
                <line x1="100" y1="150" x2="135" y2="138" stroke="#f59e0b" strokeWidth="2" />
                <text x="120" y="170" className="text-[10px] font-mono fill-amber-400" textAnchor="middle">Włącznik S1</text>
              </svg>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <p className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-cyan-500" />
              Budowa wewnętrzna płytki:
            </p>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Pionowe szyny zasilające (+) i (-) biegną przez całą długość płytki. Poziome rzędy a-e oraz f-j są zwarte w grupach po 5 otworów, oddzielone rowkiem środkowym.
            </p>
          </div>
        </div>

        {/* Right: Interactive Breadboard Canvas & Inspector (8 Cols) */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Fizyczny Montaż na Płytce Stykowej
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Kliknij na elementy lub przewody, aby sprawdzić ich wpięcie w otwory (a-j, 1-30)
              </p>
            </div>
            {isResolved && (
              <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full flex items-center gap-1 border border-emerald-500/30">
                <Check className="w-3.5 h-3.5" />
                Układ Działa! LED Świeci!
              </span>
            )}
          </div>

          {/* Breadboard Visual SVG */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-center overflow-x-auto shadow-inner">
            <svg viewBox="0 0 620 280" className="w-full min-w-[580px] select-none">
              {/* Breadboard White Plastic Enclosure */}
              <rect x="10" y="10" width="600" height="260" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="3" />

              {/* Power Rail Top (Red + and Blue -) */}
              <line x1="30" y1="30" x2="590" y2="30" stroke="#ef4444" strokeWidth="2" strokeDasharray="6 3" />
              <line x1="30" y1="50" x2="590" y2="50" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6 3" />
              <text x="20" y="34" className="text-[10px] font-bold fill-red-600 font-mono">+</text>
              <text x="20" y="54" className="text-[10px] font-bold fill-blue-600 font-mono">-</text>

              {/* Power Rail Holes Top */}
              {Array.from({ length: 25 }).map((_, i) => (
                <g key={`top-pwr-${i}`}>
                  <circle cx={45 + i * 22} cy={30} r="3" fill="#334155" />
                  <circle cx={45 + i * 22} cy={50} r="3" fill="#334155" />
                </g>
              ))}

              {/* Central Divider Trough */}
              <rect x="25" y="136" width="570" height="8" rx="2" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />

              {/* Terminal Strip Rows a-e (Top) and f-j (Bottom) */}
              {Array.from({ length: 25 }).map((_, colIdx) => {
                const x = 45 + colIdx * 22;
                const rowNumber = colIdx + 1;

                return (
                  <g key={`col-${colIdx}`}>
                    {/* Column number label */}
                    {rowNumber % 5 === 0 && (
                      <text x={x} y={68} className="text-[8px] font-mono fill-slate-400" textAnchor="middle">
                        {rowNumber}
                      </text>
                    )}

                    {/* Holes a, b, c, d, e */}
                    <circle cx={x} cy={78} r="3" fill="#475569" />
                    <circle cx={x} cy={90} r="3" fill="#475569" />
                    <circle cx={x} cy={102} r="3" fill="#475569" />
                    <circle cx={x} cy={114} r="3" fill="#475569" />
                    <circle cx={x} cy={126} r="3" fill="#475569" />

                    {/* Holes f, g, h, i, j */}
                    <circle cx={x} cy={154} r="3" fill="#475569" />
                    <circle cx={x} cy={166} r="3" fill="#475569" />
                    <circle cx={x} cy={178} r="3" fill="#475569" />
                    <circle cx={x} cy={190} r="3" fill="#475569" />
                    <circle cx={x} cy={202} r="3" fill="#475569" />
                  </g>
                );
              })}

              {/* Bottom Power Rail */}
              <line x1="30" y1="225" x2="590" y2="225" stroke="#ef4444" strokeWidth="2" strokeDasharray="6 3" />
              <line x1="30" y1="245" x2="590" y2="245" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6 3" />
              <text x="20" y="229" className="text-[10px] font-bold fill-red-600 font-mono">+</text>
              <text x="20" y="249" className="text-[10px] font-bold fill-blue-600 font-mono">-</text>

              {/* ================= COMPONENT 1: BATTERY SNAP ================= */}
              {/* Red VCC Wire */}
              <path d="M 15 15 C 30 10, 40 20, 45 30" stroke="#dc2626" strokeWidth="4" fill="none" strokeLinecap="round" />
              {/* Black GND Wire */}
              <path
                d={
                  currentProblem.flawComponent === 'ground_wire' && !isResolved
                    ? 'M 15 260 C 100 270, 300 240, 375 202' // Faulty: into pin 16j instead of blue rail!
                    : 'M 15 260 C 100 270, 300 260, 45 50' // Correct into GND rail
                }
                stroke="#1e293b"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                className="cursor-pointer hover:stroke-cyan-500"
                onClick={() => setSelectedComponent('ground_wire')}
              />

              {/* ================= COMPONENT 2: RESISTOR ================= */}
              {/* Resistor wire from red rail (x=45, y=30) to pin 5c (x=133, y=102) */}
              <g className="cursor-pointer" onClick={() => setSelectedComponent('resistor')}>
                {currentProblem.flawComponent === 'resistor' && !isResolved ? (
                  // Faulty: Both leads in row 8 (x=199, y=90 and x=199, y=114 - SHORTED!)
                  <g>
                    <path d="M 45 30 L 199 78" stroke="#f59e0b" strokeWidth="3" fill="none" />
                    <rect x="187" y="85" width="24" height="20" rx="3" fill="#d97706" stroke="#b45309" strokeWidth="1.5" />
                    {/* Short wire back into same col 8 */}
                    <path d="M 199 105 L 199 126" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
                    <text x="225" y="100" className="text-[9px] font-mono fill-red-600 font-bold">R1 ZWARCIE!</text>
                  </g>
                ) : (
                  // Correct placement: Lead 1 in VCC rail, Lead 2 in Row 8
                  <g>
                    <path d="M 45 30 C 80 40, 110 50, 199 78" stroke="#f59e0b" strokeWidth="3" fill="none" />
                    <rect x="110" y="48" width="30" height="14" rx="2" fill="#eedcba" stroke="#b45309" strokeWidth="1" />
                    {/* Bands */}
                    <line x1="116" y1="48" x2="116" y2="62" stroke="#ea580c" strokeWidth="2" />
                    <line x1="122" y1="48" x2="122" y2="62" stroke="#9333ea" strokeWidth="2" />
                    <line x1="128" y1="48" x2="128" y2="62" stroke="#854d0e" strokeWidth="2" />
                    <text x="125" y="42" className="text-[9px] font-mono fill-emerald-700 font-bold" textAnchor="middle">470 Ω</text>
                  </g>
                )}
              </g>

              {/* Jumper wire from Row 8 to Row 14 */}
              <path d="M 199 90 C 230 110, 280 110, 331 90" stroke="#0284c7" strokeWidth="3" fill="none" />

              {/* ================= COMPONENT 3: LED ================= */}
              <g className="cursor-pointer" onClick={() => setSelectedComponent('led')}>
                {/* LED Bulb Graphic at Row 14 & 16 */}
                <circle
                  cx="353"
                  cy="96"
                  r="14"
                  fill={isResolved ? '#22c55e' : '#ef4444'}
                  stroke={isResolved ? '#86efac' : '#fca5a5'}
                  strokeWidth="2"
                  className={isResolved ? 'animate-pulse' : ''}
                />
                <circle cx="353" cy="96" r="6" fill={isResolved ? '#dcfce7' : '#fee2e2'} />

                {/* LED Leads into Row 14 and Row 16 */}
                <path d="M 331 102 L 345 96" stroke="#94a3b8" strokeWidth="2" fill="none" />
                <path d="M 375 102 L 361 96" stroke="#94a3b8" strokeWidth="2" fill="none" />

                {/* Polarity indicators */}
                {currentProblem.flawComponent === 'led' && !isResolved ? (
                  <text x="353" y="125" className="text-[9px] font-mono fill-red-600 font-bold" textAnchor="middle">
                    K (-) ↔ A (+) ODWROTNIE!
                  </text>
                ) : (
                  <text x="353" y="125" className="text-[9px] font-mono fill-emerald-600 font-bold" textAnchor="middle">
                    A (+) → K (-) OK
                  </text>
                )}
              </g>

              {/* Cathode wire from Row 16 to blue GND rail */}
              <path
                d={
                  currentProblem.flawComponent === 'ground_wire' && !isResolved
                    ? 'M 375 114 L 375 202' // dead end
                    : 'M 375 114 C 420 180, 480 200, 375 245' // correctly to ground
                }
                stroke="#1e293b"
                strokeWidth="3"
                fill="none"
              />
            </svg>
          </div>

          {/* Component Inspector & Fix Options */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Wrench className="w-4 h-4 text-cyan-500" />
                <span>Panel Inspekcji Błędów Montażowych</span>
              </span>
              <span className="text-[11px] text-slate-500">
                Wykryty problem w: <strong className="text-cyan-600 dark:text-cyan-400 uppercase">{currentProblem.flawComponent}</strong>
              </span>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300">
              {currentProblem.flawDescription}
            </p>

            {/* Radio options for repair */}
            <div className="space-y-2">
              {currentProblem.fixOptions.map((opt) => (
                <label
                  key={opt.id}
                  onClick={() => !isResolved && setSelectedFixId(opt.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedFixId === opt.id
                      ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-100 font-semibold ring-1 ring-cyan-500'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="fixAction"
                    checked={selectedFixId === opt.id}
                    disabled={isResolved}
                    onChange={() => setSelectedFixId(opt.id)}
                    className="accent-cyan-500 w-4 h-4"
                  />
                  <span>{opt.text}</span>
                </label>
              ))}
            </div>

            {/* Action buttons */}
            {!isResolved ? (
              <button
                disabled={!selectedFixId}
                onClick={handleFixSubmit}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-cyan-500/20 disabled:opacity-50 transition-all"
              >
                Wykonaj Poprawkę na Płytce (+60 XP)
              </button>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500 text-emerald-800 dark:text-emerald-200 text-xs space-y-2 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="font-bold flex items-center gap-1.5 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Sukces! Błąd usunięty, obwód działa poprawnie!
                  </span>
                  <button
                    onClick={handleNextProblem}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors flex items-center gap-1"
                  >
                    <span>Kolejne zadanie</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="leading-relaxed">{currentProblem.explanation}</p>
              </div>
            )}

            {isWrongAttempt && !isResolved && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-500 text-red-800 dark:text-red-200 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                <span>To działanie nie rozwiąże problemu. Zwróć uwagę na kierunek polaryzacji lub zwarcia w rzędach.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
