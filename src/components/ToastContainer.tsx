import React from 'react';
import { useApp } from '../context/AppContext';
import { Zap, Trophy, CheckCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4">
      {toasts.map((toast) => {
        const getIcon = () => {
          switch (toast.type) {
            case 'xp':
              return <Zap className="w-5 h-5 text-amber-400 shrink-0" />;
            case 'badge':
              return <Trophy className="w-5 h-5 text-yellow-400 shrink-0" />;
            case 'success':
              return <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />;
            default:
              return <Info className="w-5 h-5 text-cyan-400 shrink-0" />;
          }
        };

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/95 dark:bg-slate-900/95 bg-white text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-950/20 backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-2 duration-200"
          >
            <div className="mt-0.5">{getIcon()}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold tracking-tight leading-tight">{toast.title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-200 p-1 -mr-1 -mt-1 rounded-md transition-colors"
              aria-label="Zamknij powiadomienie"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
