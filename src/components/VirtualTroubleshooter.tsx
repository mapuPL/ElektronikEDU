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
  ShieldCheck,
  AlertTriangle,
  Radio
} from 'lucide-react';

export interface CircuitScenario {
  id: string;
  name: string;
  category: 'Dzielnik Napięcia' | 'Prostownik Diodowy' | 'Klucz Tranzystorowy' | 'Zasilacz Stabilizowany';
  description: string;
  points: { id: string; name: string; x: number; y: number }[];
  nominalValues: {
    title: string;
    description: string;
  };
  faults: {
    id: string;
    title: string;
    isCorrectDiagnosis: boolean;
    getMeasurement: (mode: MultimeterMode, redProbe: string, blackProbe: string) => {
      display: string;
      unit: string;
      beep?: boolean;
    };
    explanation: string;
  }[];
}

type MultimeterMode = 'V_DC' | 'V_AC' | 'OHM' | 'DIODE';

export const VirtualTroubleshooter: React.FC = () => {
  const { addXp, unlockBadge } = useApp();

  // Scenarios definition
  const scenarios: CircuitScenario[] = useMemo(() => [
    {
      id: 'scenario-divider',
      name: 'Dzielnik Rezystancyjny DC (Uwe = 12V)',
      category: 'Dzielnik Napięcia',
      description: 'Klasyczny dzielnik napięcia złożony z rezystorów R1 = 10 kΩ i R2 = 10 kΩ zasilany napięciem stałym 12 V. Napięcie wyjściowe mierzone jest w punkcie TP2.',
      nominalValues: {
        title: 'Parametry znamionowe sprawnego układu:',
        description: 'U(TP1 - GND) = 12.0 V DC, U(TP2 - GND) = 6.0 V DC, R(TP2 - GND przy wył. zasilaniu) = 10.0 kΩ.'
      },
      points: [
        { id: 'TP1', name: 'TP1 (Wejście Uwe +12V)', x: 70, y: 50 },
        { id: 'TP2', name: 'TP2 (Wyjście dzielnika)', x: 230, y: 120 },
        { id: 'TP3', name: 'TP3 (Górny zacisk R1)', x: 170, y: 50 },
        { id: 'GND', name: 'GND (Masa 0V)', x: 230, y: 220 }
      ],
      faults: [
        {
          id: 'fault-div-r2-open',
          title: 'Rezystor R2 ma przerwę (brak połączenia z masą)',
          isCorrectDiagnosis: true,
          explanation: 'Gdy dolny rezystor R2 ma przerwę (R2 = ∞), prąd w obwodzie przestaje płynąć (I = 0). Wobec braku spadku napięcia na R1 (U_R1 = I · R1 = 0 V), cały potencjał zasilania +12V pojawia się w punkcie TP2. Woltomierz zmierzy U(TP2-GND) = 12 V zamiast znamionowych 6 V!',
          getMeasurement: (mode, red, black) => {
            const isRefGND = black === 'GND';
            if (mode === 'V_DC') {
              if (red === 'TP1' && isRefGND) return { display: '12.00', unit: 'V DC' };
              if (red === 'TP2' && isRefGND) return { display: '12.00', unit: 'V DC' }; // Voltage rises to 12V!
              if (red === 'TP1' && black === 'TP2') return { display: '0.00', unit: 'V DC' }; // No drop on R1
              if (red === black) return { display: '0.00', unit: 'V DC' };
              return { display: '0.00', unit: 'V DC' };
            }
            if (mode === 'OHM') {
              if ((red === 'TP2' && black === 'GND') || (red === 'GND' && black === 'TP2')) {
                return { display: 'O.L.', unit: 'MΩ' }; // Open loop
              }
              if ((red === 'TP1' && black === 'TP2') || (red === 'TP2' && black === 'TP1')) {
                return { display: '10.00', unit: 'kΩ' }; // R1 is ok
              }
              return { display: 'O.L.', unit: 'MΩ' };
            }
            if (mode === 'DIODE') {
              return { display: 'O.L.', unit: 'V' };
            }
            return { display: '0.00', unit: 'V AC' };
          }
        },
        {
          id: 'fault-div-r2-short',
          title: 'Rezystor R2 uległ zwarciu do masy (R2 = 0 Ω)',
          isCorrectDiagnosis: false,
          explanation: 'Gdyby R2 miał zwarcie, napięcie w punkcie TP2 wynosiłoby 0.00 V, a omomierz między TP2 i GND wskazałby 0.0 Ω.',
          getMeasurement: (mode, red, black) => {
            if (mode === 'V_DC') {
              if (red === 'TP1' && black === 'GND') return { display: '12.00', unit: 'V DC' };
              if (red === 'TP2' && black === 'GND') return { display: '0.00', unit: 'V DC' };
              if (red === 'TP1' && black === 'TP2') return { display: '12.00', unit: 'V DC' };
              return { display: '0.00', unit: 'V DC' };
            }
            if (mode === 'OHM') {
              if ((red === 'TP2' && black === 'GND') || (red === 'GND' && black === 'TP2')) {
                return { display: '0.1', unit: 'Ω', beep: true };
              }
              return { display: '10.0', unit: 'kΩ' };
            }
            return { display: '0.00', unit: 'V AC' };
          }
        },
        {
          id: 'fault-div-r1-open',
          title: 'Rezystor R1 ma przerwę (brak dopływu zasilania)',
          isCorrectDiagnosis: false,
          explanation: 'Przy przerwie w R1 w punkcie TP2 panowałby potencjał masy (0 V), a nie 12 V.',
          getMeasurement: (mode, red, black) => {
            if (mode === 'V_DC') {
              if (red === 'TP1' && black === 'GND') return { display: '12.00', unit: 'V DC' };
              if (red === 'TP2' && black === 'GND') return { display: '0.00', unit: 'V DC' };
              return { display: '0.00', unit: 'V DC' };
            }
            if (mode === 'OHM') {
              if ((red === 'TP1' && black === 'TP2') || (red === 'TP2' && black === 'TP1')) {
                return { display: 'O.L.', unit: 'MΩ' };
              }
              return { display: '10.0', unit: 'kΩ' };
            }
            return { display: '0.00', unit: 'V' };
          }
        },
        {
          id: 'fault-div-nominal',
          title: 'Układ jest w pełni sprawny (brak usterek)',
          isCorrectDiagnosis: false,
          explanation: 'Układ nie jest sprawny, ponieważ na sprawnym dzielniku napięcie U(TP2-GND) powinno wynosić dokładnie 6.00 V, a nie 12 V.',
          getMeasurement: (mode, red, black) => {
            if (mode === 'V_DC') {
              if (red === 'TP1' && black === 'GND') return { display: '12.00', unit: 'V DC' };
              if (red === 'TP2' && black === 'GND') return { display: '6.00', unit: 'V DC' };
              return { display: '0.00', unit: 'V DC' };
            }
            return { display: '10.00', unit: 'kΩ' };
          }
        }
      ]
    },
    {
      id: 'scenario-rectifier',
      name: 'Jednopołówkowy Prostownik Diodowy z Filtrem C',
      category: 'Prostownik Diodowy',
      description: 'Zasilacz z transformatorem 12 V AC, diodą prostowniczą D1 (1N4007), kondensatorem filtrującym C1 = 1000 µF i rezystorem obciążenia R = 1 kΩ.',
      nominalValues: {
        title: 'Parametry znamionowe sprawnego zasilacza:',
        description: 'U_AC(TP1 - GND) ≈ 12.0 V AC, U_DC(TP2 - GND) ≈ 16.2 V DC (Umax - UF), Test diody D1: spadek 0.65 V w kierunku przewodzenia.'
      },
      points: [
        { id: 'TP1', name: 'TP1 (Uzwojenie wtórne AC)', x: 70, y: 70 },
        { id: 'TP2', name: 'TP2 (Wyjście DC / Katoda D1)', x: 250, y: 70 },
        { id: 'TP3', name: 'TP3 (Kondensator C1 plus)', x: 250, y: 130 },
        { id: 'GND', name: 'GND (Masa wspólna zasilacza)', x: 160, y: 220 }
      ],
      faults: [
        {
          id: 'fault-rect-d1-open',
          title: 'Dioda prostownicza D1 ma przerwę (uszkodzona w stanie rozwarcia)',
          isCorrectDiagnosis: true,
          explanation: 'Wskutek uszkodzenia złącza diody w stan rozwarcia (brak przewodzenia w żadnym kierunku), prąd z uzwojenia wtórnego nie ładuje kondensatora filtrującego C1. Woltomierz na wyjściu TP2 mierzy 0.00 V DC, a test diody multimetrem wykazuje O.L. (brak spadku napięcia) niezależnie od polaryzacji sond!',
          getMeasurement: (mode, red, black) => {
            if (mode === 'V_AC') {
              if ((red === 'TP1' && black === 'GND') || (red === 'GND' && black === 'TP1')) {
                return { display: '12.10', unit: 'V AC' }; // AC present from transformer
              }
              return { display: '0.02', unit: 'V AC' };
            }
            if (mode === 'V_DC') {
              if (red === 'TP2' && black === 'GND') return { display: '0.00', unit: 'V DC' }; // 0V on output!
              if (red === 'TP1' && black === 'GND') return { display: '0.00', unit: 'V DC' };
              return { display: '0.00', unit: 'V DC' };
            }
            if (mode === 'DIODE') {
              // Diode test between TP1 (anode) and TP2 (cathode)
              if (red === 'TP1' && black === 'TP2') return { display: 'O.L.', unit: 'V' }; // Broken open!
              if (red === 'TP2' && black === 'TP1') return { display: 'O.L.', unit: 'V' };
              return { display: 'O.L.', unit: 'V' };
            }
            if (mode === 'OHM') {
              if ((red === 'TP1' && black === 'TP2') || (red === 'TP2' && black === 'TP1')) {
                return { display: 'O.L.', unit: 'MΩ' };
              }
              if ((red === 'TP2' && black === 'GND') || (red === 'GND' && black === 'TP2')) {
                return { display: '1.00', unit: 'kΩ' }; // Load resistor ok
              }
              return { display: 'O.L.', unit: 'MΩ' };
            }
            return { display: '0.00', unit: 'V' };
          }
        },
        {
          id: 'fault-rect-c1-short',
          title: 'Kondensator filtrujący C1 ma zwarcie wewnętrzne do masy',
          isCorrectDiagnosis: false,
          explanation: 'Gdyby kondensator C1 miał zwarcie, omomierz między TP2 a GND pokazałby 0.0 Ω oraz zadziałałby brzęczyk ciągłości.',
          getMeasurement: (mode, red, black) => {
            if (mode === 'OHM' && ((red === 'TP2' && black === 'GND') || (red === 'GND' && black === 'TP2'))) {
              return { display: '0.2', unit: 'Ω', beep: true };
            }
            return { display: '0.00', unit: 'V DC' };
          }
        },
        {
          id: 'fault-rect-trafo-fail',
          title: 'Uszkodzenie transformatora (brak napięcia zmiennego na TP1)',
          isCorrectDiagnosis: false,
          explanation: 'Pomiar w trybie V AC między TP1 a GND wykazuje prawidłowe 12.10 V AC, co wyklucza awarię transformatora.',
          getMeasurement: () => ({ display: '0.00', unit: 'V' })
        },
        {
          id: 'fault-rect-nominal',
          title: 'Układ jest w pełni sprawny',
          isCorrectDiagnosis: false,
          explanation: 'Układ jest niesprawny, ponieważ na wyjściu zasilacza (TP2) panuje brak napięcia stałego (0.00 V).',
          getMeasurement: () => ({ display: '16.20', unit: 'V DC' })
        }
      ]
    },
    {
      id: 'scenario-transistor',
      name: 'Klucz Tranzystorowy NPN (Sterowanie Przekaźnikiem)',
      category: 'Klucz Tranzystorowy',
      description: 'Stopień sterujący z tranzystorem NPN (BC547). Baza zasilana z sygnału logicznego 5V przez rezystor Rb = 4.7 kΩ. Kolektor zasila cewkę przez Rc = 1 kΩ z napięcia 12 V.',
      nominalValues: {
        title: 'Parametry znamionowe sprawnego klucza w stanie załączenia (IN = 5V):',
        description: 'U_BE(TP2 - GND) ≈ 0.68 V (przewodzące złącze B-E), U_CE(TP3 - GND) ≈ 0.15 V (nasycenie tranzystora), U(TP1) = 12.0 V.'
      },
      points: [
        { id: 'TP1', name: 'TP1 (Zasilanie stopnia +12V)', x: 260, y: 40 },
        { id: 'TP2', name: 'TP2 (Baza tranzystora)', x: 170, y: 130 },
        { id: 'TP3', name: 'TP3 (Kolektor tranzystora)', x: 260, y: 110 },
        { id: 'GND', name: 'GND (Emiter / Masa)', x: 260, y: 220 }
      ],
      faults: [
        {
          id: 'fault-bjt-rb-open',
          title: 'Rezystor bazowy Rb ma przerwę (brak prądu bazy Ib)',
          isCorrectDiagnosis: true,
          explanation: 'Wskutek przerwy w rezystorze bazowym Rb prąd bazy wynosi 0 mA. Tranzystor pozostaje w stanie całkowitego odcięcia (zatkany). W efekcie prąd kolektora Ic = 0, nie ma spadku na rezystorze kolektorowym, a w punkcie TP3 (kolektor) utrzymuje się pełne napięcie zasilania 12.0 V zamiast napięcia nasycenia ~0.15 V!',
          getMeasurement: (mode, red, black) => {
            const isGND = black === 'GND';
            if (mode === 'V_DC') {
              if (red === 'TP1' && isGND) return { display: '12.00', unit: 'V DC' };
              if (red === 'TP2' && isGND) return { display: '0.00', unit: 'V DC' }; // 0V on base
              if (red === 'TP3' && isGND) return { display: '12.00', unit: 'V DC' }; // Stuck at 12V (cut-off)
              if (red === 'TP1' && black === 'TP3') return { display: '0.00', unit: 'V DC' };
              return { display: '0.00', unit: 'V DC' };
            }
            if (mode === 'OHM') {
              if ((red === 'TP2' && black === 'GND') || (red === 'GND' && black === 'TP2')) {
                return { display: 'O.L.', unit: 'MΩ' };
              }
              if ((red === 'TP1' && black === 'TP3') || (red === 'TP3' && black === 'TP1')) {
                return { display: '1.00', unit: 'kΩ' }; // Rc is ok
              }
              return { display: 'O.L.', unit: 'MΩ' };
            }
            if (mode === 'DIODE') {
              if (red === 'TP2' && black === 'GND') return { display: '0.68', unit: 'V' }; // B-E junction itself is intact!
              if (red === 'TP2' && black === 'TP3') return { display: '0.67', unit: 'V' }; // B-C junction ok
              return { display: 'O.L.', unit: 'V' };
            }
            return { display: '0.00', unit: 'V' };
          }
        },
        {
          id: 'fault-bjt-ce-short',
          title: 'Tranzystor ma zwarcie złącza kolektor-emiter (C-E)',
          isCorrectDiagnosis: false,
          explanation: 'Gdyby złącze C-E miało zwarcie, napięcie na kolektorze TP3 wynosiłoby stale 0.0 V, a nie 12 V.',
          getMeasurement: () => ({ display: '0.00', unit: 'V' })
        },
        {
          id: 'fault-bjt-nominal',
          title: 'Układ jest w pełni sprawny',
          isCorrectDiagnosis: false,
          explanation: 'W sprawnym układzie przy wysterowanym wejściu kolektor TP3 powinien mieć potencjał bliski zera (stan nasycenia ~0.15 V).',
          getMeasurement: () => ({ display: '0.15', unit: 'V' })
        }
      ]
    }
  ], []);

  // Current active scenario and fault
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState<number>(0);
  const currentScenario = scenarios[selectedScenarioIdx];

  // Multimeter states
  const [meterMode, setMeterMode] = useState<MultimeterMode>('V_DC');
  const [redProbe, setRedProbe] = useState<string>('TP2');
  const [blackProbe, setBlackProbe] = useState<string>('GND');

  // Diagnosis submission state
  const [selectedDiagnosisId, setSelectedDiagnosisId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);

  // Compute multimeter readout
  const measurementResult = useMemo(() => {
    const activeFault = currentScenario.faults[0]; // Active target fault is fault 0
    return activeFault.getMeasurement(meterMode, redProbe, blackProbe);
  }, [currentScenario, meterMode, redProbe, blackProbe]);

  const handleDiagnose = () => {
    if (!selectedDiagnosisId) return;
    setIsAnswerSubmitted(true);
    const chosen = currentScenario.faults.find((f) => f.id === selectedDiagnosisId);
    if (chosen && chosen.isCorrectDiagnosis) {
      addXp(50, 'Trafna diagnoza usterki w module Wirtualny Serwisant!');
      unlockBadge('badge-troubleshooter');
    }
  };

  const handleNextScenario = () => {
    setSelectedScenarioIdx((prev) => (prev + 1) % scenarios.length);
    setSelectedDiagnosisId(null);
    setIsAnswerSubmitted(false);
    setRedProbe('TP2');
    setBlackProbe('GND');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Module Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>MODUŁ DIAGNOSTYCZNY ELM.05</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Wirtualny Serwisant: Lokalizacja Usterek
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Mierz napięcia, oporności i złącza wirtualnym multimetrem, analizuj schemat i postaw trafną diagnozę
          </p>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          {scenarios.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => {
                setSelectedScenarioIdx(idx);
                setSelectedDiagnosisId(null);
                setIsAnswerSubmitted(false);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedScenarioIdx === idx
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {sc.category}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Schematic & Multimeter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Circuit Schematic with Test Points (7 Cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {currentScenario.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {currentScenario.description}
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 px-2.5 py-1 rounded-lg border border-cyan-200 dark:border-cyan-800">
                +50 XP
              </span>
            </div>

            {/* Circuit Diagram SVG */}
            <div className="relative p-6 rounded-xl bg-slate-950 text-white border border-slate-800 flex items-center justify-center min-h-[260px] overflow-hidden">
              {currentScenario.id === 'scenario-divider' && (
                <svg viewBox="0 0 360 260" className="w-full max-w-md h-auto">
                  {/* Power Source Line */}
                  <line x1="70" y1="50" x2="230" y2="50" stroke="#06b6d4" strokeWidth="3" />
                  <circle cx="70" cy="50" r="5" fill="#06b6d4" />
                  <text x="50" y="35" className="text-[12px] font-mono fill-cyan-400 font-bold">+12V DC</text>

                  {/* Resistor R1 */}
                  <line x1="230" y1="50" x2="230" y2="70" stroke="#06b6d4" strokeWidth="3" />
                  <rect x="215" y="70" width="30" height="40" rx="3" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" />
                  <text x="255" y="94" className="text-[11px] font-mono fill-slate-200 font-semibold">R1 = 10 kΩ</text>

                  {/* Node TP2 */}
                  <line x1="230" y1="110" x2="230" y2="150" stroke="#06b6d4" strokeWidth="3" />
                  <circle cx="230" cy="125" r="5" fill="#f59e0b" />

                  {/* Resistor R2 */}
                  <rect x="215" y="150" width="30" height="40" rx="3" fill="#047857" stroke="#34d399" strokeWidth="2" />
                  <text x="255" y="174" className="text-[11px] font-mono fill-slate-200 font-semibold">R2 = 10 kΩ</text>

                  {/* Ground Line */}
                  <line x1="230" y1="190" x2="230" y2="220" stroke="#64748b" strokeWidth="3" />
                  <line x1="210" y1="220" x2="250" y2="220" stroke="#64748b" strokeWidth="3" />
                  <line x1="218" y1="225" x2="242" y2="225" stroke="#64748b" strokeWidth="2" />
                  <line x1="224" y1="230" x2="236" y2="230" stroke="#64748b" strokeWidth="1.5" />
                  <text x="230" y="244" className="text-[10px] font-mono fill-slate-400 text-center" textAnchor="middle">GND (0V)</text>

                  {/* Interactive Test Point Pins */}
                  {currentScenario.points.map((pt) => {
                    const isRed = redProbe === pt.id;
                    const isBlack = blackProbe === pt.id;

                    return (
                      <g key={pt.id} className="cursor-pointer" onClick={() => setRedProbe(pt.id)}>
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="12"
                          fill={isRed ? '#ef4444' : isBlack ? '#1e293b' : '#334155'}
                          stroke={isRed ? '#f87171' : isBlack ? '#64748b' : '#94a3b8'}
                          strokeWidth="2"
                        />
                        <text
                          x={pt.x}
                          y={pt.y + 4}
                          className="text-[10px] font-mono font-bold fill-white"
                          textAnchor="middle"
                        >
                          {pt.id.substring(0, 3)}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              )}

              {currentScenario.id === 'scenario-rectifier' && (
                <svg viewBox="0 0 360 260" className="w-full max-w-md h-auto">
                  {/* Transformer Secondary */}
                  <text x="40" y="55" className="text-[11px] font-mono fill-cyan-400 font-bold">12V ~ AC</text>
                  <circle cx="70" cy="70" r="5" fill="#06b6d4" />
                  <line x1="70" y1="70" x2="140" y2="70" stroke="#06b6d4" strokeWidth="3" />

                  {/* Diode D1 */}
                  <polygon points="140,55 140,85 170,70" fill="#dc2626" stroke="#f87171" strokeWidth="2" />
                  <line x1="170" y1="55" x2="170" y2="85" stroke="#f87171" strokeWidth="3" />
                  <text x="145" y="45" className="text-[11px] font-mono fill-slate-200">D1 (1N4007)</text>

                  {/* DC Rail */}
                  <line x1="170" y1="70" x2="250" y2="70" stroke="#06b6d4" strokeWidth="3" />
                  <line x1="250" y1="70" x2="250" y2="110" stroke="#06b6d4" strokeWidth="3" />

                  {/* Capacitor C1 */}
                  <line x1="235" y1="110" x2="265" y2="110" stroke="#38bdf8" strokeWidth="3" />
                  <line x1="235" y1="120" x2="265" y2="120" stroke="#38bdf8" strokeWidth="3" />
                  <text x="275" y="118" className="text-[10px] font-mono fill-slate-300">C1 = 1000 µF</text>

                  {/* Resistor Load */}
                  <line x1="250" y1="70" x2="310" y2="70" stroke="#06b6d4" strokeWidth="3" />
                  <line x1="310" y1="70" x2="310" y2="105" stroke="#06b6d4" strokeWidth="3" />
                  <rect x="298" y="105" width="24" height="35" rx="2" fill="#047857" stroke="#34d399" strokeWidth="1.5" />
                  <text x="310" y="155" className="text-[9px] font-mono fill-slate-400" textAnchor="middle">R=1k</text>

                  {/* Ground bus */}
                  <line x1="70" y1="220" x2="310" y2="220" stroke="#64748b" strokeWidth="3" />
                  <line x1="250" y1="120" x2="250" y2="220" stroke="#64748b" strokeWidth="2.5" />
                  <line x1="310" y1="140" x2="310" y2="220" stroke="#64748b" strokeWidth="2.5" />
                  <text x="160" y="240" className="text-[10px] font-mono fill-slate-400" textAnchor="middle">GND (Masa)</text>

                  {/* Test points */}
                  {currentScenario.points.map((pt) => {
                    const isRed = redProbe === pt.id;
                    const isBlack = blackProbe === pt.id;
                    return (
                      <g key={pt.id} className="cursor-pointer" onClick={() => setRedProbe(pt.id)}>
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="12"
                          fill={isRed ? '#ef4444' : isBlack ? '#1e293b' : '#334155'}
                          stroke={isRed ? '#f87171' : isBlack ? '#64748b' : '#94a3b8'}
                          strokeWidth="2"
                        />
                        <text x={pt.x} y={pt.y + 4} className="text-[10px] font-mono font-bold fill-white" textAnchor="middle">
                          {pt.id.substring(0, 3)}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              )}

              {currentScenario.id === 'scenario-transistor' && (
                <svg viewBox="0 0 360 260" className="w-full max-w-md h-auto">
                  {/* +12V Line */}
                  <line x1="260" y1="40" x2="260" y2="70" stroke="#06b6d4" strokeWidth="3" />
                  <text x="240" y="30" className="text-[11px] font-mono fill-cyan-400 font-bold">+12V</text>

                  {/* Collector Resistor */}
                  <rect x="248" y="70" width="24" height="35" rx="2" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="280" y="90" className="text-[10px] font-mono fill-slate-300">Rc = 1k</text>

                  {/* Base Resistor */}
                  <text x="30" y="134" className="text-[11px] font-mono fill-amber-400 font-bold">IN = 5V</text>
                  <line x1="70" y1="130" x2="110" y2="130" stroke="#f59e0b" strokeWidth="2.5" />
                  <rect x="110" y="118" width="35" height="24" rx="2" fill="#047857" stroke="#34d399" strokeWidth="1.5" />
                  <text x="127" y="110" className="text-[10px] font-mono fill-slate-300" textAnchor="middle">Rb=4.7k</text>
                  <line x1="145" y1="130" x2="190" y2="130" stroke="#f59e0b" strokeWidth="2.5" />

                  {/* NPN Transistor symbol */}
                  <circle cx="210" cy="140" r="24" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
                  <line x1="200" y1="125" x2="200" y2="155" stroke="white" strokeWidth="2.5" />
                  <line x1="190" y1="130" x2="200" y2="130" stroke="white" strokeWidth="2" />
                  <line x1="200" y1="130" x2="218" y2="118" stroke="white" strokeWidth="2" />
                  <line x1="218" y1="118" x2="260" y2="105" stroke="white" strokeWidth="2" />
                  <line x1="200" y1="150" x2="218" y2="162" stroke="white" strokeWidth="2" />
                  <line x1="218" y1="162" x2="260" y2="180" stroke="white" strokeWidth="2" />

                  {/* Emitter Ground */}
                  <line x1="260" y1="180" x2="260" y2="220" stroke="#64748b" strokeWidth="3" />
                  <line x1="245" y1="220" x2="275" y2="220" stroke="#64748b" strokeWidth="3" />
                  <text x="260" y="240" className="text-[10px] font-mono fill-slate-400" textAnchor="middle">GND</text>

                  {/* Points */}
                  {currentScenario.points.map((pt) => {
                    const isRed = redProbe === pt.id;
                    const isBlack = blackProbe === pt.id;
                    return (
                      <g key={pt.id} className="cursor-pointer" onClick={() => setRedProbe(pt.id)}>
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="12"
                          fill={isRed ? '#ef4444' : isBlack ? '#1e293b' : '#334155'}
                          stroke={isRed ? '#f87171' : isBlack ? '#64748b' : '#94a3b8'}
                          strokeWidth="2"
                        />
                        <text x={pt.x} y={pt.y + 4} className="text-[10px] font-mono font-bold fill-white" textAnchor="middle">
                          {pt.id.substring(0, 3)}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              )}
            </div>
          </div>

          {/* Reference Knowledge Callout */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <p className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-cyan-500" />
              {currentScenario.nominalValues.title}
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {currentScenario.nominalValues.description}
            </p>
          </div>
        </div>

        {/* Right Column: Virtual Multimeter & Probes Control (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-5">
          {/* Virtual Multimeter Body */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700 p-1 shadow-xl">
            <div className="p-4 rounded-xl bg-slate-950 text-white space-y-4">
              {/* LCD Display */}
              <div className="p-3 rounded-lg bg-emerald-950/80 border-2 border-emerald-800/80 text-emerald-300 font-mono flex items-center justify-between shadow-inner">
                <div className="text-xs space-y-0.5">
                  <span className="block text-[10px] text-emerald-500/80 font-sans uppercase">
                    {meterMode === 'V_DC' && 'DC Napięcie'}
                    {meterMode === 'V_AC' && 'AC Napięcie'}
                    {meterMode === 'OHM' && 'Rezystancja'}
                    {meterMode === 'DIODE' && 'Test Diody'}
                  </span>
                  {measurementResult.beep && (
                    <span className="text-[10px] bg-red-500/20 text-red-400 px-1 py-0.2 rounded font-bold animate-pulse">
                      BUZZER BEEP
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black tracking-wider tabular-nums font-mono">
                    {measurementResult.display}
                  </span>
                  <span className="text-xs text-emerald-400 ml-1.5 font-sans font-bold">
                    {measurementResult.unit}
                  </span>
                </div>
              </div>

              {/* Rotary Switch / Mode Buttons */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold text-slate-400 text-center uppercase tracking-wider">
                  Zakres Pomiarowy Multimetru
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setMeterMode('V_DC')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                      meterMode === 'V_DC'
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                        : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    V⎓ (Napięcie DC)
                  </button>
                  <button
                    onClick={() => setMeterMode('V_AC')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                      meterMode === 'V_AC'
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                        : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    V~ (Napięcie AC)
                  </button>
                  <button
                    onClick={() => setMeterMode('OHM')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                      meterMode === 'OHM'
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                        : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    Ω (Omomierz)
                  </button>
                  <button
                    onClick={() => setMeterMode('DIODE')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                      meterMode === 'DIODE'
                        ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md'
                        : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    ▶|• (Dioda / Ciągłość)
                  </button>
                </div>
              </div>

              {/* Probe Connection Selection */}
              <div className="pt-2 border-t border-slate-800 space-y-3">
                <p className="text-[11px] font-semibold text-slate-400 text-center uppercase tracking-wider">
                  Podłączenie Sond Pomiarowych
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {/* Red Probe (+) */}
                  <div className="p-2 rounded-lg bg-slate-900 border border-red-500/40 space-y-1">
                    <span className="text-[10px] font-bold text-red-400 flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                      Sonda Czerwona (+)
                    </span>
                    <select
                      value={redProbe}
                      onChange={(e) => setRedProbe(e.target.value)}
                      className="w-full bg-slate-950 text-white text-xs font-mono font-bold p-1.5 rounded border border-slate-700 focus:outline-none"
                    >
                      {currentScenario.points.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Black Probe (COM) */}
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-600 space-y-1">
                    <span className="text-[10px] font-bold text-slate-300 flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />
                      Sonda Czarna (COM)
                    </span>
                    <select
                      value={blackProbe}
                      onChange={(e) => setBlackProbe(e.target.value)}
                      className="w-full bg-slate-950 text-white text-xs font-mono font-bold p-1.5 rounded border border-slate-700 focus:outline-none"
                    >
                      {currentScenario.points.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-slate-500 dark:text-slate-400">
            Aktualnie mierzysz obwód między: <strong className="text-red-500">{redProbe}</strong> i{' '}
            <strong className="text-slate-700 dark:text-slate-300">{blackProbe}</strong>.
          </div>
        </div>
      </div>

      {/* Diagnosis Decision Panel */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Wrench className="w-5 h-5 text-cyan-500" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Protokół Diagnozy Serwisowej: Wybierz przyczynę usterki
          </h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Na podstawie wyników pomiarów wskaż, który element lub stan obwodu wywołał obserwowaną anomalię:
        </p>

        {/* Diagnosis Options */}
        <div className="space-y-2.5">
          {currentScenario.faults.map((fault) => {
            const isSelected = selectedDiagnosisId === fault.id;
            let containerClass =
              'border-slate-200 dark:border-slate-750 bg-slate-50 dark:bg-slate-850 hover:border-cyan-400';

            if (isAnswerSubmitted) {
              if (fault.isCorrectDiagnosis) {
                containerClass =
                  'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-semibold ring-1 ring-emerald-500';
              } else if (isSelected) {
                containerClass =
                  'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-100';
              } else {
                containerClass = 'border-slate-200 dark:border-slate-800 opacity-50';
              }
            } else if (isSelected) {
              containerClass =
                'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-100 font-semibold ring-1 ring-cyan-500';
            }

            return (
              <label
                key={fault.id}
                onClick={() => !isAnswerSubmitted && setSelectedDiagnosisId(fault.id)}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${containerClass}`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="diagnosis"
                    checked={isSelected}
                    disabled={isAnswerSubmitted}
                    onChange={() => setSelectedDiagnosisId(fault.id)}
                    className="accent-cyan-500 w-4 h-4 cursor-pointer"
                  />
                  <span>{fault.title}</span>
                </div>

                {isAnswerSubmitted && fault.isCorrectDiagnosis && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                )}
                {isAnswerSubmitted && isSelected && !fault.isCorrectDiagnosis && (
                  <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                )}
              </label>
            );
          })}
        </div>

        {/* Submit & Explanation */}
        {!isAnswerSubmitted ? (
          <button
            disabled={!selectedDiagnosisId}
            onClick={handleDiagnose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-500/20 disabled:opacity-50 transition-all"
          >
            Zatwierdź Diagnozę i Odbierz XP (+50 XP)
          </button>
        ) : (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Wyjaśnienie techniczne usterki:
              </span>
              <button
                onClick={handleNextScenario}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                <span>Kolejny scenariusz awarii</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {currentScenario.faults.find((f) => f.isCorrectDiagnosis)?.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
