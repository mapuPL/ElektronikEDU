import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  RESISTOR_COLORS,
  E24_SERIES,
  ResistorColor
} from '../data/initialData';
import {
  Zap,
  Sliders,
  Check,
  RefreshCw,
  Info,
  HelpCircle,
  Lightbulb,
  Cpu,
  Trophy,
  Layers,
  Flame,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

export const Workshop: React.FC = () => {
  const {
    selectedWorkshopTool,
    setSelectedWorkshopTool,
    unlockBadge,
    addXp
  } = useApp();

  // --- TOOL 1: PRAWO OHMA I MOCY ---
  const [voltage, setVoltage] = useState<number>(12);
  const [resistance, setResistance] = useState<number>(24);

  const current = useMemo(() => {
    if (resistance <= 0) return 0;
    return voltage / resistance;
  }, [voltage, resistance]);

  const power = useMemo(() => {
    return voltage * current;
  }, [voltage, current]);

  const recommendedResistorPower = useMemo(() => {
    if (power <= 0.125) return '0,125 W (1/8 W)';
    if (power <= 0.25) return '0,25 W (1/4 W)';
    if (power <= 0.5) return '0,5 W (1/2 W)';
    if (power <= 1.0) return '1 W';
    if (power <= 2.0) return '2 W';
    if (power <= 5.0) return '5 W (rezystor ceramiczny / cementowy)';
    return 'Wymagany radiator lub rezystor dużej mocy!';
  }, [power]);

  const handleOhmChange = () => {
    unlockBadge('badge-ohm');
  };

  // --- TOOL 2: DEKODER KODÓW PASKOWYCH ---
  const [bandCount, setBandCount] = useState<4 | 5>(4);
  const [band1, setBand1] = useState<number>(4); // Żółty (4)
  const [band2, setBand2] = useState<number>(7); // Fioletowy (7)
  const [band3, setBand3] = useState<number>(0); // dla 5 pasków
  const [multiplierIdx, setMultiplierIdx] = useState<number>(2); // Czerwony (x100) -> 4700 Ω
  const [toleranceIdx, setToleranceIdx] = useState<number>(10); // Złoty (5%)

  // Reverse decoder input
  const [reverseValueInput, setReverseValueInput] = useState<string>('4.7k');

  // Compute resistance from bands
  const calculatedResistance = useMemo(() => {
    const mult = RESISTOR_COLORS[multiplierIdx]?.multiplier ?? 1;
    let base = 0;
    if (bandCount === 4) {
      base = band1 * 10 + band2;
    } else {
      base = band1 * 100 + band2 * 10 + band3;
    }
    return base * mult;
  }, [bandCount, band1, band2, band3, multiplierIdx]);

  const toleranceValue = useMemo(() => {
    return RESISTOR_COLORS[toleranceIdx]?.tolerance ?? 5;
  }, [toleranceIdx]);

  const formatResistance = (val: number) => {
    if (val >= 1000000) {
      return `${(val / 1000000).toLocaleString('pl-PL', { maximumFractionDigits: 2 })} MΩ`;
    }
    if (val >= 1000) {
      return `${(val / 1000).toLocaleString('pl-PL', { maximumFractionDigits: 2 })} kΩ`;
    }
    return `${val.toLocaleString('pl-PL', { maximumFractionDigits: 2 })} Ω`;
  };

  const minToleranceRes = calculatedResistance * (1 - toleranceValue / 100);
  const maxToleranceRes = calculatedResistance * (1 + toleranceValue / 100);

  // Check if standard E24
  const isE24 = useMemo(() => {
    let normalized = calculatedResistance;
    while (normalized >= 10) normalized /= 10;
    while (normalized < 1) normalized *= 10;
    const rounded = Math.round(normalized * 10) / 10;
    return E24_SERIES.some((val) => Math.abs(val - rounded) < 0.05);
  }, [calculatedResistance]);

  // Apply Reverse Decoder
  const handleApplyReverse = () => {
    let clean = reverseValueInput.toLowerCase().trim();
    let mult = 1;
    if (clean.includes('m') || clean.includes('meg')) {
      mult = 1000000;
      clean = clean.replace('meg', '').replace('m', '');
    } else if (clean.includes('k')) {
      mult = 1000;
      clean = clean.replace('k', '');
    }
    clean = clean.replace(',', '.');
    const numeric = parseFloat(clean);
    if (isNaN(numeric) || numeric <= 0) return;

    const targetOhms = numeric * mult;
    let norm = targetOhms;
    let powerOf10 = 0;
    while (norm >= 100) {
      norm /= 10;
      powerOf10++;
    }
    while (norm < 10 && powerOf10 > -2) {
      norm *= 10;
      powerOf10--;
    }

    const d1 = Math.floor(norm / 10);
    const d2 = Math.round(norm % 10);

    if (d1 >= 0 && d1 <= 9) setBand1(d1);
    if (d2 >= 0 && d2 <= 9) setBand2(d2);

    // find matching multiplier in RESISTOR_COLORS
    const foundMultIdx = RESISTOR_COLORS.findIndex((c) => {
      const expected = Math.pow(10, powerOf10);
      return c.multiplier !== undefined && Math.abs(c.multiplier - expected) < 0.001;
    });
    if (foundMultIdx !== -1) {
      setMultiplierIdx(foundMultIdx);
    }
    unlockBadge('badge-bands');
  };

  // --- TOOL 3: SYMULATOR BRAMEK LOGICZNYCH ---
  type GateType = 'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR' | 'XNOR';
  const [selectedGate, setSelectedGate] = useState<GateType>('AND');
  const [gateSymbolStandard, setGateSymbolStandard] = useState<'ANSI' | 'IEC'>('ANSI');
  const [inputA, setInputA] = useState<boolean>(false);
  const [inputB, setInputB] = useState<boolean>(false);
  const [circuitMode, setCircuitMode] = useState<'single' | 'half_adder'>('single');

  // Compute gate output
  const gateOutput = useMemo(() => {
    switch (selectedGate) {
      case 'AND':
        return inputA && inputB;
      case 'OR':
        return inputA || inputB;
      case 'NOT':
        return !inputA;
      case 'NAND':
        return !(inputA && inputB);
      case 'NOR':
        return !(inputA || inputB);
      case 'XOR':
        return inputA !== inputB;
      case 'XNOR':
        return inputA === inputB;
      default:
        return false;
    }
  }, [selectedGate, inputA, inputB]);

  // Half-Adder logic: Sum = A ⊕ B, Carry = A · B
  const halfAdderSum = inputA !== inputB;
  const halfAdderCarry = inputA && inputB;

  const handleGateTest = () => {
    unlockBadge('badge-logic');
  };

  // --- TOOL 4: DOBÓR REZYSTORA DO DIODY LED ---
  const [ledSupplyVoltage, setLedSupplyVoltage] = useState<number>(12);
  const [ledColorType, setLedColorType] = useState<string>('red');
  const [ledForwardCurrent, setLedForwardCurrent] = useState<number>(20); // mA

  const ledPresets: Record<string, { name: string; vf: number; hex: string }> = {
    red: { name: 'Czerwona (Standard)', vf: 2.0, hex: '#ef4444' },
    yellow: { name: 'Żółta / Bursztynowa', vf: 2.1, hex: '#eab308' },
    green: { name: 'Zielona (Standard)', vf: 2.2, hex: '#22c55e' },
    blue: { name: 'Niebieska (InGaN)', vf: 3.2, hex: '#3b82f6' },
    white: { name: 'Biała (Zimna / Ciepła)', vf: 3.3, hex: '#f8fafc' },
    power_1w: { name: 'Dioda Power LED 1W', vf: 3.4, hex: '#38bdf8' }
  };

  const selectedLed = ledPresets[ledColorType] || ledPresets['red'];
  const ledCalculatedR = useMemo(() => {
    const deltaV = ledSupplyVoltage - selectedLed.vf;
    if (deltaV <= 0) return 0;
    const ifAmps = ledForwardCurrent / 1000;
    return deltaV / ifAmps;
  }, [ledSupplyVoltage, selectedLed.vf, ledForwardCurrent]);

  // Find nearest E24 resistor
  const nearestE24Resistor = useMemo(() => {
    if (ledCalculatedR <= 0) return 0;
    let norm = ledCalculatedR;
    let mult = 1;
    while (norm >= 100) {
      norm /= 10;
      mult *= 10;
    }
    while (norm < 10) {
      norm *= 10;
      mult /= 10;
    }

    let closest = E24_SERIES[0] * 10;
    let minDiff = 999999;
    for (const val of E24_SERIES) {
      const candidate = val * 10;
      const diff = Math.abs(candidate - norm);
      if (diff < minDiff) {
        minDiff = diff;
        closest = candidate;
      }
    }
    return Math.round(closest * mult);
  }, [ledCalculatedR]);

  const ledResistorPower = useMemo(() => {
    if (ledCalculatedR <= 0) return 0;
    const ifAmps = ledForwardCurrent / 1000;
    return Math.pow(ifAmps, 2) * nearestE24Resistor;
  }, [ledForwardCurrent, nearestE24Resistor, ledCalculatedR]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
            <Cpu className="w-4 h-4" />
            <span>PRACOWNIA INŻYNIERSKA I SYMULATORY</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Warsztat Praktyczny Technika
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Interaktywne modele obwodów, kalkulatory elektrotechniczne i cyfrowe tablice stanów
          </p>
        </div>

        {/* Tool Selector Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setSelectedWorkshopTool('ohm')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedWorkshopTool === 'ohm'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Prawo Ohma i Moc
          </button>
          <button
            onClick={() => setSelectedWorkshopTool('resistor')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedWorkshopTool === 'resistor'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Dekoder Rezystorów
          </button>
          <button
            onClick={() => setSelectedWorkshopTool('logic')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedWorkshopTool === 'logic'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Bramki Logiczne
          </button>
          <button
            onClick={() => setSelectedWorkshopTool('led')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedWorkshopTool === 'led'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Dobór Rezystora LED
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. PRAWO OHMA I MOCY                                                      */}
      {/* ========================================================================= */}
      {selectedWorkshopTool === 'ohm' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column */}
          <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Parametry Źródła i Odbiornika
              </h3>
              <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-200 dark:border-cyan-800">
                U = I · R
              </span>
            </div>

            {/* Voltage Control */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Napięcie zasilające (U)
                </span>
                <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400 text-sm tabular-nums">
                  {voltage} V
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="48"
                step="0.5"
                value={voltage}
                onChange={(e) => {
                  setVoltage(parseFloat(e.target.value));
                  handleOhmChange();
                }}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0.5 V (ogniwo)</span>
                <span>12 V (akumulator)</span>
                <span>24 V</span>
                <span>48 V</span>
              </div>
            </div>

            {/* Resistance Control */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Rezystancja odbiornika (R)
                </span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm tabular-nums">
                  {resistance} Ω
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="200"
                step="1"
                value={resistance}
                onChange={(e) => {
                  setResistance(parseFloat(e.target.value));
                  handleOhmChange();
                }}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>1 Ω</span>
                <span>50 Ω</span>
                <span>100 Ω</span>
                <span>200 Ω</span>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Szybkie nastawy laboratoryjne:
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => {
                    setVoltage(5);
                    setResistance(10);
                    handleOhmChange();
                  }}
                  className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-left border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Port USB 5V</p>
                  <p className="text-[10px] text-slate-400">U=5V, R=10Ω (0.5A)</p>
                </button>
                <button
                  onClick={() => {
                    setVoltage(12);
                    setResistance(6);
                    handleOhmChange();
                  }}
                  className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-left border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Żarówka 24W</p>
                  <p className="text-[10px] text-slate-400">U=12V, R=6Ω (2A)</p>
                </button>
                <button
                  onClick={() => {
                    setVoltage(9);
                    setResistance(45);
                    handleOhmChange();
                  }}
                  className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-left border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Bateria 9V 6F22</p>
                  <p className="text-[10px] text-slate-400">U=9V, R=45Ω (0.2A)</p>
                </button>
                <button
                  onClick={() => {
                    setVoltage(24);
                    setResistance(120);
                    handleOhmChange();
                  }}
                  className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-left border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Automatyka 24V</p>
                  <p className="text-[10px] text-slate-400">U=24V, R=120Ω</p>
                </button>
              </div>
            </div>

            {/* Safe Resistor Rating Indicator */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Zalecany typoszereg mocy rezystora:
                </span>
                <span className="font-bold text-amber-600 dark:text-amber-400">
                  {recommendedResistorPower}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Dobra praktyka inżynierska nakazuje dobrać rezystor o mocy znamionowej co najmniej 1,5 do 2 razy większej niż moc wydzielana P = {power.toFixed(2)} W.
              </p>
            </div>
          </div>

          {/* Visualization & Live Measurements Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Live Measurements Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                <p className="text-[11px] font-medium text-slate-400">Napięcie U</p>
                <p className="text-xl font-bold font-mono text-cyan-600 dark:text-cyan-400 mt-0.5 tabular-nums">
                  {voltage.toFixed(1)} <span className="text-xs">V</span>
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                <p className="text-[11px] font-medium text-slate-400">Rezystancja R</p>
                <p className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5 tabular-nums">
                  {resistance.toFixed(0)} <span className="text-xs">Ω</span>
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                <p className="text-[11px] font-medium text-slate-400">Natężenie I</p>
                <p className="text-xl font-bold font-mono text-amber-600 dark:text-amber-400 mt-0.5 tabular-nums">
                  {current < 1 ? `${(current * 1000).toFixed(0)} mA` : `${current.toFixed(2)} A`}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                <p className="text-[11px] font-medium text-slate-400">Moc P</p>
                <p className="text-xl font-bold font-mono text-purple-600 dark:text-purple-400 mt-0.5 tabular-nums">
                  {power.toFixed(2)} <span className="text-xs">W</span>
                </p>
              </div>
            </div>

            {/* Interactive Circuit Canvas */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex-1 flex flex-col justify-center items-center">
              <div className="w-full max-w-lg">
                <svg viewBox="0 0 460 240" className="w-full h-auto text-slate-700 dark:text-slate-300">
                  {/* Outer Loop Wire */}
                  <rect
                    x="50"
                    y="40"
                    width="360"
                    height="160"
                    rx="8"
                    fill="none"
                    stroke="#475569"
                    strokeWidth="3"
                  />

                  {/* Electron flow arrows */}
                  <g className="text-cyan-400 animate-pulse">
                    <polygon points="210,36 225,40 210,44" fill="#06b6d4" />
                    <polygon points="414,110 410,125 406,110" fill="#06b6d4" />
                    <polygon points="240,204 225,200 240,196" fill="#06b6d4" />
                    <polygon points="46,130 50,115 54,130" fill="#06b6d4" />
                  </g>

                  {/* Left: DC Voltage Source */}
                  <rect x="30" y="90" width="40" height="60" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" rx="4" />
                  <line x1="50" y1="40" x2="50" y2="90" stroke="#06b6d4" strokeWidth="3" />
                  <line x1="50" y1="150" x2="50" y2="200" stroke="#475569" strokeWidth="3" />
                  <text x="50" y="115" className="text-[12px] font-mono fill-cyan-400 font-bold text-center" textAnchor="middle">
                    + {voltage}V
                  </text>
                  <text x="50" y="132" className="text-[10px] font-mono fill-slate-400 text-center" textAnchor="middle">
                    DC Zródło
                  </text>

                  {/* Top: Ammeter (A) */}
                  <rect x="200" y="24" width="60" height="32" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                  <text x="230" y="44" className="text-[11px] font-mono fill-amber-400 font-bold text-center" textAnchor="middle">
                    I = {current < 1 ? `${(current * 1000).toFixed(0)}mA` : `${current.toFixed(2)}A`}
                  </text>

                  {/* Right: Resistor (R) */}
                  <rect
                    x="395"
                    y="80"
                    width="30"
                    height="80"
                    rx="4"
                    fill={power > 2 ? '#dc2626' : '#10b981'}
                    fillOpacity="0.2"
                    stroke={power > 2 ? '#ef4444' : '#10b981'}
                    strokeWidth="3"
                  />
                  <text x="350" y="125" className="text-[12px] font-mono fill-emerald-500 font-bold">
                    R = {resistance} Ω
                  </text>

                  {/* Power annotation next to resistor */}
                  <text x="350" y="145" className="text-[10px] font-mono fill-purple-400">
                    P = {power.toFixed(2)} W
                  </text>

                  {/* Voltmeter branch in parallel */}
                  <path d="M 380 70 L 330 70 L 330 170 L 380 170" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3 2" />
                  <circle cx="330" cy="120" r="16" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
                  <text x="330" y="124" className="text-[10px] font-mono font-bold fill-cyan-400 text-center" textAnchor="middle">
                    {voltage}V
                  </text>
                </svg>

                <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2">
                  Prąd w obwodzie: <strong className="text-slate-800 dark:text-slate-200">{current.toFixed(3)} A</strong>.
                  Straty cieplne na oporniku: <strong className="text-slate-800 dark:text-slate-200">{power.toFixed(2)} W</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. DEKODER KODÓW PASKOWYCH REZYSTORÓW                                      */}
      {/* ========================================================================= */}
      {selectedWorkshopTool === 'resistor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Resistor Visualizer & Output (Top/Left) */}
          <div className="lg:col-span-12 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Wizualizacja Rezystora Osiowego (THT)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Standard kodowania barwnego wg normy IEC 60062
                </p>
              </div>

              {/* 4 or 5 bands switcher */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setBandCount(4)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    bandCount === 4
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  4 Paski (Standard)
                </button>
                <button
                  onClick={() => setBandCount(5)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    bandCount === 5
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  5 Pasków (Precyzyjny 1%)
                </button>
              </div>
            </div>

            {/* SVG Realistic Resistor Graphic */}
            <div className="w-full max-w-xl py-6 flex justify-center">
              <svg viewBox="0 0 500 140" className="w-full h-auto drop-shadow-md">
                {/* Metallic Leads */}
                <line x1="20" y1="70" x2="110" y2="70" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
                <line x1="390" y1="70" x2="480" y2="70" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />

                {/* Resistor Body (Beige Ceramic shape) */}
                <defs>
                  <linearGradient id="resistorBody" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fef3c7" />
                    <stop offset="50%" stopColor="#d97706" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#b45309" stopOpacity="0.6" />
                  </linearGradient>
                </defs>

                {/* Left bulb, cylinder, right bulb */}
                <path
                  d="M 110 40 C 130 40 140 50 150 50 L 350 50 C 360 50 370 40 390 40 C 400 40 405 50 405 70 C 405 90 400 100 390 100 C 370 100 360 90 350 90 L 150 90 C 140 90 130 100 110 100 C 100 100 95 90 95 70 C 95 50 100 40 110 40 Z"
                  fill="#eedcba"
                  stroke="#c59b67"
                  strokeWidth="2"
                />

                {/* Band 1 */}
                <rect
                  x="145"
                  y="49"
                  width="18"
                  height="42"
                  fill={RESISTOR_COLORS[band1].hex}
                  rx="1"
                  stroke="rgba(0,0,0,0.15)"
                />

                {/* Band 2 */}
                <rect
                  x="195"
                  y="49"
                  width="18"
                  height="42"
                  fill={RESISTOR_COLORS[band2].hex}
                  rx="1"
                  stroke="rgba(0,0,0,0.15)"
                />

                {/* Band 3 (Only in 5-band mode) */}
                {bandCount === 5 && (
                  <rect
                    x="245"
                    y="49"
                    width="18"
                    height="42"
                    fill={RESISTOR_COLORS[band3].hex}
                    rx="1"
                    stroke="rgba(0,0,0,0.15)"
                  />
                )}

                {/* Multiplier Band */}
                <rect
                  x={bandCount === 4 ? 260 : 295}
                  y="49"
                  width="18"
                  height="42"
                  fill={RESISTOR_COLORS[multiplierIdx].hex}
                  rx="1"
                  stroke="rgba(0,0,0,0.15)"
                />

                {/* Tolerance Band (spaced further to the right) */}
                <rect
                  x="355"
                  y="47"
                  width="18"
                  height="46"
                  fill={RESISTOR_COLORS[toleranceIdx].hex}
                  rx="1"
                  stroke="rgba(0,0,0,0.15)"
                />
              </svg>
            </div>

            {/* Calculated Values Dashboard */}
            <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-400 font-medium">Rezystancja znamionowa</p>
                <p className="text-2xl font-bold font-mono text-cyan-600 dark:text-cyan-400 mt-0.5">
                  {formatResistance(calculatedResistance)}
                </p>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                  {calculatedResistance.toLocaleString('pl-PL')} Ω
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-400 font-medium">Tolerancja wykonania</p>
                <p className="text-2xl font-bold font-mono text-amber-500 mt-0.5">
                  ±{toleranceValue}%
                </p>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                  {formatResistance(minToleranceRes)} – {formatResistance(maxToleranceRes)}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-400 font-medium">Zgodność z typoszeregiem</p>
                <p className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center justify-center gap-1.5">
                  {isE24 ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Szereg E24 / E12</span>
                    </>
                  ) : (
                    <>
                      <Info className="w-4 h-4 text-slate-400" />
                      <span>Niestandardowa</span>
                    </>
                  )}
                </p>
                <p className="text-[11px] text-slate-500 mt-1">Typowa wartość rynkowa</p>
              </div>
            </div>
          </div>

          {/* Color Band Selectors (Bottom) */}
          <div className="lg:col-span-8 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Wybierz kolory poszczególnych pasków:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Band 1 */}
              <div>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  1. Pasek (1. cyfra)
                </p>
                <div className="space-y-1">
                  {RESISTOR_COLORS.filter((c) => c.digit !== undefined && c.digit > 0).map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setBand1(c.digit!)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                        band1 === c.digit
                          ? 'ring-2 ring-cyan-500 font-semibold'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="text-slate-700 dark:text-slate-300">{c.polishName}</span>
                      </span>
                      <span className="font-mono text-slate-400">{c.digit}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Band 2 */}
              <div>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  2. Pasek (2. cyfra)
                </p>
                <div className="space-y-1">
                  {RESISTOR_COLORS.filter((c) => c.digit !== undefined).map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setBand2(c.digit!)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                        band2 === c.digit
                          ? 'ring-2 ring-cyan-500 font-semibold'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="text-slate-700 dark:text-slate-300">{c.polishName}</span>
                      </span>
                      <span className="font-mono text-slate-400">{c.digit}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Band 3 (if 5 bands) or Multiplier */}
              {bandCount === 5 && (
                <div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    3. Pasek (3. cyfra)
                  </p>
                  <div className="space-y-1">
                    {RESISTOR_COLORS.filter((c) => c.digit !== undefined).map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setBand3(c.digit!)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                          band3 === c.digit
                            ? 'ring-2 ring-cyan-500 font-semibold'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/20"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span className="text-slate-700 dark:text-slate-300">{c.polishName}</span>
                        </span>
                        <span className="font-mono text-slate-400">{c.digit}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Multiplier Band */}
              <div>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {bandCount === 4 ? '3.' : '4.'} Pasek (Mnożnik)
                </p>
                <div className="space-y-1">
                  {RESISTOR_COLORS.filter((c) => c.multiplier !== undefined).map((c, i) => {
                    const originalIndex = RESISTOR_COLORS.findIndex((rc) => rc.name === c.name);
                    return (
                      <button
                        key={c.name}
                        onClick={() => setMultiplierIdx(originalIndex)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                          multiplierIdx === originalIndex
                            ? 'ring-2 ring-cyan-500 font-semibold'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/20"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span className="text-slate-700 dark:text-slate-300">{c.polishName}</span>
                        </span>
                        <span className="font-mono text-slate-400">
                          {c.multiplier && c.multiplier >= 1000
                            ? `x10^${Math.log10(c.multiplier)}`
                            : `x${c.multiplier}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tolerance Band */}
              <div>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {bandCount === 4 ? '4.' : '5.'} Pasek (Tolerancja)
                </p>
                <div className="space-y-1">
                  {RESISTOR_COLORS.filter((c) => c.tolerance !== undefined).map((c) => {
                    const originalIndex = RESISTOR_COLORS.findIndex((rc) => rc.name === c.name);
                    return (
                      <button
                        key={c.name}
                        onClick={() => setToleranceIdx(originalIndex)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                          toleranceIdx === originalIndex
                            ? 'ring-2 ring-cyan-500 font-semibold'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/20"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span className="text-slate-700 dark:text-slate-300">{c.polishName}</span>
                        </span>
                        <span className="font-mono text-amber-500 font-bold">±{c.tolerance}%</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Reverse Decoder Column */}
          <div className="lg:col-span-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-cyan-500" />
              <span>Dekoder Odwrotny</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Wpisz pożądaną wartość (np. <code className="text-cyan-600 dark:text-cyan-400">4.7k</code>, <code className="text-cyan-600 dark:text-cyan-400">100</code>, <code className="text-cyan-600 dark:text-cyan-400">2.2M</code>), a dekoder sam ustawi paski na rezystorze!
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                value={reverseValueInput}
                onChange={(e) => setReverseValueInput(e.target.value)}
                placeholder="np. 4.7k lub 220"
                className="flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button
                onClick={handleApplyReverse}
                className="px-4 py-2 text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl transition-colors"
              >
                Ustaw
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                Praktyczne rymowanki mnemotechniczne:
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed italic">
                &quot;Czarny zero, brąz to jeden, czerwień dwa, pomarańcz trzy, żółty cztery, zieleń pięć, błękit sześć, fiolet siedem, szary osiem, biały dziewięć!&quot;
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. SYMULATOR BRAMEK LOGICZNYCH                                             */}
      {/* ========================================================================= */}
      {selectedWorkshopTool === 'logic' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Simulation Stage (8 Cols) */}
          <div className="lg:col-span-8 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Interaktywny Symulator Cyfrowy
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Przełączaj stany logiczne na wejściach i obserwuj wyjście oraz tabelę prawdy
                </p>
              </div>

              {/* Symbol Standard Switch (ANSI vs IEC) */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">Standard symboli:</span>
                <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => setGateSymbolStandard('ANSI')}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded ${
                      gateSymbolStandard === 'ANSI'
                        ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-500'
                    }`}
                  >
                    ANSI (Krzywoliniowe)
                  </button>
                  <button
                    onClick={() => setGateSymbolStandard('IEC')}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded ${
                      gateSymbolStandard === 'IEC'
                        ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-500'
                    }`}
                  >
                    IEC (&, ≥1, =1)
                  </button>
                </div>
              </div>
            </div>

            {/* Gate Types Picker */}
            <div className="flex flex-wrap gap-2">
              {(['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'] as GateType[]).map((gate) => (
                <button
                  key={gate}
                  onClick={() => {
                    setSelectedGate(gate);
                    handleGateTest();
                  }}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                    selectedGate === gate
                      ? 'bg-cyan-600 text-white border-cyan-500 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-cyan-400'
                  }`}
                >
                  {gate}
                </button>
              ))}
            </div>

            {/* Interactive Gate Schematic Canvas */}
            <div className="p-8 rounded-2xl bg-slate-950 text-white border border-slate-800 flex flex-col items-center justify-center min-h-[220px]">
              <div className="flex items-center justify-between w-full max-w-md gap-4">
                {/* Inputs A & B Switches */}
                <div className="flex flex-col gap-8 shrink-0">
                  {/* Switch A */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setInputA(!inputA)}
                      className={`w-12 h-7 rounded-full p-1 transition-colors flex items-center ${
                        inputA ? 'bg-cyan-500 justify-end' : 'bg-slate-700 justify-start'
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
                    </button>
                    <div>
                      <span className="text-xs font-mono font-bold">WEJŚCIE A: </span>
                      <span className={`text-sm font-mono font-bold ${inputA ? 'text-cyan-400' : 'text-slate-500'}`}>
                        {inputA ? '1 (HIGH)' : '0 (LOW)'}
                      </span>
                    </div>
                  </div>

                  {/* Switch B (if not NOT gate) */}
                  {selectedGate !== 'NOT' && (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setInputB(!inputB)}
                        className={`w-12 h-7 rounded-full p-1 transition-colors flex items-center ${
                          inputB ? 'bg-cyan-500 justify-end' : 'bg-slate-700 justify-start'
                        }`}
                      >
                        <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
                      </button>
                      <div>
                        <span className="text-xs font-mono font-bold">WEJŚCIE B: </span>
                        <span className={`text-sm font-mono font-bold ${inputB ? 'text-cyan-400' : 'text-slate-500'}`}>
                          {inputB ? '1 (HIGH)' : '0 (LOW)'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Gate Graphic (Center) */}
                <div className="flex-1 flex justify-center px-4">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 flex flex-col items-center justify-center min-w-[120px] shadow-lg">
                    {gateSymbolStandard === 'IEC' ? (
                      <div className="w-20 h-20 rounded border-2 border-cyan-400 flex flex-col items-center justify-center font-mono font-bold text-lg text-cyan-300">
                        {selectedGate === 'AND' && '&'}
                        {selectedGate === 'OR' && '≥1'}
                        {selectedGate === 'NOT' && '1'}
                        {selectedGate === 'NAND' && '&'}
                        {selectedGate === 'NOR' && '≥1'}
                        {selectedGate === 'XOR' && '=1'}
                        {selectedGate === 'XNOR' && '=1'}
                        <span className="text-[10px] text-slate-400 mt-1 font-sans">{selectedGate}</span>
                      </div>
                    ) : (
                      <div className="w-24 h-16 rounded-r-full border-2 border-cyan-400 flex items-center justify-center font-mono font-bold text-base text-cyan-300 bg-cyan-950/20">
                        {selectedGate}
                      </div>
                    )}
                  </div>
                </div>

                {/* Output indicator LED */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <div
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                      gateOutput
                        ? 'bg-emerald-500 border-emerald-300 shadow-lg shadow-emerald-500/50 text-slate-950 font-bold'
                        : 'bg-slate-900 border-slate-700 text-slate-600'
                    }`}
                  >
                    <Zap className={`w-6 h-6 ${gateOutput ? 'fill-white text-white' : 'text-slate-600'}`} />
                  </div>
                  <div className="text-center font-mono">
                    <p className="text-[11px] text-slate-400">WYJŚCIE Y</p>
                    <p className={`text-base font-bold ${gateOutput ? 'text-emerald-400' : 'text-slate-500'}`}>
                      {gateOutput ? '1 (Vcc)' : '0 (GND)'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Truth Table Column (4 Cols) */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-500" />
              <span>Tabela Prawdy dla: {selectedGate}</span>
            </h4>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden text-xs">
              <table className="w-full text-center">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="py-2.5 px-3">Wejście A</th>
                    {selectedGate !== 'NOT' && <th className="py-2.5 px-3">Wejście B</th>}
                    <th className="py-2.5 px-3 text-cyan-600 dark:text-cyan-400">Wyjście Y</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                  {selectedGate === 'NOT' ? (
                    <>
                      <tr className={!inputA ? 'bg-cyan-50 dark:bg-cyan-950/40 font-bold text-cyan-600 dark:text-cyan-400' : ''}>
                        <td className="py-2">0</td>
                        <td className="py-2 text-emerald-500">1</td>
                      </tr>
                      <tr className={inputA ? 'bg-cyan-50 dark:bg-cyan-950/40 font-bold text-cyan-600 dark:text-cyan-400' : ''}>
                        <td className="py-2">1</td>
                        <td className="py-2 text-slate-400">0</td>
                      </tr>
                    </>
                  ) : (
                    [
                      { a: false, b: false },
                      { a: false, b: true },
                      { a: true, b: false },
                      { a: true, b: true }
                    ].map((row, idx) => {
                      let out = false;
                      if (selectedGate === 'AND') out = row.a && row.b;
                      if (selectedGate === 'OR') out = row.a || row.b;
                      if (selectedGate === 'NAND') out = !(row.a && row.b);
                      if (selectedGate === 'NOR') out = !(row.a || row.b);
                      if (selectedGate === 'XOR') out = row.a !== row.b;
                      if (selectedGate === 'XNOR') out = row.a === row.b;

                      const isCurrent = inputA === row.a && inputB === row.b;

                      return (
                        <tr
                          key={idx}
                          className={
                            isCurrent
                              ? 'bg-cyan-500/10 dark:bg-cyan-950/50 font-bold text-cyan-600 dark:text-cyan-400'
                              : 'text-slate-600 dark:text-slate-400'
                          }
                        >
                          <td className="py-2">{row.a ? '1' : '0'}</td>
                          <td className="py-2">{row.b ? '1' : '0'}</td>
                          <td className={`py-2 ${out ? 'text-emerald-500 font-bold' : ''}`}>
                            {out ? '1' : '0'}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 space-y-1">
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                Prawa De Morgana dla układów:
              </p>
              <p className="font-mono text-[11px] text-cyan-600 dark:text-cyan-400">
                ~(A · B) = ~A + ~B
              </p>
              <p className="font-mono text-[11px] text-cyan-600 dark:text-cyan-400">
                ~(A + B) = ~A · ~B
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. DOBÓR REZYSTORA DO DIODY LED                                           */}
      {/* ========================================================================= */}
      {selectedWorkshopTool === 'led' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Kalkulator Obwodu Diody LED
            </h3>

            {/* LED Type Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Wybierz kolor i typ diody LED:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.entries(ledPresets).map(([key, data]) => (
                  <button
                    key={key}
                    onClick={() => setLedColorType(key)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs text-left transition-all ${
                      ledColorType === key
                        ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-800 dark:text-cyan-200 font-semibold shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full shrink-0 border border-black/20"
                      style={{ backgroundColor: data.hex }}
                    />
                    <div className="truncate">
                      <p className="truncate leading-tight">{data.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">UF = {data.vf}V</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Supply Voltage Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Napięcie zasilania (Uzas)
                </span>
                <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400 text-sm">
                  {ledSupplyVoltage} V
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="24"
                step="0.5"
                value={ledSupplyVoltage}
                onChange={(e) => setLedSupplyVoltage(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Current Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Znamionowy prąd pracy diody (IF)
                </span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                  {ledForwardCurrent} mA
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="1"
                value={ledForwardCurrent}
                onChange={(e) => setLedForwardCurrent(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-6 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                Wyniki Obliczeń i Dobór z Szeregu E24
              </h3>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-400 font-medium">Rezystancja teoretyczna</p>
                  <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">
                    {ledCalculatedR > 0 ? `${ledCalculatedR.toFixed(1)} Ω` : 'Zbyt małe Uwe!'}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">R = (Uzas - UF) / IF</p>
                </div>

                <div className="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800">
                  <p className="text-xs text-cyan-700 dark:text-cyan-300 font-medium">Najbliższy rezystor E24</p>
                  <p className="text-2xl font-bold font-mono text-cyan-600 dark:text-cyan-400 mt-1">
                    {nearestE24Resistor} Ω
                  </p>
                  <p className="text-[10px] text-cyan-600 dark:text-cyan-400 mt-0.5">Standard handlowy</p>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Moc tracona na rezystorze:</span>
                  <span className="font-mono font-bold text-amber-500">{ledResistorPower.toFixed(3)} W</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Zalecana moc znamionowa:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {ledResistorPower < 0.2 ? '0,25 W (standard)' : '0,5 W lub większa'}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Nigdy nie podłączaj diody LED bezpośrednio do zasilacza bez rezystora ograniczającego! Dioda LED ma nieliniową charakterystykę prądowo-napięciową i ulegnie natychmiastowemu zniszczeniu termicznemu.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
