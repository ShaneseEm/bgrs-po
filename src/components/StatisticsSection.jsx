import React from 'react';
import { Zap, MapPin, Building2, Trees } from 'lucide-react';

export function StatisticsSection({ content }) {
  const icons = [Zap, MapPin, Building2, Trees];

  return (
    <section className="bg-[#f8fafc] dark:bg-[#0c1f2e] py-14 sm:py-16 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 bg-white dark:bg-[#0a1a26] border border-slate-200 dark:border-slate-800 shadow-sm">
          {content.stats.map((stat, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={idx}
                className={`group p-6 sm:p-8 border-slate-200 dark:border-slate-800 ${idx % 2 === 0 ? 'border-r' : ''} ${idx < 2 ? 'border-b lg:border-b-0' : ''} ${idx === 1 ? 'lg:border-r' : ''} hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors`}
              >
                <Icon className="w-6 h-6 text-[#3a6d8c] dark:text-[#dab26a] mb-4" />
                <div className="font-serif text-3xl sm:text-4xl text-[#1a4f6d] dark:text-white leading-none mb-3">
                  {stat.value}
                </div>
                <span className="block w-8 h-[2px] bg-[#dab26a] mb-3 transition-all duration-300 group-hover:w-14" />
                <div className="eyebrow text-slate-700 dark:text-slate-200 mb-1">{stat.label}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 leading-snug">{stat.subtext}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
