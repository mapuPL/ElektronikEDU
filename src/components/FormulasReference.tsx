import React, { useState } from 'react';
import { FORMULAS_DATA, METRIC_PREFIXES, FormulaItem } from '../data/formulasData';
import { FileSpreadsheet, Search, Filter, BookOpen, Hash, Zap } from 'lucide-react';

export const FormulasReference: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Prąd stały (DC)', 'Prąd zmienny (AC)', 'Półprzewodniki', 'Układy cyfrowe'];

  const filteredFormulas = FORMULAS_DATA.filter((f) => {
    if (selectedCategory !== 'ALL' && f.category !== selectedCategory) return false;
    if (search.trim() !== '') {
      const q = search.toLowerCase();
      return (
        f.name.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.formula.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
          <FileSpreadsheet className="w-4 h-4" />
          <span>KOMPENDIUM WZORÓW I JEDNOSTEK SI</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
          Baza Wzorów Elektrotechnicznych i Elektronicznych
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Ściągawka przed egzaminem zawodowym: wzory, definicje zmiennych oraz przedrostki dziesiętne
        </p>
      </div>

      {/* Metric Prefixes Strip */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Hash className="w-4 h-4 text-cyan-500" />
          <span>Przedrostki wielokrotności i podwielokrotności jednostek (SI)</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {METRIC_PREFIXES.map((item) => (
            <div
              key={item.symbol}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center"
            >
              <span className="text-base font-bold font-mono text-cyan-600 dark:text-cyan-400">
                {item.symbol}
              </span>
              <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">{item.prefix}</p>
              <p className="text-[10px] font-mono text-slate-400">10^{item.power}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Category Filter */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Szukaj wzoru (np. Thomson, reaktancja, moc, LED)..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedCategory === cat
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat === 'ALL' ? 'Wszystkie' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Formulas Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFormulas.map((formula) => (
          <div
            key={formula.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-medium text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800">
                  {formula.category}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {formula.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {formula.description}
              </p>
            </div>

            {/* Formula Block */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono text-cyan-300 text-sm sm:text-base font-semibold shadow-inner overflow-x-auto">
              {formula.formula}
            </div>

            {/* Variables */}
            <div className="space-y-1.5 text-xs border-t border-slate-100 dark:border-slate-800 pt-3">
              <p className="text-[11px] font-semibold text-slate-400">Oznaczenia zmiennych:</p>
              <div className="grid grid-cols-1 gap-1 text-[11px]">
                {formula.variables.map((v, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-900 dark:text-slate-200">
                      {v.symbol} : {v.desc}
                    </span>
                    <span className="font-mono text-slate-400">[{v.unit}]</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Practical Example */}
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 text-[11px] text-slate-600 dark:text-slate-300">
              <strong className="text-slate-800 dark:text-slate-200">Przykład: </strong>
              {formula.example}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
