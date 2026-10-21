import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LEVEL_TITLES } from '../data/initialData';
import {
  Trophy,
  Award,
  Zap,
  Flame,
  CheckCircle2,
  Users,
  ShieldCheck,
  BookOpen,
  Palette,
  RotateCcw,
  Sparkles,
  ArrowUp
} from 'lucide-react';

export const Gamification: React.FC = () => {
  const {
    stats,
    badges,
    leaderboard,
    currentLevelInfo,
    resetProgress
  } = useApp();

  const [leaderboardSort, setLeaderboardSort] = useState<'total' | 'weekly'>('total');

  const sortedLeaderboard = [...leaderboard].sort((a, b) => {
    if (leaderboardSort === 'weekly') {
      return b.weeklyXp - a.weeklyXp;
    }
    return b.xp - a.xp;
  });

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-emerald-400" />;
      case 'Cpu':
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-blue-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-indigo-400" />;
      case 'Award':
        return <Award className="w-5 h-5 text-yellow-400" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-orange-400" />;
      default:
        return <Trophy className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
          <Trophy className="w-4 h-4" />
          <span>PROFIL, ODZNAKI I RANKING</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
          Postępy i Grywalizacja Klasowa
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Zdobywaj punkty XP za naukę, odblokowuj odznaki zawodowe i rywalizuj w rankingu klasy
        </p>
      </div>

      {/* User Level Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-800 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 font-black text-2xl flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">
            {currentLevelInfo.level}
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <span>POZIOM {currentLevelInfo.level}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300">Tytuł Zawodowy</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
              {currentLevelInfo.title}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Do kolejnego poziomu brakuje: <strong className="text-amber-400 font-mono">{Math.max(0, currentLevelInfo.maxXp - stats.xp)} XP</strong>
            </p>
          </div>
        </div>

        {/* Progress Bar to next level */}
        <div className="w-full md:w-80 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-300 font-mono">
            <span>{stats.xp} XP</span>
            <span>{currentLevelInfo.maxXp} XP</span>
          </div>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500"
              style={{ width: `${currentLevelInfo.progress}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 text-right">
            Postęp poziomu: <strong className="text-white">{currentLevelInfo.progress}%</strong>
          </p>
        </div>
      </div>

      {/* Badges Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Odznaki Osiągnięć Technika ({badges.filter((b) => stats.unlockedBadgeIds.includes(b.id)).length} / {badges.length})</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((badge) => {
            const isUnlocked = stats.unlockedBadgeIds.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-white dark:bg-slate-900 border-amber-300 dark:border-amber-700/60 shadow-sm ring-1 ring-amber-400/20'
                    : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isUnlocked
                          ? 'bg-amber-500/10 border border-amber-500/30'
                          : 'bg-slate-200 dark:bg-slate-800'
                      }`}
                    >
                      {getBadgeIcon(badge.iconName)}
                    </div>
                    <span className="text-[11px] font-mono font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
                      +{badge.xpValue} XP
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {badge.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                  <span
                    className={`font-semibold ${
                      isUnlocked
                        ? 'text-emerald-600 dark:text-emerald-400 flex items-center gap-1'
                        : 'text-slate-400'
                    }`}
                  >
                    {isUnlocked ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Zdobyta!</span>
                      </>
                    ) : (
                      'Do odblokowania'
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Class Leaderboard Section */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Ranking Klasowy (4 Technikum Elektroniczne)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Porównaj swoje postępy z innymi uczniami w klasie
              </p>
            </div>
          </div>

          {/* Sort Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
            <button
              onClick={() => setLeaderboardSort('total')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                leaderboardSort === 'total'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Łączne XP
            </button>
            <button
              onClick={() => setLeaderboardSort('weekly')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                leaderboardSort === 'weekly'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Ten tydzień
            </button>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-850 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4 w-16">Miejsce</th>
                <th className="py-3 px-4">Uczeń</th>
                <th className="py-3 px-4 hidden sm:table-cell">Klasa</th>
                <th className="py-3 px-4 text-center">Odznaki</th>
                <th className="py-3 px-4 text-right">Punkty XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {sortedLeaderboard.map((user, idx) => {
                const rankNumber = idx + 1;
                const isUser = user.isCurrentUser;

                return (
                  <tr
                    key={user.id}
                    className={`transition-colors ${
                      isUser
                        ? 'bg-cyan-50/70 dark:bg-cyan-950/40 font-semibold'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold">
                      {rankNumber === 1 && <span className="text-amber-500 text-sm">🥇 1</span>}
                      {rankNumber === 2 && <span className="text-slate-400 text-sm">🥈 2</span>}
                      {rankNumber === 3 && <span className="text-amber-700 text-sm">🥉 3</span>}
                      {rankNumber > 3 && <span className="text-slate-500">#{rankNumber}</span>}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                            isUser
                              ? 'bg-gradient-to-tr from-cyan-500 to-blue-600 text-white'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {user.avatar}
                        </div>
                        <div>
                          <p className="text-slate-900 dark:text-white font-medium flex items-center gap-1.5">
                            {user.name}
                            {isUser && (
                              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-cyan-500 text-white">
                                TY
                              </span>
                            )}
                          </p>
                          <p className="text-[10px] text-slate-400 sm:hidden">{user.schoolClass}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 hidden sm:table-cell">
                      {user.schoolClass}
                    </td>

                    <td className="py-3.5 px-4 text-center font-mono text-slate-700 dark:text-slate-300">
                      🏆 {user.badgesCount}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <span className="font-mono font-bold text-slate-900 dark:text-white text-sm tabular-nums">
                        {leaderboardSort === 'weekly' ? user.weeklyXp : user.xp}
                      </span>
                      <span className="text-[10px] text-slate-400 ml-1">XP</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reset Progress Section (Safety for user) */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <span className="text-slate-500 dark:text-slate-400">
          Chcesz zacząć naukę od nowa? Możesz zresetować lokalne postępy i odznaki.
        </span>
        <button
          onClick={() => {
            if (confirm('Czy na pewno chcesz zresetować zdobyte punkty XP, odznaki i postępy?')) {
              resetProgress();
            }
          }}
          className="text-red-500 hover:text-red-600 font-semibold flex items-center gap-1 shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Zresetuj postępy</span>
        </button>
      </div>
    </div>
  );
};
