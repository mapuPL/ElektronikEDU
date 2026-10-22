import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Activity,
  Sliders,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Play,
  Pause,
  Award
} from 'lucide-react';

export const OscilloscopeSimulator: React.FC = () => {
  const { addXp, unlockBadge } = useApp();

  // Generator Controls
  type WaveType = 'sine' | 'square' | 'triangle';
  const [waveType, setWaveType] = useState<WaveType>('sine');
  const [frequency, setFrequency] = useState<number>(1000); // in Hz (1kHz default)
  const [voltagePeak, setVoltagePeak] = useState<number>(3.0); // Vp in Volts
  const [dcOffset, setDcOffset] = useState<number>(0.0); // Offset in Volts

  // Oscilloscope Display Controls
  const [voltsPerDiv, setVoltsPerDiv] = useState<number>(1.0); // 1V/div
  const [timePerDivUs, setTimePerDivUs] = useState<number>(200); // 200 µs/div
  const [yPosition, setYPosition] = useState<number>(0); // Vertical offset in divs
  const [traceColor, setTraceColor] = useState<'green' | 'amber'>('green');
  const [isRunning, setIsRunning] = useState<boolean>(true);

  // Time/Div steps in microseconds
  const timeDivOptions = [
    { label: '50 µs', val: 50 },
    { label: '100 µs', val: 100 },
    { label: '200 µs', val: 200 },
    { label: '500 µs', val: 500 },
    { label: '1 ms', val: 1000 },
    { label: '2 ms', val: 2000 },
    { label: '5 ms', val: 5000 },
    { label: '10 ms', val: 10000 },
    { label: '20 ms', val: 20000 }
  ];

  const voltsDivOptions = [0.2, 0.5, 1.0, 2.0, 5.0];

  // Mathematical signal calculations
  const periodSeconds = useMemo(() => {
    return frequency > 0 ? 1 / frequency : 0;
  }, [frequency]);

  const periodFormatted = useMemo(() => {
    if (periodSeconds === 0) return '0 s';
    if (periodSeconds < 0.001) {
      return `${(periodSeconds * 1000000).toFixed(1)} µs`;
    }
    return `${(periodSeconds * 1000).toFixed(2)} ms`;
  }, [periodSeconds]);

  const vpp = useMemo(() => {
    return voltagePeak * 2;
  }, [voltagePeak]);

  const vrms = useMemo(() => {
    if (waveType === 'sine') {
      return voltagePeak / Math.SQRT2;
    }
    if (waveType === 'square') {
      return voltagePeak;
    }
    // Triangle
    return voltagePeak / Math.sqrt(3);
  }, [voltagePeak, waveType]);

  // Generate SVG path points for the waveform
  // Screen size: 400px wide (10 divs, each 40px), 320px high (8 divs, each 40px)
  // Center is x=200, y=160
  const waveformPath = useMemo(() => {
    const width = 400;
    const height = 320;
    const centerY = height / 2 - yPosition * 40;
    const totalTimeSpanUs = 10 * timePerDivUs; // 10 divs wide
    const totalTimeSpanSeconds = totalTimeSpanUs / 1000000;

    const points: string[] = [];
    const steps = 300;

    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * width;
      const t = (i / steps) * totalTimeSpanSeconds; // current time in seconds

      let instantaneousVoltage = 0;
      const phase = 2 * Math.PI * frequency * t;

      if (waveType === 'sine') {
        instantaneousVoltage = voltagePeak * Math.sin(phase) + dcOffset;
      } else if (waveType === 'square') {
        instantaneousVoltage = (Math.sin(phase) >= 0 ? voltagePeak : -voltagePeak) + dcOffset;
      } else if (waveType === 'triangle') {
        // Triangle wave [-Vp, +Vp]
        const norm = (phase / (2 * Math.PI)) % 1;
        instantaneousVoltage =
          voltagePeak * (norm < 0.5 ? 4 * norm - 1 : 3 - 4 * norm) + dcOffset;
      }

      // Map voltage to Y pixels: centerY - (voltage / voltsPerDiv) * 40px
      const y = centerY - (instantaneousVoltage / voltsPerDiv) * 40;
      // Clamp within screen boundaries
      const clampedY = Math.max(0, Math.min(height, y));
      points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${clampedY.toFixed(1)}`);
    }

    return points.join(' ');
  }, [frequency, voltagePeak, dcOffset, waveType, voltsPerDiv, timePerDivUs, yPosition]);

  // --- INTERACTIVE QUIZ MODE ---
  const [quizActive, setQuizActive] = useState<boolean>(false);
  const [quizTargetVpp, setQuizTargetVpp] = useState<number>(6.0);
  const [quizTargetFreq, setQuizTargetFreq] = useState<number>(1000);
  const [userVppInput, setUserVppInput] = useState<string>('');
  const [userFreqInput, setUserFreqInput] = useState<string>('');
  const [quizResult, setQuizResult] = useState<'correct' | 'wrong' | null>(null);

  const startQuizChallenge = () => {
    // Generate random friendly values: Vp = 1, 2, 3, 4, 5V. Freq = 250, 500, 1000, 2000, 5000 Hz.
    const vList = [2, 3, 4, 6];
    const fList = [250, 500, 1000, 2500, 5000];
    const targetV = vList[Math.floor(Math.random() * vList.length)];
    const targetF = fList[Math.floor(Math.random() * fList.length)];

    setQuizTargetVpp(targetV * 2);
    setQuizTargetFreq(targetF);

    setVoltagePeak(targetV);
    setFrequency(targetF);
    setDcOffset(0);
    setWaveType('sine');
    setVoltsPerDiv(targetV >= 4 ? 2.0 : 1.0);

    // Pick suitable time per div so 1 to 2 cycles fit
    const periodUs = (1 / targetF) * 1000000;
    const chosenTdiv = timeDivOptions.reduce((prev, curr) => {
      return Math.abs(curr.val * 2 - periodUs) < Math.abs(prev.val * 2 - periodUs) ? curr : prev;
    });
    setTimePerDivUs(chosenTdiv.val);

    setQuizActive(true);
    setQuizResult(null);
    setUserVppInput('');
    setUserFreqInput('');
  };

  const handleVerifyQuiz = () => {
    const parsedVpp = parseFloat(userVppInput.replace(',', '.'));
    const parsedFreq = parseFloat(userFreqInput.replace(',', '.'));

    const vppOk = Math.abs(parsedVpp - quizTargetVpp) <= 0.5;
    const freqOk = Math.abs(parsedFreq - quizTargetFreq) <= quizTargetFreq * 0.15; // 15% margin

    if (vppOk && freqOk) {
      setQuizResult('correct');
      addXp(50, 'Prawidłowy odczyt parametrów z oscyloskopu!');
      unlockBadge('badge-oscilloscope');
    } else {
      setQuizResult('wrong');
    }
  };

  return (
    <div className="space-y-6">
      {/* Scope Container Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Screen & Digital Readout (7 Cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Ekran Oscyloskopu Dwukanałowego (DSO)
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTraceColor(traceColor === 'green' ? 'amber' : 'green')}
                className="text-[11px] font-semibold px-2 py-1 rounded border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Fosfor: {traceColor === 'green' ? '🟢 Zielony' : '🟠 Bursztyn'}
              </button>
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 ${
                  isRunning
                    ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                    : 'bg-red-500/10 text-red-500 border-red-500/30'
                }`}
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isRunning ? 'RUN' : 'STOP'}</span>
              </button>
            </div>
          </div>

          {/* CRT / LCD Screen Box */}
          <div className="relative p-2 rounded-xl bg-slate-950 border-4 border-slate-800 shadow-2xl flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 400 320" className="w-full max-w-lg h-auto select-none">
              {/* Dark Graticule Background */}
              <rect x="0" y="0" width="400" height="320" fill="#040d0a" />

              {/* 10 x 8 Graticule Grid (Each division = 40px) */}
              <g stroke="#0f3322" strokeWidth="1">
                {/* Vertical grid lines */}
                {[0, 40, 80, 120, 160, 200, 240, 280, 320, 360, 400].map((x) => (
                  <line key={`vx-${x}`} x1={x} y1="0" x2={x} y2="320" />
                ))}
                {/* Horizontal grid lines */}
                {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((y) => (
                  <line key={`hy-${y}`} x1="0" y1={y} x2="400" y2={y} />
                ))}
              </g>

              {/* Center Crosshairs with fine subdivisions (ticks every 8px = 0.2 div) */}
              <g stroke="#1a5336" strokeWidth="1.5">
                <line x1="200" y1="0" x2="200" y2="320" />
                <line x1="0" y1="160" x2="400" y2="160" />
                {/* Center horizontal ticks */}
                {Array.from({ length: 41 }).map((_, i) => (
                  <line
                    key={`tick-h-${i}`}
                    x1={i * 10}
                    y1={157}
                    x2={i * 10}
                    y2={163}
                    stroke="#1a5336"
                    strokeWidth="1"
                  />
                ))}
                {/* Center vertical ticks */}
                {Array.from({ length: 33 }).map((_, i) => (
                  <line
                    key={`tick-v-${i}`}
                    x1={197}
                    y1={i * 10}
                    x2={203}
                    y2={i * 10}
                    stroke="#1a5336"
                    strokeWidth="1"
                  />
                ))}
              </g>

              {/* Plotted Waveform with Phosphor Glow */}
              <defs>
                <filter id="phosphorGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path
                d={waveformPath}
                fill="none"
                stroke={traceColor === 'green' ? '#22c55e' : '#f59e0b'}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#phosphorGlow)"
              />

              {/* Scope On-Screen Settings OSD */}
              <text x="10" y="25" className="text-[11px] font-mono fill-emerald-400 font-bold">
                CH1: {voltsPerDiv} V/div
              </text>
              <text x="280" y="25" className="text-[11px] font-mono fill-emerald-400 font-bold">
                M: {timePerDivUs >= 1000 ? `${timePerDivUs / 1000} ms` : `${timePerDivUs} µs`}/div
              </text>
            </svg>
          </div>

          {/* Automatic Digital Readouts Strip */}
          {!quizActive ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-center">
                <p className="text-[10px] text-slate-400 font-mono">Częstotliwość f</p>
                <p className="text-base font-bold font-mono text-cyan-600 dark:text-cyan-400 mt-0.5 tabular-nums">
                  {frequency >= 1000 ? `${(frequency / 1000).toFixed(2)} kHz` : `${frequency} Hz`}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-center">
                <p className="text-[10px] text-slate-400 font-mono">Okres T = 1/f</p>
                <p className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5 tabular-nums">
                  {periodFormatted}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-center">
                <p className="text-[10px] text-slate-400 font-mono">Napięcie Vpp</p>
                <p className="text-base font-bold font-mono text-amber-500 mt-0.5 tabular-nums">
                  {vpp.toFixed(2)} V
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-center">
                <p className="text-[10px] text-slate-400 font-mono">Napięcie Vrms</p>
                <p className="text-base font-bold font-mono text-purple-500 mt-0.5 tabular-nums">
                  {vrms.toFixed(2)} V
                </p>
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold text-center">
              🔒 Automatyczne odczyty wyłączone w trybie wyzwania! Policz działki na siatce.
            </div>
          )}
        </div>

        {/* Right: Generator Controls & Scope Knobs (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Generator Funkcyjny DDS
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Parametry sygnału doprowadzonego do kanału CH1
            </p>
          </div>

          {/* Waveform Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Kształt fali:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setWaveType('sine')}
                className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                  waveType === 'sine'
                    ? 'bg-cyan-500 text-white border-cyan-400 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                ∿ Sinus
              </button>
              <button
                onClick={() => setWaveType('square')}
                className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                  waveType === 'square'
                    ? 'bg-cyan-500 text-white border-cyan-400 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                ⊓ Prostokąt
              </button>
              <button
                onClick={() => setWaveType('triangle')}
                className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                  waveType === 'triangle'
                    ? 'bg-cyan-500 text-white border-cyan-400 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                ⋀ Trójkąt
              </button>
            </div>
          </div>

          {/* Frequency Slider & Presets */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Częstotliwość f:</span>
              <span className="font-mono text-cyan-600 dark:text-cyan-400">
                {frequency >= 1000 ? `${(frequency / 1000).toFixed(2)} kHz` : `${frequency} Hz`}
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="20000"
              step="50"
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            {/* Quick frequency buttons */}
            <div className="flex items-center gap-1.5 text-[10px]">
              {[50, 1000, 5000, 10000].map((fVal) => (
                <button
                  key={fVal}
                  onClick={() => setFrequency(fVal)}
                  className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  {fVal >= 1000 ? `${fVal / 1000} kHz` : `${fVal} Hz`}
                </button>
              ))}
            </div>
          </div>

          {/* Voltage Peak Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Napięcie szczytowe Vp:</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">{voltagePeak.toFixed(1)} V (Vpp = {(voltagePeak * 2).toFixed(1)} V)</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="15.0"
              step="0.5"
              value={voltagePeak}
              onChange={(e) => setVoltagePeak(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Scope Graticule Controls: Volts/Div and Time/Div */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <p className="text-xs font-bold text-slate-900 dark:text-white">
              Nastawy Osi Oscyloskopu:
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block mb-1">
                  Volts / Div (Oś Y):
                </label>
                <select
                  value={voltsPerDiv}
                  onChange={(e) => setVoltsPerDiv(Number(e.target.value))}
                  className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono font-semibold focus:outline-none"
                >
                  {voltsDivOptions.map((v) => (
                    <option key={v} value={v}>
                      {v} V / div
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block mb-1">
                  Time / Div (Oś X):
                </label>
                <select
                  value={timePerDivUs}
                  onChange={(e) => setTimePerDivUs(Number(e.target.value))}
                  className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono font-semibold focus:outline-none"
                >
                  {timeDivOptions.map((opt) => (
                    <option key={opt.val} value={opt.val}>
                      {opt.label} / div
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Vertical Position slider */}
            <div>
              <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                <span>Pozycja pionowa (Y-Pos):</span>
                <span className="font-mono">{yPosition.toFixed(1)} div</span>
              </div>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.2"
                value={yPosition}
                onChange={(e) => setYPosition(Number(e.target.value))}
                className="w-full accent-slate-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Section Under Oscilloscope */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Trener Odczytu z Siatki Oscyloskopu CKE</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Sprawdź swoją umiejętność odczytywania parametrów przebiegu: Vpp = działki pionowe × Volts/Div, f = 1 / (działki poziome × Time/Div).
            </p>
          </div>

          <button
            onClick={startQuizChallenge}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all shrink-0"
          >
            {quizActive ? 'Wylosuj inny sygnał' : 'Rozpocznij Wyzwanie (+50 XP)'}
          </button>
        </div>

        {quizActive && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 space-y-3">
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Spójrz na ekran powyżej i oblicz wartości z podziałki:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400 block mb-1">
                  Napięcie międzyszczytowe Vpp (w woltach [V]):
                </label>
                <input
                  type="text"
                  value={userVppInput}
                  onChange={(e) => setUserVppInput(e.target.value)}
                  placeholder="np. 6 lub 8"
                  className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400 block mb-1">
                  Częstotliwość f (w hercach [Hz]):
                </label>
                <input
                  type="text"
                  value={userFreqInput}
                  onChange={(e) => setUserFreqInput(e.target.value)}
                  placeholder="np. 1000 lub 500"
                  className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleVerifyQuiz}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors"
              >
                Sprawdź Odpowiedź
              </button>
              <button
                onClick={() => setQuizActive(false)}
                className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                Wyjdź z wyzwania
              </button>
            </div>

            {quizResult === 'correct' && (
              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>
                  Brawo! Odczyt bezbłędny: Vpp = {quizTargetVpp} V, f = {quizTargetFreq} Hz. Zdobywasz +50 XP!
                </span>
              </div>
            )}

            {quizResult === 'wrong' && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-500 text-red-800 dark:text-red-200 text-xs flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-500" />
                <span>
                  Błędny odczyt. Wskazówka: Policz liczbę całych kratek (div) od dolnego do górnego wierzchołka i pomnóż przez {voltsPerDiv} V/div.
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
