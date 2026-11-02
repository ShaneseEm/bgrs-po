import React from 'react';
import { Zap, MapPin, Building2, Trees } from 'lucide-react';

export function StatisticsSection({ content }) {
  const stats = content.stats;
  const icons = [Zap, MapPin, Building2, Trees];

  return (
    <section className="bg-gradient-to-r from-[#0a2f1c] via-[#0f4429] to-[#0a2f1c] text-white py-14 border-y-4 border-amber-500 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div 
                key={idx} 
                className="bg-emerald-950/60 border border-emerald-700/50 rounded-xl p-6 text-center hover:bg-emerald-900/60 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/40">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight font-serif mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-white tracking-wide uppercase mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-emerald-200/80 font-light">
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
