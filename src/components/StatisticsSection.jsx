import React from 'react';
import { Zap, MapPin, Building2, Trees } from 'lucide-react';

export function StatisticsSection({ content }) {
  const stats = content.stats;
  const icons = [Zap, MapPin, Building2, Trees];

  return (
    <section className="bg-gradient-to-r from-[#061d11] via-[#0d4a2c] to-[#061d11] text-white py-10 border-y-2 border-amber-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div 
                key={idx} 
                className="bg-emerald-950/60 backdrop-blur-xs border border-emerald-700/40 rounded-xl p-4 sm:p-5 text-center transition-all hover:-translate-y-0.5 hover:border-amber-400/60"
              >
                <div className="w-10 h-10 mx-auto rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-2.5 border border-amber-500/30">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight font-serif mb-0.5">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-white tracking-wide uppercase mb-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-emerald-200/80 font-light truncate">
                  {stat.subtext}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
